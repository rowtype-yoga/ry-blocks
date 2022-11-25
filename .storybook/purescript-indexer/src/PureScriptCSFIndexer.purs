module PureScriptCSFIndexer (indexer) where

import Prelude

import Data.Array ((!!))
import Data.Array as Array
import Data.Either (Either(..), either)
import Data.Foldable (for_)
import Data.Map (SemigroupMap(..))
import Data.Map as Map
import Data.Maybe (Maybe(..), maybe)
import Data.Newtype (un, unwrap)
import Data.Semigroup.First (First(..))
import Data.Semigroup.Foldable (intercalateMap)
import Data.String (Pattern(..))
import Data.String as String
import Data.String.CodeUnits as SCU
import Data.String.Regex (Regex)
import Data.String.Regex as Regex
import Data.String.Regex.Flags as RF
import Data.String.Regex.Unsafe (unsafeRegex)
import Effect.Aff (Aff, attempt, throwError)
import Effect.Class (liftEffect)
import Effect.Class.Console as Console
import Effect.Exception (Error, error)
import Effect.Ref as Ref
import Foreign (Foreign)
import Node.Encoding (Encoding(..))
import Node.FS.Aff (readTextFile)
import Node.Path (dirname, resolve)
import PureScript.CST (RecoveredParserResult(..), parseModule)
import PureScript.CST.Traversal (defaultMonoidalVisitor, foldMapModule)
import PureScript.CST.Types as CST
import Record (merge)
import SourceMap.Types (SourceMap)
import Storybook.CSFTools (formatCsf, parseCsf, setStoryCode)
import Storybook.CSFTools as CSF
import Storybook.CSFTools.Types (CsfFile, CsfOptions)
import Unsafe.Coerce (unsafeCoerce)
import Yoga.JSON as JSON
import Yoga.JSON.Error (renderHumanError)

-- foreign import defaultVariableRecordRegex :: Regex

indexer ∷ String → CsfOptions → Aff CsfFile
indexer fileName options = do
  fileContent <- readTextFile UTF8 fileName
  -- withSourceMapConsumer
  let fixedFileContent = adjustSourceForStorybook fileContent
  parsed <- parseCsf fixedFileContent (options # merge { fileName }) # liftEffect

  enriched <- enrichWithPureScriptInfo fileName parsed
  csf <- case enriched of
    Left err -> do
      Console.errorShow err
      pure parsed
    Right r -> pure r
  liftEffect do
    formatted <- formatCsf csf
    parseCsf formatted options

enrichWithPureScriptInfo ∷ String → CsfFile → Aff (Either Error CsfFile)
enrichWithPureScriptInfo fileName parsed = attempt do
  sourceMapText <- readTextFile UTF8 (fileName <> ".map")
  sourceMap :: SourceMap <- JSON.readJSON sourceMapText # throwJSONErr
  sourcePath <- sourceMap.sources # Array.head # throwMaybe "empty source path"
  absoluteSourcePath <- resolve [ (dirname fileName) ] sourcePath # liftEffect
  psFile <- readTextFile UTF8 absoluteSourcePath
  cst <- case parseModule psFile of
    ParseSucceeded mod -> pure mod
    _ -> err $ "failed to parse PureScript module " <> psFile
  let topLevelDecls = getTopLevelValueDeclarations cst
  storyNames <- CSF.getStoryNames parsed # liftEffect
  resultRef <- Ref.new parsed # liftEffect
  -- The lines we will need later
  let lines = String.split (Pattern "\n") psFile
  for_ storyNames \storyName -> do
    for_ (Map.lookup storyName (unwrap topLevelDecls)) \(pos :: (First CST.SourceRange)) -> liftEffect do
      let { start, end } = un First pos
      let completeLines = Array.slice (start.line) (end.line - 2) lines
      case lines !! (start.line), lines !! (end.line) of
        Just startLine, Just endLine -> do
          let
            code =
              SCU.drop start.column startLine <> "\n"
                <> Array.intercalate "\n" completeLines
                <> "\n"
                <>
                  SCU.take end.column endLine
          before <- Ref.read resultRef
          after <- setStoryCode { storyName, code } before
          Ref.write after resultRef
        _, _ -> Console.error "weird"
  result <- Ref.read resultRef # liftEffect
  pure result
  where

  err :: forall a. String -> Aff a
  err = throwError <<< error

  throwMaybe msg = maybe (err msg) pure

  throwJSONErr = either (err <<< intercalateMap "\n" renderHumanError) pure

type TLDMap = SemigroupMap String (First CST.SourceRange)

getTopLevelValueDeclarations :: forall a. CST.Module a -> TLDMap
getTopLevelValueDeclarations = foldMapModule $ defaultMonoidalVisitor
  { onDecl = case _ of
      CST.DeclValue { name: CST.Name { token: { range }, name: CST.Ident name } } ->
        SemigroupMap $ Map.singleton name (First range)
      _ -> mempty
  }

adjustSourceForStorybook ∷ String → String
adjustSourceForStorybook =
  Regex.replace
    defaultVariableRecordRegex
    """var $$$$default = { $1 };"""

defaultVariableRecordRegex ∷ Regex
defaultVariableRecordRegex = unsafeRegex
  """^var \$\$default =[^\{]+\{((?:.*\n)+?)(^\}\);)"""
  (RF.multiline <> RF.global)
