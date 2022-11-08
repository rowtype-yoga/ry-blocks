import * as $runtime from "../runtime.js";
import * as Data$dArray from "../Data.Array/index.js";
import * as Data$dConst from "../Data.Const/index.js";
import * as Data$dFoldable from "../Data.Foldable/index.js";
import * as Data$dList$dTypes from "../Data.List.Types/index.js";
import * as Data$dMap from "../Data.Map/index.js";
import * as Data$dMap$dInternal from "../Data.Map.Internal/index.js";
import * as Data$dMonoid from "../Data.Monoid/index.js";
import * as Data$dOrd from "../Data.Ord/index.js";
import * as Data$dSemigroup$dFirst from "../Data.Semigroup.First/index.js";
import * as Data$dString$dCodeUnits from "../Data.String.CodeUnits/index.js";
import * as Data$dString$dCommon from "../Data.String.Common/index.js";
import * as Data$dString$dRegex from "../Data.String.Regex/index.js";
import * as Data$dString$dRegex$dUnsafe from "../Data.String.Regex.Unsafe/index.js";
import * as Effect$dAff from "../Effect.Aff/index.js";
import * as Effect$dConsole from "../Effect.Console/index.js";
import * as Effect$dException from "../Effect.Exception/index.js";
import * as Node$dEncoding from "../Node.Encoding/index.js";
import * as Node$dFS$dAff from "../Node.FS.Aff/index.js";
import * as Node$dFS$dAsync from "../Node.FS.Async/index.js";
import * as Node$dPath from "../Node.Path/index.js";
import * as PureScript$dCST from "../PureScript.CST/index.js";
import * as PureScript$dCST$dParser from "../PureScript.CST.Parser/index.js";
import * as PureScript$dCST$dTraversal from "../PureScript.CST.Traversal/index.js";
import * as Record$dUnsafe$dUnion from "../Record.Unsafe.Union/index.js";
import * as Storybook$dCSFTools from "../Storybook.CSFTools/index.js";
import * as Yoga$dJSON from "../Yoga.JSON/index.js";
import * as Yoga$dJSON$dError from "../Yoga.JSON.Error/index.js";
const monoidSemigroupMap = /* #__PURE__ */ Data$dMap.monoidSemigroupMap(Data$dOrd.ordString)(Data$dSemigroup$dFirst.semigroupFirst);
const intercalateMap = /* #__PURE__ */ (() => {
  const foldMap12 = Data$dList$dTypes.foldable1NonEmptyList.foldMap1({append: v => v1 => j => v(j) + (j + v1(j))});
  return j => f => foldable => foldMap12(x => {
    const $5 = f(x);
    return v => $5;
  })(foldable)(j);
})();
const readForeignArray = /* #__PURE__ */ Yoga$dJSON.readForeignArray(Yoga$dJSON.readForeignString);
const readJSON = /* #__PURE__ */ Yoga$dJSON.readJSON(/* #__PURE__ */ Yoga$dJSON.readForeignRecord()(/* #__PURE__ */ Yoga$dJSON.readForeignFieldsCons({reflectSymbol: () => "file"})(Yoga$dJSON.readForeignString)(/* #__PURE__ */ Yoga$dJSON.readForeignFieldsCons({
  reflectSymbol: () => "mappings"
})(Yoga$dJSON.readForeignString)(/* #__PURE__ */ Yoga$dJSON.readForeignFieldsCons({reflectSymbol: () => "names"})(readForeignArray)(/* #__PURE__ */ Yoga$dJSON.readForeignFieldsCons({
  reflectSymbol: () => "sourceRoot"
})(/* #__PURE__ */ Yoga$dJSON.readForeignMaybe(Yoga$dJSON.readForeignString))(/* #__PURE__ */ Yoga$dJSON.readForeignFieldsCons({reflectSymbol: () => "sources"})(readForeignArray)(/* #__PURE__ */ Yoga$dJSON.readForeignFieldsCons({
  reflectSymbol: () => "version"
})(Yoga$dJSON.readForeignInt)(Yoga$dJSON.readForeignFieldsNilRowRo)()())()())()())()())()())()()));
const for_ = /* #__PURE__ */ Data$dFoldable.for_(Effect$dAff.applicativeAff);
const for_1 = /* #__PURE__ */ for_(Data$dFoldable.foldableArray);
const for_2 = /* #__PURE__ */ for_(Data$dFoldable.foldableMaybe);
const intercalate = /* #__PURE__ */ Data$dArray.intercalate1(Data$dMonoid.monoidString);
const getTopLevelValueDeclarations = /* #__PURE__ */ PureScript$dCST$dTraversal.monoidalRewrite(monoidSemigroupMap)(/* #__PURE__ */ PureScript$dCST$dTraversal.traverseModule(/* #__PURE__ */ PureScript$dCST$dTraversal.applicativeCompose(/* #__PURE__ */ Data$dConst.applicativeConst(monoidSemigroupMap))))({
  onBinder: v => monoidSemigroupMap.mempty,
  onDecl: v1 => {
    if (v1.tag === "DeclValue") { return Data$dMap$dInternal.$Map("Two", Data$dMap$dInternal.Leaf, v1._1.name.name, v1._1.name.token.range, Data$dMap$dInternal.Leaf); }
    return monoidSemigroupMap.mempty;
  },
  onExpr: v => monoidSemigroupMap.mempty,
  onType: v => monoidSemigroupMap.mempty
});
const enrichWithPureScriptInfo = fileName => parsed => {
  const $2 = intercalateMap("\n")(Yoga$dJSON$dError.renderHumanError);
  return Effect$dAff.try(Effect$dAff._bind(Node$dFS$dAff.toAff2(Node$dFS$dAsync.readTextFile)(Node$dEncoding.UTF8)(fileName + ".map"))(sourceMapText => Effect$dAff._bind((() => {
    const $4 = readJSON(sourceMapText);
    if ($4.tag === "Left") { return Effect$dAff._throwError(Effect$dException.error($2($4._1))); }
    if ($4.tag === "Right") { return Effect$dAff._pure($4._1); }
    $runtime.fail();
  })())(v => Effect$dAff._bind((() => {
    const $5 = Effect$dAff._throwError(Effect$dException.error("empty source path"));
    const $6 = Data$dArray.index(v.sources)(0);
    if ($6.tag === "Nothing") { return $5; }
    if ($6.tag === "Just") { return Effect$dAff._pure($6._1); }
    $runtime.fail();
  })())(sourcePath => Effect$dAff._bind(Effect$dAff._liftEffect(Node$dPath.resolve([Node$dPath.dirname(fileName)])(sourcePath)))(absoluteSourcePath => Effect$dAff._bind(Node$dFS$dAff.toAff2(Node$dFS$dAsync.readTextFile)(Node$dEncoding.UTF8)(absoluteSourcePath))(psFile => Effect$dAff._bind((() => {
    const v1 = PureScript$dCST.runRecoveredParser(PureScript$dCST$dParser.parseModule)(psFile);
    if (v1.tag === "ParseSucceeded") { return Effect$dAff._pure(v1._1); }
    return Effect$dAff._throwError(Effect$dException.error("failed to parse PureScript module " + psFile));
  })())(cst => {
    const topLevelDecls = getTopLevelValueDeclarations(cst);
    return Effect$dAff._bind(Effect$dAff._liftEffect(Storybook$dCSFTools.getStoryNames(parsed)))(storyNames => Effect$dAff._bind(Effect$dAff._liftEffect(() => ({value: parsed})))(resultRef => {
      const lines = Data$dString$dCommon.split("\n")(psFile);
      return Effect$dAff._bind(for_1(storyNames)(storyName => for_2(Data$dMap$dInternal.lookup(Data$dOrd.ordString)(storyName)(topLevelDecls))(v1 => Effect$dAff._liftEffect((() => {
        const completeLines = Data$dArray.slice(v1.start.line)(v1.end.line - 2 | 0)(lines);
        const v3 = Data$dArray.index(lines)(v1.end.line);
        const v4 = Data$dArray.index(lines)(v1.start.line);
        if (v4.tag === "Just") {
          if (v3.tag === "Just") {
            const code = Data$dString$dCodeUnits.drop(v1.start.column)(v4._1) + (
              "\n" + (intercalate("\n")(completeLines) + ("\n" + Data$dString$dCodeUnits.take(v1.end.column)(v3._1)))
            );
            return () => {
              const before = resultRef.value;
              const after = Storybook$dCSFTools.setStoryCode({storyName: storyName, code: code})(before)();
              return resultRef.value = after;
            };
          }
          return Effect$dConsole.error("weird");
        }
        return Effect$dConsole.error("weird");
      })()))))(() => Effect$dAff._bind(Effect$dAff._liftEffect(() => resultRef.value))(result => Effect$dAff._pure(result)));
    }));
  })))))));
};
const defaultVariableRecordRegex = /* #__PURE__ */ Data$dString$dRegex$dUnsafe.unsafeRegex("^var \\$\\$default =[^\\{]+\\{((?:.*\\n)+?)(^\\}\\);)")({
  global: true,
  ignoreCase: false,
  multiline: true,
  dotAll: false,
  sticky: false,
  unicode: false
});
const adjustSourceForStorybook = /* #__PURE__ */ Data$dString$dRegex.replace(defaultVariableRecordRegex)("var $$$$default = { $1 };");
const indexer = fileName => options => Effect$dAff._bind(Node$dFS$dAff.toAff2(Node$dFS$dAsync.readTextFile)(Node$dEncoding.UTF8)(fileName))(fileContent => Effect$dAff._bind(Effect$dAff._liftEffect(Storybook$dCSFTools.parseCsf(adjustSourceForStorybook(fileContent))({
  ...options,
  fileName: fileName
})))(parsed => Effect$dAff._bind(Effect$dAff._liftEffect(Effect$dConsole.log("\n\n\n\n\n")))(() => Effect$dAff._bind(Effect$dAff._liftEffect(Effect$dConsole.log(Yoga$dJSON._unsafeStringify(parsed))))(() => Effect$dAff._bind(Effect$dAff._liftEffect(Effect$dConsole.log("\n\n\n\n\n")))(() => Effect$dAff._bind(enrichWithPureScriptInfo(fileName)(parsed))(enriched => {
  if (enriched.tag === "Left") {
    return Effect$dAff._bind(Effect$dAff._liftEffect(Effect$dConsole.error(Effect$dException.showErrorImpl(enriched._1))))(() => Effect$dAff._pure(parsed));
  }
  if (enriched.tag === "Right") { return Effect$dAff._pure(enriched._1); }
  $runtime.fail();
}))))));
export {
  adjustSourceForStorybook,
  defaultVariableRecordRegex,
  enrichWithPureScriptInfo,
  for_,
  for_1,
  for_2,
  getTopLevelValueDeclarations,
  indexer,
  intercalate,
  intercalateMap,
  monoidSemigroupMap,
  readForeignArray,
  readJSON
};
