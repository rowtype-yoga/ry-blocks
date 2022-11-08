import * as $runtime from "../runtime.js";
import * as Data$dArray from "../Data.Array/index.js";
import * as Data$dFoldable from "../Data.Foldable/index.js";
import * as Data$dVoid from "../Data.Void/index.js";
import * as PureScript$dCST$dRange$dTokenList from "../PureScript.CST.Range.TokenList/index.js";
const foldMap = /* #__PURE__ */ (() => Data$dFoldable.foldableArray.foldMap(PureScript$dCST$dRange$dTokenList.monoidTokenList))();
const foldMap1 = v => v1 => {
  if (v1.tag === "Nothing") { return PureScript$dCST$dRange$dTokenList.TokenEmpty; }
  if (v1.tag === "Just") { return v(v1._1); }
  $runtime.fail();
};
const foldMap2 = /* #__PURE__ */ (() => Data$dFoldable.foldableArray.foldMap(PureScript$dCST$dRange$dTokenList.monoidTokenList))();
const tokensOfVoid = {tokensOf: Data$dVoid.absurd};
const tokensOfRecoveredError = {
  tokensOf: v => {
    const len = v.tokens.length;
    if (len === 0) { return PureScript$dCST$dRange$dTokenList.TokenEmpty; }
    return PureScript$dCST$dRange$dTokenList.$TokenList("TokenArray", 0, len - 1 | 0, v.tokens);
  }
};
const tokensOfQualifiedName = {tokensOf: v => PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v.token, PureScript$dCST$dRange$dTokenList.TokenEmpty)};
const tokensOfName = {tokensOf: v => PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v.token, PureScript$dCST$dRange$dTokenList.TokenEmpty)};
const tokensOf = dict => dict.tokensOf;
const tokensOfArray = dictTokensOf => ({tokensOf: foldMap(a => PureScript$dCST$dRange$dTokenList.$TokenList("TokenDefer", v => dictTokensOf.tokensOf(a)))});
const tokensOfFixityOp = {
  tokensOf: v => {
    if (v.tag === "FixityValue") {
      return PureScript$dCST$dRange$dTokenList.$TokenList(
        "TokenAppend",
        PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._1.token, PureScript$dCST$dRange$dTokenList.TokenEmpty),
        PureScript$dCST$dRange$dTokenList.$TokenList(
          "TokenAppend",
          PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._2, PureScript$dCST$dRange$dTokenList.TokenEmpty),
          PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._3.token, PureScript$dCST$dRange$dTokenList.TokenEmpty)
        )
      );
    }
    if (v.tag === "FixityType") {
      return PureScript$dCST$dRange$dTokenList.$TokenList(
        "TokenCons",
        v._1,
        PureScript$dCST$dRange$dTokenList.$TokenList(
          "TokenAppend",
          PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._2.token, PureScript$dCST$dRange$dTokenList.TokenEmpty),
          PureScript$dCST$dRange$dTokenList.$TokenList(
            "TokenAppend",
            PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._3, PureScript$dCST$dRange$dTokenList.TokenEmpty),
            PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._4.token, PureScript$dCST$dRange$dTokenList.TokenEmpty)
          )
        )
      );
    }
    $runtime.fail();
  }
};
const tokensOfLabeled = dictTokensOf => dictTokensOf1 => (
  {
    tokensOf: v => {
      const $3 = dictTokensOf.tokensOf(v.label);
      const $4 = dictTokensOf1.tokensOf(v.value);
      const $5 = (() => {
        if ($4.tag === "TokenEmpty") { return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v.separator, PureScript$dCST$dRange$dTokenList.TokenEmpty); }
        return PureScript$dCST$dRange$dTokenList.$TokenList(
          "TokenAppend",
          PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v.separator, PureScript$dCST$dRange$dTokenList.TokenEmpty),
          $4
        );
      })();
      if ($5.tag === "TokenEmpty") { return $3; }
      if ($3.tag === "TokenEmpty") { return $5; }
      return PureScript$dCST$dRange$dTokenList.$TokenList("TokenAppend", $3, $5);
    }
  }
);
const tokensOfMaybe = dictTokensOf => ({tokensOf: foldMap1(dictTokensOf.tokensOf)});
const tokensOfNonEmptyArray = dictTokensOf => ({tokensOf: foldMap2(a => PureScript$dCST$dRange$dTokenList.$TokenList("TokenDefer", v => dictTokensOf.tokensOf(a)))});
const tokensOf4 = /* #__PURE__ */ foldMap2(a => PureScript$dCST$dRange$dTokenList.$TokenList(
  "TokenDefer",
  v => PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", a.token, PureScript$dCST$dRange$dTokenList.TokenEmpty)
));
const tokensOfClassFundep = {
  tokensOf: v => {
    if (v.tag === "FundepDetermined") { return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._1, tokensOf4(v._2)); }
    if (v.tag === "FundepDetermines") {
      const $1 = tokensOf4(v._1);
      const $2 = tokensOf4(v._3);
      const $3 = (() => {
        if ($2.tag === "TokenEmpty") { return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._2, PureScript$dCST$dRange$dTokenList.TokenEmpty); }
        return PureScript$dCST$dRange$dTokenList.$TokenList(
          "TokenAppend",
          PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._2, PureScript$dCST$dRange$dTokenList.TokenEmpty),
          $2
        );
      })();
      if ($3.tag === "TokenEmpty") { return $1; }
      if ($1.tag === "TokenEmpty") { return $3; }
      return PureScript$dCST$dRange$dTokenList.$TokenList("TokenAppend", $1, $3);
    }
    $runtime.fail();
  }
};
const tokensOfRecordLabeled = dictTokensOf => (
  {
    tokensOf: v => {
      if (v.tag === "RecordPun") { return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._1.token, PureScript$dCST$dRange$dTokenList.TokenEmpty); }
      if (v.tag === "RecordField") {
        const $2 = PureScript$dCST$dRange$dTokenList.$TokenList("TokenDefer", v1 => PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._2, dictTokensOf.tokensOf(v._3)));
        if ($2.tag === "TokenEmpty") { return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._1.token, PureScript$dCST$dRange$dTokenList.TokenEmpty); }
        return PureScript$dCST$dRange$dTokenList.$TokenList(
          "TokenAppend",
          PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._1.token, PureScript$dCST$dRange$dTokenList.TokenEmpty),
          $2
        );
      }
      $runtime.fail();
    }
  }
);
const tokensOfSeparated = dictTokensOf => (
  {
    tokensOf: v => {
      const $2 = dictTokensOf.tokensOf(v.head);
      const $3 = PureScript$dCST$dRange$dTokenList.$TokenList(
        "TokenDefer",
        v1 => foldMap(v2 => PureScript$dCST$dRange$dTokenList.$TokenList(
          "TokenCons",
          v2._1,
          PureScript$dCST$dRange$dTokenList.$TokenList("TokenDefer", v3 => dictTokensOf.tokensOf(v2._2))
        ))(v.tail)
      );
      if ($3.tag === "TokenEmpty") { return $2; }
      if ($2.tag === "TokenEmpty") { return $3; }
      return PureScript$dCST$dRange$dTokenList.$TokenList("TokenAppend", $2, $3);
    }
  }
);
const tokensOfSeparated1 = /* #__PURE__ */ tokensOfSeparated(tokensOfName);
const tokensOf6 = /* #__PURE__ */ (() => tokensOfSeparated(tokensOfClassFundep).tokensOf)();
const tokensOfTuple = dictTokensOf => dictTokensOf1 => (
  {
    tokensOf: v => {
      const $3 = dictTokensOf.tokensOf(v._1);
      const $4 = dictTokensOf1.tokensOf(v._2);
      if ($4.tag === "TokenEmpty") { return $3; }
      if ($3.tag === "TokenEmpty") { return $4; }
      return PureScript$dCST$dRange$dTokenList.$TokenList("TokenAppend", $3, $4);
    }
  }
);
const tokensOfWrapped = dictTokensOf => (
  {
    tokensOf: v => PureScript$dCST$dRange$dTokenList.$TokenList(
      "TokenWrap",
      v.open,
      PureScript$dCST$dRange$dTokenList.$TokenList("TokenDefer", v1 => dictTokensOf.tokensOf(v.value)),
      v.close
    )
  }
);
const tokensOf7 = /* #__PURE__ */ (() => tokensOfWrapped({tokensOf: foldMap1(tokensOfSeparated1.tokensOf)}).tokensOf)();
const tokensOfDataMembers = {
  tokensOf: v => {
    if (v.tag === "DataAll") { return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._1, PureScript$dCST$dRange$dTokenList.TokenEmpty); }
    if (v.tag === "DataEnumerated") { return tokensOf7(v._1); }
    $runtime.fail();
  }
};
const tokensOfExport = dictTokensOf => (
  {
    tokensOf: v => {
      if (v.tag === "ExportValue") { return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._1.token, PureScript$dCST$dRange$dTokenList.TokenEmpty); }
      if (v.tag === "ExportOp") { return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._1.token, PureScript$dCST$dRange$dTokenList.TokenEmpty); }
      if (v.tag === "ExportType") {
        const $2 = (() => {
          if (v._2.tag === "Nothing") { return PureScript$dCST$dRange$dTokenList.TokenEmpty; }
          if (v._2.tag === "Just") {
            if (v._2._1.tag === "DataAll") { return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._2._1._1, PureScript$dCST$dRange$dTokenList.TokenEmpty); }
            if (v._2._1.tag === "DataEnumerated") { return tokensOf7(v._2._1._1); }
            $runtime.fail();
          }
          $runtime.fail();
        })();
        if ($2.tag === "TokenEmpty") { return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._1.token, PureScript$dCST$dRange$dTokenList.TokenEmpty); }
        return PureScript$dCST$dRange$dTokenList.$TokenList(
          "TokenAppend",
          PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._1.token, PureScript$dCST$dRange$dTokenList.TokenEmpty),
          $2
        );
      }
      if (v.tag === "ExportTypeOp") {
        return PureScript$dCST$dRange$dTokenList.$TokenList(
          "TokenCons",
          v._1,
          PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._2.token, PureScript$dCST$dRange$dTokenList.TokenEmpty)
        );
      }
      if (v.tag === "ExportClass") {
        return PureScript$dCST$dRange$dTokenList.$TokenList(
          "TokenCons",
          v._1,
          PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._2.token, PureScript$dCST$dRange$dTokenList.TokenEmpty)
        );
      }
      if (v.tag === "ExportModule") {
        return PureScript$dCST$dRange$dTokenList.$TokenList(
          "TokenCons",
          v._1,
          PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._2.token, PureScript$dCST$dRange$dTokenList.TokenEmpty)
        );
      }
      if (v.tag === "ExportError") { return dictTokensOf.tokensOf(v._1); }
      $runtime.fail();
    }
  }
);
const tokensOfImport = dictTokensOf => (
  {
    tokensOf: v => {
      if (v.tag === "ImportValue") { return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._1.token, PureScript$dCST$dRange$dTokenList.TokenEmpty); }
      if (v.tag === "ImportOp") { return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._1.token, PureScript$dCST$dRange$dTokenList.TokenEmpty); }
      if (v.tag === "ImportType") {
        const $2 = (() => {
          if (v._2.tag === "Nothing") { return PureScript$dCST$dRange$dTokenList.TokenEmpty; }
          if (v._2.tag === "Just") {
            if (v._2._1.tag === "DataAll") { return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._2._1._1, PureScript$dCST$dRange$dTokenList.TokenEmpty); }
            if (v._2._1.tag === "DataEnumerated") { return tokensOf7(v._2._1._1); }
            $runtime.fail();
          }
          $runtime.fail();
        })();
        if ($2.tag === "TokenEmpty") { return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._1.token, PureScript$dCST$dRange$dTokenList.TokenEmpty); }
        return PureScript$dCST$dRange$dTokenList.$TokenList(
          "TokenAppend",
          PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._1.token, PureScript$dCST$dRange$dTokenList.TokenEmpty),
          $2
        );
      }
      if (v.tag === "ImportTypeOp") {
        return PureScript$dCST$dRange$dTokenList.$TokenList(
          "TokenCons",
          v._1,
          PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._2.token, PureScript$dCST$dRange$dTokenList.TokenEmpty)
        );
      }
      if (v.tag === "ImportClass") {
        return PureScript$dCST$dRange$dTokenList.$TokenList(
          "TokenCons",
          v._1,
          PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._2.token, PureScript$dCST$dRange$dTokenList.TokenEmpty)
        );
      }
      if (v.tag === "ImportError") { return dictTokensOf.tokensOf(v._1); }
      $runtime.fail();
    }
  }
);
const tokensOfImportDecl = dictTokensOf => {
  const tokensOf9 = tokensOfWrapped(tokensOfSeparated(tokensOfImport(dictTokensOf))).tokensOf;
  return {
    tokensOf: v => PureScript$dCST$dRange$dTokenList.$TokenList(
      "TokenCons",
      v.keyword,
      PureScript$dCST$dRange$dTokenList.$TokenList(
        "TokenDefer",
        v1 => {
          const $4 = (() => {
            if (v.names.tag === "Nothing") { return PureScript$dCST$dRange$dTokenList.TokenEmpty; }
            if (v.names.tag === "Just") {
              const $4 = (() => {
                if (v.names._1._1.tag === "Nothing") { return PureScript$dCST$dRange$dTokenList.TokenEmpty; }
                if (v.names._1._1.tag === "Just") {
                  return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v.names._1._1._1, PureScript$dCST$dRange$dTokenList.TokenEmpty);
                }
                $runtime.fail();
              })();
              const $5 = PureScript$dCST$dRange$dTokenList.$TokenList("TokenDefer", v3 => tokensOf9(v.names._1._2));
              if ($5.tag === "TokenEmpty") { return $4; }
              if ($4.tag === "TokenEmpty") { return $5; }
              return PureScript$dCST$dRange$dTokenList.$TokenList("TokenAppend", $4, $5);
            }
            $runtime.fail();
          })();
          const $5 = (() => {
            if (v.qualified.tag === "Nothing") { return PureScript$dCST$dRange$dTokenList.TokenEmpty; }
            if (v.qualified.tag === "Just") {
              return PureScript$dCST$dRange$dTokenList.$TokenList(
                "TokenAppend",
                PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v.qualified._1._1, PureScript$dCST$dRange$dTokenList.TokenEmpty),
                PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v.qualified._1._2.token, PureScript$dCST$dRange$dTokenList.TokenEmpty)
              );
            }
            $runtime.fail();
          })();
          const $6 = (() => {
            if ($5.tag === "TokenEmpty") { return $4; }
            if ($4.tag === "TokenEmpty") { return $5; }
            return PureScript$dCST$dRange$dTokenList.$TokenList("TokenAppend", $4, $5);
          })();
          if ($6.tag === "TokenEmpty") { return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v.module.token, PureScript$dCST$dRange$dTokenList.TokenEmpty); }
          return PureScript$dCST$dRange$dTokenList.$TokenList(
            "TokenAppend",
            PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v.module.token, PureScript$dCST$dRange$dTokenList.TokenEmpty),
            $6
          );
        }
      )
    )
  };
};
const tokensOfOneOrDelimited = dictTokensOf => {
  const tokensOf10 = tokensOfWrapped(tokensOfSeparated(dictTokensOf)).tokensOf;
  return {
    tokensOf: v => {
      if (v.tag === "One") { return dictTokensOf.tokensOf(v._1); }
      if (v.tag === "Many") { return tokensOf10(v._1); }
      $runtime.fail();
    }
  };
};
const tokensOfTypeVarBinding = dictTokensOf => (
  {
    tokensOf: v => {
      if (v.tag === "TypeVarKinded") { return tokensOfWrapped(tokensOfLabeled(tokensOfName)(tokensOfType(dictTokensOf))).tokensOf(v._1); }
      if (v.tag === "TypeVarName") { return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._1.token, PureScript$dCST$dRange$dTokenList.TokenEmpty); }
      $runtime.fail();
    }
  }
);
const tokensOfType = dictTokensOf => (
  {
    tokensOf: v => {
      if (v.tag === "TypeVar") { return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._1.token, PureScript$dCST$dRange$dTokenList.TokenEmpty); }
      if (v.tag === "TypeConstructor") { return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._1.token, PureScript$dCST$dRange$dTokenList.TokenEmpty); }
      if (v.tag === "TypeWildcard") { return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._1, PureScript$dCST$dRange$dTokenList.TokenEmpty); }
      if (v.tag === "TypeHole") { return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._1.token, PureScript$dCST$dRange$dTokenList.TokenEmpty); }
      if (v.tag === "TypeString") { return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._1, PureScript$dCST$dRange$dTokenList.TokenEmpty); }
      if (v.tag === "TypeInt") {
        const $2 = (() => {
          if (v._1.tag === "Nothing") { return PureScript$dCST$dRange$dTokenList.TokenEmpty; }
          if (v._1.tag === "Just") { return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._1._1, PureScript$dCST$dRange$dTokenList.TokenEmpty); }
          $runtime.fail();
        })();
        if ($2.tag === "TokenEmpty") { return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._2, PureScript$dCST$dRange$dTokenList.TokenEmpty); }
        return PureScript$dCST$dRange$dTokenList.$TokenList(
          "TokenAppend",
          $2,
          PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._2, PureScript$dCST$dRange$dTokenList.TokenEmpty)
        );
      }
      if (v.tag === "TypeRow") { return tokensOfWrapped(tokensOfRow(dictTokensOf)).tokensOf(v._1); }
      if (v.tag === "TypeRecord") { return tokensOfWrapped(tokensOfRow(dictTokensOf)).tokensOf(v._1); }
      if (v.tag === "TypeForall") {
        return PureScript$dCST$dRange$dTokenList.$TokenList(
          "TokenCons",
          v._1,
          PureScript$dCST$dRange$dTokenList.$TokenList(
            "TokenDefer",
            v1 => {
              const $3 = tokensOfTypeVarBinding(dictTokensOf);
              const $4 = foldMap2(a => PureScript$dCST$dRange$dTokenList.$TokenList("TokenDefer", v$1 => $3.tokensOf(a)))(v._2);
              const $5 = tokensOfType(dictTokensOf).tokensOf(v._4);
              const $6 = (() => {
                if ($5.tag === "TokenEmpty") { return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._3, PureScript$dCST$dRange$dTokenList.TokenEmpty); }
                return PureScript$dCST$dRange$dTokenList.$TokenList(
                  "TokenAppend",
                  PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._3, PureScript$dCST$dRange$dTokenList.TokenEmpty),
                  $5
                );
              })();
              if ($6.tag === "TokenEmpty") { return $4; }
              if ($4.tag === "TokenEmpty") { return $6; }
              return PureScript$dCST$dRange$dTokenList.$TokenList("TokenAppend", $4, $6);
            }
          )
        );
      }
      if (v.tag === "TypeKinded") {
        const $2 = tokensOfType(dictTokensOf).tokensOf(v._1);
        const $3 = PureScript$dCST$dRange$dTokenList.$TokenList(
          "TokenDefer",
          v1 => {
            const $4 = tokensOfType(dictTokensOf).tokensOf(v._3);
            if ($4.tag === "TokenEmpty") { return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._2, PureScript$dCST$dRange$dTokenList.TokenEmpty); }
            return PureScript$dCST$dRange$dTokenList.$TokenList(
              "TokenAppend",
              PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._2, PureScript$dCST$dRange$dTokenList.TokenEmpty),
              $4
            );
          }
        );
        if ($3.tag === "TokenEmpty") { return $2; }
        if ($2.tag === "TokenEmpty") { return $3; }
        return PureScript$dCST$dRange$dTokenList.$TokenList("TokenAppend", $2, $3);
      }
      if (v.tag === "TypeApp") {
        const $2 = tokensOfType(dictTokensOf).tokensOf(v._1);
        const $3 = PureScript$dCST$dRange$dTokenList.$TokenList(
          "TokenDefer",
          v1 => {
            const $4 = tokensOfType(dictTokensOf);
            return foldMap2(a => PureScript$dCST$dRange$dTokenList.$TokenList("TokenDefer", v$1 => $4.tokensOf(a)))(v._2);
          }
        );
        if ($3.tag === "TokenEmpty") { return $2; }
        if ($2.tag === "TokenEmpty") { return $3; }
        return PureScript$dCST$dRange$dTokenList.$TokenList("TokenAppend", $2, $3);
      }
      if (v.tag === "TypeOp") {
        const $2 = tokensOfType(dictTokensOf).tokensOf(v._1);
        const $3 = PureScript$dCST$dRange$dTokenList.$TokenList(
          "TokenDefer",
          v1 => foldMap2(v2 => {
            const $5 = tokensOfType(dictTokensOf).tokensOf(v2._2);
            if ($5.tag === "TokenEmpty") { return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v2._1.token, PureScript$dCST$dRange$dTokenList.TokenEmpty); }
            return PureScript$dCST$dRange$dTokenList.$TokenList(
              "TokenAppend",
              PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v2._1.token, PureScript$dCST$dRange$dTokenList.TokenEmpty),
              $5
            );
          })(v._2)
        );
        if ($3.tag === "TokenEmpty") { return $2; }
        if ($2.tag === "TokenEmpty") { return $3; }
        return PureScript$dCST$dRange$dTokenList.$TokenList("TokenAppend", $2, $3);
      }
      if (v.tag === "TypeOpName") { return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._1.token, PureScript$dCST$dRange$dTokenList.TokenEmpty); }
      if (v.tag === "TypeArrow") {
        const $2 = tokensOfType(dictTokensOf).tokensOf(v._1);
        const $3 = PureScript$dCST$dRange$dTokenList.$TokenList(
          "TokenDefer",
          v1 => {
            const $4 = tokensOfType(dictTokensOf).tokensOf(v._3);
            if ($4.tag === "TokenEmpty") { return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._2, PureScript$dCST$dRange$dTokenList.TokenEmpty); }
            return PureScript$dCST$dRange$dTokenList.$TokenList(
              "TokenAppend",
              PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._2, PureScript$dCST$dRange$dTokenList.TokenEmpty),
              $4
            );
          }
        );
        if ($3.tag === "TokenEmpty") { return $2; }
        if ($2.tag === "TokenEmpty") { return $3; }
        return PureScript$dCST$dRange$dTokenList.$TokenList("TokenAppend", $2, $3);
      }
      if (v.tag === "TypeArrowName") { return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._1, PureScript$dCST$dRange$dTokenList.TokenEmpty); }
      if (v.tag === "TypeConstrained") {
        const $2 = tokensOfType(dictTokensOf).tokensOf(v._1);
        const $3 = PureScript$dCST$dRange$dTokenList.$TokenList(
          "TokenDefer",
          v1 => {
            const $4 = tokensOfType(dictTokensOf).tokensOf(v._3);
            if ($4.tag === "TokenEmpty") { return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._2, PureScript$dCST$dRange$dTokenList.TokenEmpty); }
            return PureScript$dCST$dRange$dTokenList.$TokenList(
              "TokenAppend",
              PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._2, PureScript$dCST$dRange$dTokenList.TokenEmpty),
              $4
            );
          }
        );
        if ($3.tag === "TokenEmpty") { return $2; }
        if ($2.tag === "TokenEmpty") { return $3; }
        return PureScript$dCST$dRange$dTokenList.$TokenList("TokenAppend", $2, $3);
      }
      if (v.tag === "TypeParens") { return tokensOfWrapped(tokensOfType(dictTokensOf)).tokensOf(v._1); }
      if (v.tag === "TypeError") { return dictTokensOf.tokensOf(v._1); }
      $runtime.fail();
    }
  }
);
const tokensOfRow = dictTokensOf => (
  {
    tokensOf: v => {
      const $2 = tokensOfSeparated(tokensOfLabeled(tokensOfName)(tokensOfType(dictTokensOf))).tokensOf;
      const $3 = (() => {
        if (v.labels.tag === "Nothing") { return PureScript$dCST$dRange$dTokenList.TokenEmpty; }
        if (v.labels.tag === "Just") { return $2(v.labels._1); }
        $runtime.fail();
      })();
      const $4 = (() => {
        if (v.tail.tag === "Nothing") { return PureScript$dCST$dRange$dTokenList.TokenEmpty; }
        if (v.tail.tag === "Just") { return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v.tail._1._1, tokensOfType(dictTokensOf).tokensOf(v.tail._1._2)); }
        $runtime.fail();
      })();
      if ($4.tag === "TokenEmpty") { return $3; }
      if ($3.tag === "TokenEmpty") { return $4; }
      return PureScript$dCST$dRange$dTokenList.$TokenList("TokenAppend", $3, $4);
    }
  }
);
const tokensOfBinder = dictTokensOf => {
  const tokensOf9 = tokensOfType(dictTokensOf).tokensOf;
  return {
    tokensOf: v => {
      if (v.tag === "BinderWildcard") { return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._1, PureScript$dCST$dRange$dTokenList.TokenEmpty); }
      if (v.tag === "BinderVar") { return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._1.token, PureScript$dCST$dRange$dTokenList.TokenEmpty); }
      if (v.tag === "BinderNamed") {
        const $3 = PureScript$dCST$dRange$dTokenList.$TokenList(
          "TokenDefer",
          v1 => PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._2, tokensOfBinder(dictTokensOf).tokensOf(v._3))
        );
        if ($3.tag === "TokenEmpty") { return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._1.token, PureScript$dCST$dRange$dTokenList.TokenEmpty); }
        return PureScript$dCST$dRange$dTokenList.$TokenList(
          "TokenAppend",
          PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._1.token, PureScript$dCST$dRange$dTokenList.TokenEmpty),
          $3
        );
      }
      if (v.tag === "BinderConstructor") {
        const $3 = PureScript$dCST$dRange$dTokenList.$TokenList(
          "TokenDefer",
          v1 => {
            const $4 = tokensOfBinder(dictTokensOf);
            return foldMap(a => PureScript$dCST$dRange$dTokenList.$TokenList("TokenDefer", v$1 => $4.tokensOf(a)))(v._2);
          }
        );
        if ($3.tag === "TokenEmpty") { return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._1.token, PureScript$dCST$dRange$dTokenList.TokenEmpty); }
        return PureScript$dCST$dRange$dTokenList.$TokenList(
          "TokenAppend",
          PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._1.token, PureScript$dCST$dRange$dTokenList.TokenEmpty),
          $3
        );
      }
      if (v.tag === "BinderBoolean") { return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._1, PureScript$dCST$dRange$dTokenList.TokenEmpty); }
      if (v.tag === "BinderChar") { return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._1, PureScript$dCST$dRange$dTokenList.TokenEmpty); }
      if (v.tag === "BinderString") { return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._1, PureScript$dCST$dRange$dTokenList.TokenEmpty); }
      if (v.tag === "BinderInt") {
        const $3 = (() => {
          if (v._1.tag === "Nothing") { return PureScript$dCST$dRange$dTokenList.TokenEmpty; }
          if (v._1.tag === "Just") { return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._1._1, PureScript$dCST$dRange$dTokenList.TokenEmpty); }
          $runtime.fail();
        })();
        if ($3.tag === "TokenEmpty") { return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._2, PureScript$dCST$dRange$dTokenList.TokenEmpty); }
        return PureScript$dCST$dRange$dTokenList.$TokenList(
          "TokenAppend",
          $3,
          PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._2, PureScript$dCST$dRange$dTokenList.TokenEmpty)
        );
      }
      if (v.tag === "BinderNumber") {
        const $3 = (() => {
          if (v._1.tag === "Nothing") { return PureScript$dCST$dRange$dTokenList.TokenEmpty; }
          if (v._1.tag === "Just") { return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._1._1, PureScript$dCST$dRange$dTokenList.TokenEmpty); }
          $runtime.fail();
        })();
        if ($3.tag === "TokenEmpty") { return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._2, PureScript$dCST$dRange$dTokenList.TokenEmpty); }
        return PureScript$dCST$dRange$dTokenList.$TokenList(
          "TokenAppend",
          $3,
          PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._2, PureScript$dCST$dRange$dTokenList.TokenEmpty)
        );
      }
      if (v.tag === "BinderArray") { return tokensOfWrapped({tokensOf: foldMap1(tokensOfSeparated(tokensOfBinder(dictTokensOf)).tokensOf)}).tokensOf(v._1); }
      if (v.tag === "BinderRecord") {
        return tokensOfWrapped({tokensOf: foldMap1(tokensOfSeparated(tokensOfRecordLabeled(tokensOfBinder(dictTokensOf))).tokensOf)}).tokensOf(v._1);
      }
      if (v.tag === "BinderParens") { return tokensOfWrapped(tokensOfBinder(dictTokensOf)).tokensOf(v._1); }
      if (v.tag === "BinderTyped") {
        const $3 = tokensOfBinder(dictTokensOf).tokensOf(v._1);
        const $4 = PureScript$dCST$dRange$dTokenList.$TokenList("TokenDefer", v1 => PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._2, tokensOf9(v._3)));
        if ($4.tag === "TokenEmpty") { return $3; }
        if ($3.tag === "TokenEmpty") { return $4; }
        return PureScript$dCST$dRange$dTokenList.$TokenList("TokenAppend", $3, $4);
      }
      if (v.tag === "BinderOp") {
        const $3 = tokensOfBinder(dictTokensOf).tokensOf(v._1);
        const $4 = PureScript$dCST$dRange$dTokenList.$TokenList(
          "TokenDefer",
          v1 => {
            const $5 = tokensOfTuple(tokensOfQualifiedName)(tokensOfBinder(dictTokensOf));
            return foldMap2(a => PureScript$dCST$dRange$dTokenList.$TokenList("TokenDefer", v$1 => $5.tokensOf(a)))(v._2);
          }
        );
        if ($4.tag === "TokenEmpty") { return $3; }
        if ($3.tag === "TokenEmpty") { return $4; }
        return PureScript$dCST$dRange$dTokenList.$TokenList("TokenAppend", $3, $4);
      }
      if (v.tag === "BinderError") { return dictTokensOf.tokensOf(v._1); }
      $runtime.fail();
    }
  };
};
const tokensOfDataCtor = dictTokensOf => {
  const $1 = tokensOfType(dictTokensOf);
  return {
    tokensOf: v => {
      const $3 = foldMap(a => PureScript$dCST$dRange$dTokenList.$TokenList("TokenDefer", v$1 => $1.tokensOf(a)))(v.fields);
      if ($3.tag === "TokenEmpty") { return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v.name.token, PureScript$dCST$dRange$dTokenList.TokenEmpty); }
      return PureScript$dCST$dRange$dTokenList.$TokenList(
        "TokenAppend",
        PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v.name.token, PureScript$dCST$dRange$dTokenList.TokenEmpty),
        $3
      );
    }
  };
};
const tokensOfForeign = dictTokensOf => {
  const tokensOf9 = tokensOfLabeled(tokensOfName)(tokensOfType(dictTokensOf)).tokensOf;
  return {
    tokensOf: v => {
      if (v.tag === "ForeignValue") { return tokensOf9(v._1); }
      if (v.tag === "ForeignData") { return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._1, tokensOf9(v._2)); }
      if (v.tag === "ForeignKind") {
        return PureScript$dCST$dRange$dTokenList.$TokenList(
          "TokenCons",
          v._1,
          PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._2.token, PureScript$dCST$dRange$dTokenList.TokenEmpty)
        );
      }
      $runtime.fail();
    }
  };
};
const tokensOfWhere = dictTokensOf => (
  {
    tokensOf: v => {
      const $2 = tokensOfExpr(dictTokensOf).tokensOf(v.expr);
      const $3 = PureScript$dCST$dRange$dTokenList.$TokenList(
        "TokenDefer",
        v1 => {
          if (v.bindings.tag === "Nothing") { return PureScript$dCST$dRange$dTokenList.TokenEmpty; }
          if (v.bindings.tag === "Just") {
            return PureScript$dCST$dRange$dTokenList.$TokenList(
              "TokenCons",
              v.bindings._1._1,
              (() => {
                const $4 = tokensOfLetBinding(dictTokensOf);
                return foldMap2(a => PureScript$dCST$dRange$dTokenList.$TokenList("TokenDefer", v$1 => $4.tokensOf(a)))(v.bindings._1._2);
              })()
            );
          }
          $runtime.fail();
        }
      );
      if ($3.tag === "TokenEmpty") { return $2; }
      if ($2.tag === "TokenEmpty") { return $3; }
      return PureScript$dCST$dRange$dTokenList.$TokenList("TokenAppend", $2, $3);
    }
  }
);
const tokensOfRecordUpdate = dictTokensOf => (
  {
    tokensOf: v => {
      if (v.tag === "RecordUpdateLeaf") {
        const $2 = tokensOfExpr(dictTokensOf).tokensOf(v._3);
        const $3 = (() => {
          if ($2.tag === "TokenEmpty") { return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._2, PureScript$dCST$dRange$dTokenList.TokenEmpty); }
          return PureScript$dCST$dRange$dTokenList.$TokenList(
            "TokenAppend",
            PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._2, PureScript$dCST$dRange$dTokenList.TokenEmpty),
            $2
          );
        })();
        if ($3.tag === "TokenEmpty") { return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._1.token, PureScript$dCST$dRange$dTokenList.TokenEmpty); }
        return PureScript$dCST$dRange$dTokenList.$TokenList(
          "TokenAppend",
          PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._1.token, PureScript$dCST$dRange$dTokenList.TokenEmpty),
          $3
        );
      }
      if (v.tag === "RecordUpdateBranch") {
        const $2 = tokensOfWrapped(tokensOfSeparated(tokensOfRecordUpdate(dictTokensOf))).tokensOf(v._2);
        if ($2.tag === "TokenEmpty") { return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._1.token, PureScript$dCST$dRange$dTokenList.TokenEmpty); }
        return PureScript$dCST$dRange$dTokenList.$TokenList(
          "TokenAppend",
          PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._1.token, PureScript$dCST$dRange$dTokenList.TokenEmpty),
          $2
        );
      }
      $runtime.fail();
    }
  }
);
const tokensOfPatternGuard = dictTokensOf => {
  const tokensOf9 = tokensOfBinder(dictTokensOf).tokensOf;
  return {
    tokensOf: v => {
      const $3 = (() => {
        if (v.binder.tag === "Nothing") { return PureScript$dCST$dRange$dTokenList.TokenEmpty; }
        if (v.binder.tag === "Just") {
          const $3 = tokensOf9(v.binder._1._1);
          if ($3.tag === "TokenEmpty") { return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v.binder._1._2, PureScript$dCST$dRange$dTokenList.TokenEmpty); }
          return PureScript$dCST$dRange$dTokenList.$TokenList(
            "TokenAppend",
            $3,
            PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v.binder._1._2, PureScript$dCST$dRange$dTokenList.TokenEmpty)
          );
        }
        $runtime.fail();
      })();
      const $4 = tokensOfExpr(dictTokensOf).tokensOf(v.expr);
      if ($4.tag === "TokenEmpty") { return $3; }
      if ($3.tag === "TokenEmpty") { return $4; }
      return PureScript$dCST$dRange$dTokenList.$TokenList("TokenAppend", $3, $4);
    }
  };
};
const tokensOfLetBinding = dictTokensOf => {
  const tokensOf9 = tokensOfLabeled(tokensOfName)(tokensOfType(dictTokensOf)).tokensOf;
  const tokensOfBinder1 = tokensOfBinder(dictTokensOf);
  const tokensOf10 = foldMap(a => PureScript$dCST$dRange$dTokenList.$TokenList("TokenDefer", v => tokensOfBinder1.tokensOf(a)));
  return {
    tokensOf: v => {
      if (v.tag === "LetBindingSignature") { return tokensOf9(v._1); }
      if (v.tag === "LetBindingName") {
        const $5 = PureScript$dCST$dRange$dTokenList.$TokenList(
          "TokenDefer",
          v1 => {
            const $6 = tokensOf10(v._1.binders);
            const $7 = tokensOfGuarded(dictTokensOf).tokensOf(v._1.guarded);
            if ($7.tag === "TokenEmpty") { return $6; }
            if ($6.tag === "TokenEmpty") { return $7; }
            return PureScript$dCST$dRange$dTokenList.$TokenList("TokenAppend", $6, $7);
          }
        );
        if ($5.tag === "TokenEmpty") { return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._1.name.token, PureScript$dCST$dRange$dTokenList.TokenEmpty); }
        return PureScript$dCST$dRange$dTokenList.$TokenList(
          "TokenAppend",
          PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._1.name.token, PureScript$dCST$dRange$dTokenList.TokenEmpty),
          $5
        );
      }
      if (v.tag === "LetBindingPattern") {
        const $5 = tokensOfBinder1.tokensOf(v._1);
        const $6 = PureScript$dCST$dRange$dTokenList.$TokenList(
          "TokenDefer",
          v1 => PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._2, tokensOfWhere(dictTokensOf).tokensOf(v._3))
        );
        if ($6.tag === "TokenEmpty") { return $5; }
        if ($5.tag === "TokenEmpty") { return $6; }
        return PureScript$dCST$dRange$dTokenList.$TokenList("TokenAppend", $5, $6);
      }
      if (v.tag === "LetBindingError") { return dictTokensOf.tokensOf(v._1); }
      $runtime.fail();
    }
  };
};
const tokensOfGuardedExpr = dictTokensOf => (
  {
    tokensOf: v => PureScript$dCST$dRange$dTokenList.$TokenList(
      "TokenCons",
      v.bar,
      PureScript$dCST$dRange$dTokenList.$TokenList(
        "TokenDefer",
        v1 => {
          const $3 = tokensOfSeparated(tokensOfPatternGuard(dictTokensOf)).tokensOf(v.patterns);
          const $4 = tokensOfWhere(dictTokensOf).tokensOf(v.where);
          const $5 = (() => {
            if ($4.tag === "TokenEmpty") { return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v.separator, PureScript$dCST$dRange$dTokenList.TokenEmpty); }
            return PureScript$dCST$dRange$dTokenList.$TokenList(
              "TokenAppend",
              PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v.separator, PureScript$dCST$dRange$dTokenList.TokenEmpty),
              $4
            );
          })();
          if ($5.tag === "TokenEmpty") { return $3; }
          if ($3.tag === "TokenEmpty") { return $5; }
          return PureScript$dCST$dRange$dTokenList.$TokenList("TokenAppend", $3, $5);
        }
      )
    )
  }
);
const tokensOfGuarded = dictTokensOf => (
  {
    tokensOf: v => {
      if (v.tag === "Unconditional") { return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._1, tokensOfWhere(dictTokensOf).tokensOf(v._2)); }
      if (v.tag === "Guarded") {
        const $2 = tokensOfGuardedExpr(dictTokensOf);
        return foldMap2(a => PureScript$dCST$dRange$dTokenList.$TokenList("TokenDefer", v$1 => $2.tokensOf(a)))(v._1);
      }
      $runtime.fail();
    }
  }
);
const tokensOfExpr = dictTokensOf => {
  const tokensOf9 = tokensOfType(dictTokensOf).tokensOf;
  const tokensOfBinder1 = tokensOfBinder(dictTokensOf);
  const tokensOf10 = foldMap2(a => PureScript$dCST$dRange$dTokenList.$TokenList("TokenDefer", v => tokensOfBinder1.tokensOf(a)));
  const tokensOfTuple2 = tokensOfTuple(tokensOfSeparated(tokensOfBinder1));
  return {
    tokensOf: v => {
      if (v.tag === "ExprHole") { return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._1.token, PureScript$dCST$dRange$dTokenList.TokenEmpty); }
      if (v.tag === "ExprSection") { return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._1, PureScript$dCST$dRange$dTokenList.TokenEmpty); }
      if (v.tag === "ExprIdent") { return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._1.token, PureScript$dCST$dRange$dTokenList.TokenEmpty); }
      if (v.tag === "ExprConstructor") { return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._1.token, PureScript$dCST$dRange$dTokenList.TokenEmpty); }
      if (v.tag === "ExprBoolean") { return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._1, PureScript$dCST$dRange$dTokenList.TokenEmpty); }
      if (v.tag === "ExprChar") { return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._1, PureScript$dCST$dRange$dTokenList.TokenEmpty); }
      if (v.tag === "ExprString") { return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._1, PureScript$dCST$dRange$dTokenList.TokenEmpty); }
      if (v.tag === "ExprInt") { return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._1, PureScript$dCST$dRange$dTokenList.TokenEmpty); }
      if (v.tag === "ExprNumber") { return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._1, PureScript$dCST$dRange$dTokenList.TokenEmpty); }
      if (v.tag === "ExprArray") { return tokensOfWrapped({tokensOf: foldMap1(tokensOfSeparated(tokensOfExpr(dictTokensOf)).tokensOf)}).tokensOf(v._1); }
      if (v.tag === "ExprRecord") { return tokensOfWrapped({tokensOf: foldMap1(tokensOfSeparated(tokensOfRecordLabeled(tokensOfExpr(dictTokensOf))).tokensOf)}).tokensOf(v._1); }
      if (v.tag === "ExprParens") { return tokensOfWrapped(tokensOfExpr(dictTokensOf)).tokensOf(v._1); }
      if (v.tag === "ExprTyped") {
        const $6 = tokensOfExpr(dictTokensOf).tokensOf(v._1);
        const $7 = PureScript$dCST$dRange$dTokenList.$TokenList("TokenDefer", v1 => PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._2, tokensOf9(v._3)));
        if ($7.tag === "TokenEmpty") { return $6; }
        if ($6.tag === "TokenEmpty") { return $7; }
        return PureScript$dCST$dRange$dTokenList.$TokenList("TokenAppend", $6, $7);
      }
      if (v.tag === "ExprInfix") {
        const $6 = tokensOfExpr(dictTokensOf).tokensOf(v._1);
        const $7 = PureScript$dCST$dRange$dTokenList.$TokenList(
          "TokenDefer",
          v1 => {
            const $8 = tokensOfTuple(tokensOfWrapped(tokensOfExpr(dictTokensOf)))(tokensOfExpr(dictTokensOf));
            return foldMap2(a => PureScript$dCST$dRange$dTokenList.$TokenList("TokenDefer", v$1 => $8.tokensOf(a)))(v._2);
          }
        );
        if ($7.tag === "TokenEmpty") { return $6; }
        if ($6.tag === "TokenEmpty") { return $7; }
        return PureScript$dCST$dRange$dTokenList.$TokenList("TokenAppend", $6, $7);
      }
      if (v.tag === "ExprOp") {
        const $6 = tokensOfExpr(dictTokensOf).tokensOf(v._1);
        const $7 = PureScript$dCST$dRange$dTokenList.$TokenList(
          "TokenDefer",
          v1 => {
            const $8 = tokensOfTuple(tokensOfQualifiedName)(tokensOfExpr(dictTokensOf));
            return foldMap2(a => PureScript$dCST$dRange$dTokenList.$TokenList("TokenDefer", v$1 => $8.tokensOf(a)))(v._2);
          }
        );
        if ($7.tag === "TokenEmpty") { return $6; }
        if ($6.tag === "TokenEmpty") { return $7; }
        return PureScript$dCST$dRange$dTokenList.$TokenList("TokenAppend", $6, $7);
      }
      if (v.tag === "ExprOpName") { return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._1.token, PureScript$dCST$dRange$dTokenList.TokenEmpty); }
      if (v.tag === "ExprNegate") { return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._1, tokensOfExpr(dictTokensOf).tokensOf(v._2)); }
      if (v.tag === "ExprRecordAccessor") {
        const $6 = tokensOfExpr(dictTokensOf).tokensOf(v._1.expr);
        const $7 = PureScript$dCST$dRange$dTokenList.$TokenList(
          "TokenDefer",
          v1 => PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._1.dot, tokensOfSeparated1.tokensOf(v._1.path))
        );
        if ($7.tag === "TokenEmpty") { return $6; }
        if ($6.tag === "TokenEmpty") { return $7; }
        return PureScript$dCST$dRange$dTokenList.$TokenList("TokenAppend", $6, $7);
      }
      if (v.tag === "ExprRecordUpdate") {
        const $6 = tokensOfExpr(dictTokensOf).tokensOf(v._1);
        const $7 = PureScript$dCST$dRange$dTokenList.$TokenList("TokenDefer", v1 => tokensOfWrapped(tokensOfSeparated(tokensOfRecordUpdate(dictTokensOf))).tokensOf(v._2));
        if ($7.tag === "TokenEmpty") { return $6; }
        if ($6.tag === "TokenEmpty") { return $7; }
        return PureScript$dCST$dRange$dTokenList.$TokenList("TokenAppend", $6, $7);
      }
      if (v.tag === "ExprApp") {
        const $6 = tokensOfExpr(dictTokensOf).tokensOf(v._1);
        const $7 = PureScript$dCST$dRange$dTokenList.$TokenList(
          "TokenDefer",
          v1 => {
            const $8 = tokensOfExpr(dictTokensOf);
            return foldMap2(a => PureScript$dCST$dRange$dTokenList.$TokenList("TokenDefer", v$1 => $8.tokensOf(a)))(v._2);
          }
        );
        if ($7.tag === "TokenEmpty") { return $6; }
        if ($6.tag === "TokenEmpty") { return $7; }
        return PureScript$dCST$dRange$dTokenList.$TokenList("TokenAppend", $6, $7);
      }
      if (v.tag === "ExprLambda") {
        return PureScript$dCST$dRange$dTokenList.$TokenList(
          "TokenCons",
          v._1.symbol,
          PureScript$dCST$dRange$dTokenList.$TokenList(
            "TokenDefer",
            v1 => {
              const $7 = tokensOf10(v._1.binders);
              const $8 = tokensOfExpr(dictTokensOf).tokensOf(v._1.body);
              const $9 = (() => {
                if ($8.tag === "TokenEmpty") { return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._1.arrow, PureScript$dCST$dRange$dTokenList.TokenEmpty); }
                return PureScript$dCST$dRange$dTokenList.$TokenList(
                  "TokenAppend",
                  PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._1.arrow, PureScript$dCST$dRange$dTokenList.TokenEmpty),
                  $8
                );
              })();
              if ($9.tag === "TokenEmpty") { return $7; }
              if ($7.tag === "TokenEmpty") { return $9; }
              return PureScript$dCST$dRange$dTokenList.$TokenList("TokenAppend", $7, $9);
            }
          )
        );
      }
      if (v.tag === "ExprIf") {
        return PureScript$dCST$dRange$dTokenList.$TokenList(
          "TokenCons",
          v._1.keyword,
          PureScript$dCST$dRange$dTokenList.$TokenList(
            "TokenDefer",
            v1 => {
              const $7 = tokensOfExpr(dictTokensOf).tokensOf(v._1.cond);
              const $8 = tokensOfExpr(dictTokensOf).tokensOf(v._1.true);
              const $9 = tokensOfExpr(dictTokensOf).tokensOf(v._1.false);
              const $10 = (() => {
                if ($9.tag === "TokenEmpty") { return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._1.else, PureScript$dCST$dRange$dTokenList.TokenEmpty); }
                return PureScript$dCST$dRange$dTokenList.$TokenList(
                  "TokenAppend",
                  PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._1.else, PureScript$dCST$dRange$dTokenList.TokenEmpty),
                  $9
                );
              })();
              const $11 = (() => {
                if ($10.tag === "TokenEmpty") { return $8; }
                if ($8.tag === "TokenEmpty") { return $10; }
                return PureScript$dCST$dRange$dTokenList.$TokenList("TokenAppend", $8, $10);
              })();
              const $12 = (() => {
                if ($11.tag === "TokenEmpty") { return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._1.then, PureScript$dCST$dRange$dTokenList.TokenEmpty); }
                return PureScript$dCST$dRange$dTokenList.$TokenList(
                  "TokenAppend",
                  PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._1.then, PureScript$dCST$dRange$dTokenList.TokenEmpty),
                  $11
                );
              })();
              if ($12.tag === "TokenEmpty") { return $7; }
              if ($7.tag === "TokenEmpty") { return $12; }
              return PureScript$dCST$dRange$dTokenList.$TokenList("TokenAppend", $7, $12);
            }
          )
        );
      }
      if (v.tag === "ExprCase") {
        return PureScript$dCST$dRange$dTokenList.$TokenList(
          "TokenCons",
          v._1.keyword,
          PureScript$dCST$dRange$dTokenList.$TokenList(
            "TokenDefer",
            v1 => {
              const $7 = tokensOfSeparated(tokensOfExpr(dictTokensOf)).tokensOf(v._1.head);
              const $8 = tokensOfTuple2(tokensOfGuarded(dictTokensOf));
              const $9 = foldMap2(a => PureScript$dCST$dRange$dTokenList.$TokenList("TokenDefer", v$1 => $8.tokensOf(a)))(v._1.branches);
              const $10 = (() => {
                if ($9.tag === "TokenEmpty") { return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._1.of, PureScript$dCST$dRange$dTokenList.TokenEmpty); }
                return PureScript$dCST$dRange$dTokenList.$TokenList(
                  "TokenAppend",
                  PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._1.of, PureScript$dCST$dRange$dTokenList.TokenEmpty),
                  $9
                );
              })();
              if ($10.tag === "TokenEmpty") { return $7; }
              if ($7.tag === "TokenEmpty") { return $10; }
              return PureScript$dCST$dRange$dTokenList.$TokenList("TokenAppend", $7, $10);
            }
          )
        );
      }
      if (v.tag === "ExprLet") {
        return PureScript$dCST$dRange$dTokenList.$TokenList(
          "TokenCons",
          v._1.keyword,
          PureScript$dCST$dRange$dTokenList.$TokenList(
            "TokenDefer",
            v1 => {
              const $7 = tokensOfLetBinding(dictTokensOf);
              const $8 = foldMap2(a => PureScript$dCST$dRange$dTokenList.$TokenList("TokenDefer", v$1 => $7.tokensOf(a)))(v._1.bindings);
              const $9 = tokensOfExpr(dictTokensOf).tokensOf(v._1.body);
              const $10 = (() => {
                if ($9.tag === "TokenEmpty") { return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._1.in, PureScript$dCST$dRange$dTokenList.TokenEmpty); }
                return PureScript$dCST$dRange$dTokenList.$TokenList(
                  "TokenAppend",
                  PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._1.in, PureScript$dCST$dRange$dTokenList.TokenEmpty),
                  $9
                );
              })();
              if ($10.tag === "TokenEmpty") { return $8; }
              if ($8.tag === "TokenEmpty") { return $10; }
              return PureScript$dCST$dRange$dTokenList.$TokenList("TokenAppend", $8, $10);
            }
          )
        );
      }
      if (v.tag === "ExprDo") {
        return PureScript$dCST$dRange$dTokenList.$TokenList(
          "TokenCons",
          v._1.keyword,
          PureScript$dCST$dRange$dTokenList.$TokenList(
            "TokenDefer",
            v1 => {
              const $7 = tokensOfDoStatement(dictTokensOf);
              return foldMap2(a => PureScript$dCST$dRange$dTokenList.$TokenList("TokenDefer", v$1 => $7.tokensOf(a)))(v._1.statements);
            }
          )
        );
      }
      if (v.tag === "ExprAdo") {
        return PureScript$dCST$dRange$dTokenList.$TokenList(
          "TokenCons",
          v._1.keyword,
          PureScript$dCST$dRange$dTokenList.$TokenList(
            "TokenDefer",
            v1 => {
              const $7 = tokensOfDoStatement(dictTokensOf);
              const $8 = foldMap(a => PureScript$dCST$dRange$dTokenList.$TokenList("TokenDefer", v$1 => $7.tokensOf(a)))(v._1.statements);
              const $9 = tokensOfExpr(dictTokensOf).tokensOf(v._1.result);
              const $10 = (() => {
                if ($9.tag === "TokenEmpty") { return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._1.in, PureScript$dCST$dRange$dTokenList.TokenEmpty); }
                return PureScript$dCST$dRange$dTokenList.$TokenList(
                  "TokenAppend",
                  PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._1.in, PureScript$dCST$dRange$dTokenList.TokenEmpty),
                  $9
                );
              })();
              if ($10.tag === "TokenEmpty") { return $8; }
              if ($8.tag === "TokenEmpty") { return $10; }
              return PureScript$dCST$dRange$dTokenList.$TokenList("TokenAppend", $8, $10);
            }
          )
        );
      }
      if (v.tag === "ExprError") { return dictTokensOf.tokensOf(v._1); }
      $runtime.fail();
    }
  };
};
const tokensOfDoStatement = dictTokensOf => {
  const tokensOf9 = tokensOfBinder(dictTokensOf).tokensOf;
  return {
    tokensOf: v => {
      if (v.tag === "DoLet") {
        return PureScript$dCST$dRange$dTokenList.$TokenList(
          "TokenCons",
          v._1,
          PureScript$dCST$dRange$dTokenList.$TokenList(
            "TokenDefer",
            v1 => {
              const $4 = tokensOfLetBinding(dictTokensOf);
              return foldMap2(a => PureScript$dCST$dRange$dTokenList.$TokenList("TokenDefer", v$1 => $4.tokensOf(a)))(v._2);
            }
          )
        );
      }
      if (v.tag === "DoDiscard") { return tokensOfExpr(dictTokensOf).tokensOf(v._1); }
      if (v.tag === "DoBind") {
        const $3 = tokensOf9(v._1);
        const $4 = PureScript$dCST$dRange$dTokenList.$TokenList(
          "TokenDefer",
          v1 => PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._2, tokensOfExpr(dictTokensOf).tokensOf(v._3))
        );
        if ($4.tag === "TokenEmpty") { return $3; }
        if ($3.tag === "TokenEmpty") { return $4; }
        return PureScript$dCST$dRange$dTokenList.$TokenList("TokenAppend", $3, $4);
      }
      if (v.tag === "DoError") { return dictTokensOf.tokensOf(v._1); }
      $runtime.fail();
    }
  };
};
const tokensOfInstanceBinding = dictTokensOf => {
  const tokensOf9 = tokensOfLabeled(tokensOfName)(tokensOfType(dictTokensOf)).tokensOf;
  const $2 = tokensOfBinder(dictTokensOf);
  const tokensOf11 = tokensOfGuarded(dictTokensOf).tokensOf;
  return {
    tokensOf: v => {
      if (v.tag === "InstanceBindingSignature") { return tokensOf9(v._1); }
      if (v.tag === "InstanceBindingName") {
        const $5 = foldMap(a => PureScript$dCST$dRange$dTokenList.$TokenList("TokenDefer", v$1 => $2.tokensOf(a)))(v._1.binders);
        const $6 = tokensOf11(v._1.guarded);
        const $7 = (() => {
          if ($6.tag === "TokenEmpty") { return $5; }
          if ($5.tag === "TokenEmpty") { return $6; }
          return PureScript$dCST$dRange$dTokenList.$TokenList("TokenAppend", $5, $6);
        })();
        if ($7.tag === "TokenEmpty") { return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._1.name.token, PureScript$dCST$dRange$dTokenList.TokenEmpty); }
        return PureScript$dCST$dRange$dTokenList.$TokenList(
          "TokenAppend",
          PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._1.name.token, PureScript$dCST$dRange$dTokenList.TokenEmpty),
          $7
        );
      }
      $runtime.fail();
    }
  };
};
const tokensOfInstance = dictTokensOf => {
  const tokensOfType1 = tokensOfType(dictTokensOf);
  const tokensOf9 = tokensOfOneOrDelimited(tokensOfType1).tokensOf;
  const tokensOf10 = foldMap(a => PureScript$dCST$dRange$dTokenList.$TokenList("TokenDefer", v => tokensOfType1.tokensOf(a)));
  const $4 = tokensOfInstanceBinding(dictTokensOf);
  return {
    tokensOf: v => PureScript$dCST$dRange$dTokenList.$TokenList(
      "TokenCons",
      v.head.keyword,
      PureScript$dCST$dRange$dTokenList.$TokenList(
        "TokenDefer",
        v1 => {
          const $7 = (() => {
            if (v.head.name.tag === "Nothing") { return PureScript$dCST$dRange$dTokenList.TokenEmpty; }
            if (v.head.name.tag === "Just") {
              return PureScript$dCST$dRange$dTokenList.$TokenList(
                "TokenAppend",
                PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v.head.name._1._1.token, PureScript$dCST$dRange$dTokenList.TokenEmpty),
                PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v.head.name._1._2, PureScript$dCST$dRange$dTokenList.TokenEmpty)
              );
            }
            $runtime.fail();
          })();
          const $8 = (() => {
            if (v.head.constraints.tag === "Nothing") { return PureScript$dCST$dRange$dTokenList.TokenEmpty; }
            if (v.head.constraints.tag === "Just") {
              const $8 = tokensOf9(v.head.constraints._1._1);
              if ($8.tag === "TokenEmpty") {
                return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v.head.constraints._1._2, PureScript$dCST$dRange$dTokenList.TokenEmpty);
              }
              return PureScript$dCST$dRange$dTokenList.$TokenList(
                "TokenAppend",
                $8,
                PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v.head.constraints._1._2, PureScript$dCST$dRange$dTokenList.TokenEmpty)
              );
            }
            $runtime.fail();
          })();
          const $9 = tokensOf10(v.head.types);
          const $10 = (() => {
            if (v.body.tag === "Nothing") { return PureScript$dCST$dRange$dTokenList.TokenEmpty; }
            if (v.body.tag === "Just") {
              return PureScript$dCST$dRange$dTokenList.$TokenList(
                "TokenCons",
                v.body._1._1,
                foldMap2(a => PureScript$dCST$dRange$dTokenList.$TokenList("TokenDefer", v$1 => $4.tokensOf(a)))(v.body._1._2)
              );
            }
            $runtime.fail();
          })();
          const $11 = (() => {
            if ($10.tag === "TokenEmpty") { return $9; }
            if ($9.tag === "TokenEmpty") { return $10; }
            return PureScript$dCST$dRange$dTokenList.$TokenList("TokenAppend", $9, $10);
          })();
          const $12 = (() => {
            if ($11.tag === "TokenEmpty") {
              return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v.head.className.token, PureScript$dCST$dRange$dTokenList.TokenEmpty);
            }
            return PureScript$dCST$dRange$dTokenList.$TokenList(
              "TokenAppend",
              PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v.head.className.token, PureScript$dCST$dRange$dTokenList.TokenEmpty),
              $11
            );
          })();
          const $13 = (() => {
            if ($12.tag === "TokenEmpty") { return $8; }
            if ($8.tag === "TokenEmpty") { return $12; }
            return PureScript$dCST$dRange$dTokenList.$TokenList("TokenAppend", $8, $12);
          })();
          if ($13.tag === "TokenEmpty") { return $7; }
          if ($7.tag === "TokenEmpty") { return $13; }
          return PureScript$dCST$dRange$dTokenList.$TokenList("TokenAppend", $7, $13);
        }
      )
    )
  };
};
const tokensOfDecl = dictTokensOf => {
  const $1 = tokensOfTypeVarBinding(dictTokensOf);
  const $2 = foldMap(a => PureScript$dCST$dRange$dTokenList.$TokenList("TokenDefer", v => $1.tokensOf(a)));
  const tokensOf10 = tokensOfSeparated(tokensOfDataCtor(dictTokensOf)).tokensOf;
  const tokensOfType1 = tokensOfType(dictTokensOf);
  const tokensOf12 = tokensOfOneOrDelimited(tokensOfType1).tokensOf;
  const tokensOfLabeled2 = tokensOfLabeled(tokensOfName)(tokensOfType1);
  const tokensOf13 = foldMap2(a => PureScript$dCST$dRange$dTokenList.$TokenList("TokenDefer", v => tokensOfLabeled2.tokensOf(a)));
  const tokensOf14 = tokensOfSeparated(tokensOfInstance(dictTokensOf)).tokensOf;
  const tokensOf15 = foldMap(a => PureScript$dCST$dRange$dTokenList.$TokenList("TokenDefer", v => tokensOfType1.tokensOf(a)));
  const $10 = tokensOfBinder(dictTokensOf);
  const tokensOf18 = tokensOfGuarded(dictTokensOf).tokensOf;
  const tokensOf19 = tokensOfForeign(dictTokensOf).tokensOf;
  return {
    tokensOf: v => {
      if (v.tag === "DeclData") {
        return PureScript$dCST$dRange$dTokenList.$TokenList(
          "TokenCons",
          v._1.keyword,
          PureScript$dCST$dRange$dTokenList.$TokenList(
            "TokenDefer",
            v1 => {
              const $15 = $2(v._1.vars);
              const $16 = (() => {
                if (v._2.tag === "Nothing") { return PureScript$dCST$dRange$dTokenList.TokenEmpty; }
                if (v._2.tag === "Just") { return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._2._1._1, tokensOf10(v._2._1._2)); }
                $runtime.fail();
              })();
              const $17 = (() => {
                if ($16.tag === "TokenEmpty") { return $15; }
                if ($15.tag === "TokenEmpty") { return $16; }
                return PureScript$dCST$dRange$dTokenList.$TokenList("TokenAppend", $15, $16);
              })();
              if ($17.tag === "TokenEmpty") { return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._1.name.token, PureScript$dCST$dRange$dTokenList.TokenEmpty); }
              return PureScript$dCST$dRange$dTokenList.$TokenList(
                "TokenAppend",
                PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._1.name.token, PureScript$dCST$dRange$dTokenList.TokenEmpty),
                $17
              );
            }
          )
        );
      }
      if (v.tag === "DeclType") {
        return PureScript$dCST$dRange$dTokenList.$TokenList(
          "TokenCons",
          v._1.keyword,
          PureScript$dCST$dRange$dTokenList.$TokenList(
            "TokenDefer",
            v1 => {
              const $15 = $2(v._1.vars);
              const $16 = tokensOfType1.tokensOf(v._3);
              const $17 = (() => {
                if ($16.tag === "TokenEmpty") { return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._2, PureScript$dCST$dRange$dTokenList.TokenEmpty); }
                return PureScript$dCST$dRange$dTokenList.$TokenList(
                  "TokenAppend",
                  PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._2, PureScript$dCST$dRange$dTokenList.TokenEmpty),
                  $16
                );
              })();
              const $18 = (() => {
                if ($17.tag === "TokenEmpty") { return $15; }
                if ($15.tag === "TokenEmpty") { return $17; }
                return PureScript$dCST$dRange$dTokenList.$TokenList("TokenAppend", $15, $17);
              })();
              if ($18.tag === "TokenEmpty") { return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._1.name.token, PureScript$dCST$dRange$dTokenList.TokenEmpty); }
              return PureScript$dCST$dRange$dTokenList.$TokenList(
                "TokenAppend",
                PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._1.name.token, PureScript$dCST$dRange$dTokenList.TokenEmpty),
                $18
              );
            }
          )
        );
      }
      if (v.tag === "DeclNewtype") {
        return PureScript$dCST$dRange$dTokenList.$TokenList(
          "TokenCons",
          v._1.keyword,
          PureScript$dCST$dRange$dTokenList.$TokenList(
            "TokenDefer",
            v1 => {
              const $15 = $2(v._1.vars);
              const $16 = tokensOfType1.tokensOf(v._4);
              const $17 = (() => {
                if ($16.tag === "TokenEmpty") { return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._3.token, PureScript$dCST$dRange$dTokenList.TokenEmpty); }
                return PureScript$dCST$dRange$dTokenList.$TokenList(
                  "TokenAppend",
                  PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._3.token, PureScript$dCST$dRange$dTokenList.TokenEmpty),
                  $16
                );
              })();
              const $18 = (() => {
                if ($17.tag === "TokenEmpty") { return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._2, PureScript$dCST$dRange$dTokenList.TokenEmpty); }
                return PureScript$dCST$dRange$dTokenList.$TokenList(
                  "TokenAppend",
                  PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._2, PureScript$dCST$dRange$dTokenList.TokenEmpty),
                  $17
                );
              })();
              const $19 = (() => {
                if ($18.tag === "TokenEmpty") { return $15; }
                if ($15.tag === "TokenEmpty") { return $18; }
                return PureScript$dCST$dRange$dTokenList.$TokenList("TokenAppend", $15, $18);
              })();
              if ($19.tag === "TokenEmpty") { return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._1.name.token, PureScript$dCST$dRange$dTokenList.TokenEmpty); }
              return PureScript$dCST$dRange$dTokenList.$TokenList(
                "TokenAppend",
                PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._1.name.token, PureScript$dCST$dRange$dTokenList.TokenEmpty),
                $19
              );
            }
          )
        );
      }
      if (v.tag === "DeclClass") {
        return PureScript$dCST$dRange$dTokenList.$TokenList(
          "TokenCons",
          v._1.keyword,
          PureScript$dCST$dRange$dTokenList.$TokenList(
            "TokenDefer",
            v1 => {
              const $15 = (() => {
                if (v._1.super.tag === "Nothing") { return PureScript$dCST$dRange$dTokenList.TokenEmpty; }
                if (v._1.super.tag === "Just") {
                  const $15 = tokensOf12(v._1.super._1._1);
                  if ($15.tag === "TokenEmpty") {
                    return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._1.super._1._2, PureScript$dCST$dRange$dTokenList.TokenEmpty);
                  }
                  return PureScript$dCST$dRange$dTokenList.$TokenList(
                    "TokenAppend",
                    $15,
                    PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._1.super._1._2, PureScript$dCST$dRange$dTokenList.TokenEmpty)
                  );
                }
                $runtime.fail();
              })();
              const $16 = $2(v._1.vars);
              const $17 = (() => {
                if (v._1.fundeps.tag === "Nothing") { return PureScript$dCST$dRange$dTokenList.TokenEmpty; }
                if (v._1.fundeps.tag === "Just") { return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._1.fundeps._1._1, tokensOf6(v._1.fundeps._1._2)); }
                $runtime.fail();
              })();
              const $18 = (() => {
                if (v._2.tag === "Nothing") { return PureScript$dCST$dRange$dTokenList.TokenEmpty; }
                if (v._2.tag === "Just") { return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._2._1._1, tokensOf13(v._2._1._2)); }
                $runtime.fail();
              })();
              const $19 = (() => {
                if ($18.tag === "TokenEmpty") { return $17; }
                if ($17.tag === "TokenEmpty") { return $18; }
                return PureScript$dCST$dRange$dTokenList.$TokenList("TokenAppend", $17, $18);
              })();
              const $20 = (() => {
                if ($19.tag === "TokenEmpty") { return $16; }
                if ($16.tag === "TokenEmpty") { return $19; }
                return PureScript$dCST$dRange$dTokenList.$TokenList("TokenAppend", $16, $19);
              })();
              const $21 = (() => {
                if ($20.tag === "TokenEmpty") { return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._1.name.token, PureScript$dCST$dRange$dTokenList.TokenEmpty); }
                return PureScript$dCST$dRange$dTokenList.$TokenList(
                  "TokenAppend",
                  PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._1.name.token, PureScript$dCST$dRange$dTokenList.TokenEmpty),
                  $20
                );
              })();
              if ($21.tag === "TokenEmpty") { return $15; }
              if ($15.tag === "TokenEmpty") { return $21; }
              return PureScript$dCST$dRange$dTokenList.$TokenList("TokenAppend", $15, $21);
            }
          )
        );
      }
      if (v.tag === "DeclInstanceChain") { return tokensOf14(v._1); }
      if (v.tag === "DeclDerive") {
        return PureScript$dCST$dRange$dTokenList.$TokenList(
          "TokenCons",
          v._1,
          PureScript$dCST$dRange$dTokenList.$TokenList(
            "TokenDefer",
            v1 => {
              const $15 = (() => {
                if (v._2.tag === "Nothing") { return PureScript$dCST$dRange$dTokenList.TokenEmpty; }
                if (v._2.tag === "Just") { return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._2._1, PureScript$dCST$dRange$dTokenList.TokenEmpty); }
                $runtime.fail();
              })();
              const $16 = (() => {
                if (v._3.name.tag === "Nothing") { return PureScript$dCST$dRange$dTokenList.TokenEmpty; }
                if (v._3.name.tag === "Just") {
                  return PureScript$dCST$dRange$dTokenList.$TokenList(
                    "TokenAppend",
                    PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._3.name._1._1.token, PureScript$dCST$dRange$dTokenList.TokenEmpty),
                    PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._3.name._1._2, PureScript$dCST$dRange$dTokenList.TokenEmpty)
                  );
                }
                $runtime.fail();
              })();
              const $17 = (() => {
                if (v._3.constraints.tag === "Nothing") { return PureScript$dCST$dRange$dTokenList.TokenEmpty; }
                if (v._3.constraints.tag === "Just") {
                  const $17 = tokensOf12(v._3.constraints._1._1);
                  if ($17.tag === "TokenEmpty") {
                    return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._3.constraints._1._2, PureScript$dCST$dRange$dTokenList.TokenEmpty);
                  }
                  return PureScript$dCST$dRange$dTokenList.$TokenList(
                    "TokenAppend",
                    $17,
                    PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._3.constraints._1._2, PureScript$dCST$dRange$dTokenList.TokenEmpty)
                  );
                }
                $runtime.fail();
              })();
              const $18 = tokensOf15(v._3.types);
              const $19 = (() => {
                if ($18.tag === "TokenEmpty") {
                  return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._3.className.token, PureScript$dCST$dRange$dTokenList.TokenEmpty);
                }
                return PureScript$dCST$dRange$dTokenList.$TokenList(
                  "TokenAppend",
                  PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._3.className.token, PureScript$dCST$dRange$dTokenList.TokenEmpty),
                  $18
                );
              })();
              const $20 = (() => {
                if ($19.tag === "TokenEmpty") { return $17; }
                if ($17.tag === "TokenEmpty") { return $19; }
                return PureScript$dCST$dRange$dTokenList.$TokenList("TokenAppend", $17, $19);
              })();
              const $21 = (() => {
                if ($20.tag === "TokenEmpty") { return $16; }
                if ($16.tag === "TokenEmpty") { return $20; }
                return PureScript$dCST$dRange$dTokenList.$TokenList("TokenAppend", $16, $20);
              })();
              const $22 = (() => {
                if ($21.tag === "TokenEmpty") { return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._3.keyword, PureScript$dCST$dRange$dTokenList.TokenEmpty); }
                return PureScript$dCST$dRange$dTokenList.$TokenList(
                  "TokenAppend",
                  PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._3.keyword, PureScript$dCST$dRange$dTokenList.TokenEmpty),
                  $21
                );
              })();
              if ($22.tag === "TokenEmpty") { return $15; }
              if ($15.tag === "TokenEmpty") { return $22; }
              return PureScript$dCST$dRange$dTokenList.$TokenList("TokenAppend", $15, $22);
            }
          )
        );
      }
      if (v.tag === "DeclKindSignature") {
        return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._1, PureScript$dCST$dRange$dTokenList.$TokenList("TokenDefer", v1 => tokensOfLabeled2.tokensOf(v._2)));
      }
      if (v.tag === "DeclSignature") { return tokensOfLabeled2.tokensOf(v._1); }
      if (v.tag === "DeclValue") {
        const $14 = PureScript$dCST$dRange$dTokenList.$TokenList(
          "TokenDefer",
          v1 => {
            const $15 = foldMap(a => PureScript$dCST$dRange$dTokenList.$TokenList("TokenDefer", v$1 => $10.tokensOf(a)))(v._1.binders);
            const $16 = tokensOf18(v._1.guarded);
            if ($16.tag === "TokenEmpty") { return $15; }
            if ($15.tag === "TokenEmpty") { return $16; }
            return PureScript$dCST$dRange$dTokenList.$TokenList("TokenAppend", $15, $16);
          }
        );
        if ($14.tag === "TokenEmpty") { return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._1.name.token, PureScript$dCST$dRange$dTokenList.TokenEmpty); }
        return PureScript$dCST$dRange$dTokenList.$TokenList(
          "TokenAppend",
          PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._1.name.token, PureScript$dCST$dRange$dTokenList.TokenEmpty),
          $14
        );
      }
      if (v.tag === "DeclFixity") {
        return PureScript$dCST$dRange$dTokenList.$TokenList(
          "TokenCons",
          v._1.keyword._1,
          PureScript$dCST$dRange$dTokenList.$TokenList(
            "TokenDefer",
            v1 => PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._1.prec._1, tokensOfFixityOp.tokensOf(v._1.operator))
          )
        );
      }
      if (v.tag === "DeclForeign") {
        return PureScript$dCST$dRange$dTokenList.$TokenList(
          "TokenCons",
          v._1,
          PureScript$dCST$dRange$dTokenList.$TokenList("TokenDefer", v1 => PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._2, tokensOf19(v._3)))
        );
      }
      if (v.tag === "DeclRole") {
        return PureScript$dCST$dRange$dTokenList.$TokenList(
          "TokenCons",
          v._1,
          PureScript$dCST$dRange$dTokenList.$TokenList(
            "TokenDefer",
            v1 => {
              const $15 = foldMap2(v2 => PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v2._1, PureScript$dCST$dRange$dTokenList.TokenEmpty))(v._4);
              const $16 = (() => {
                if ($15.tag === "TokenEmpty") { return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._3.token, PureScript$dCST$dRange$dTokenList.TokenEmpty); }
                return PureScript$dCST$dRange$dTokenList.$TokenList(
                  "TokenAppend",
                  PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._3.token, PureScript$dCST$dRange$dTokenList.TokenEmpty),
                  $15
                );
              })();
              if ($16.tag === "TokenEmpty") { return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._2, PureScript$dCST$dRange$dTokenList.TokenEmpty); }
              return PureScript$dCST$dRange$dTokenList.$TokenList(
                "TokenAppend",
                PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v._2, PureScript$dCST$dRange$dTokenList.TokenEmpty),
                $16
              );
            }
          )
        );
      }
      if (v.tag === "DeclError") { return dictTokensOf.tokensOf(v._1); }
      $runtime.fail();
    }
  };
};
const tokensOfModule = dictTokensOf => {
  const tokensOf9 = tokensOfWrapped(tokensOfSeparated(tokensOfExport(dictTokensOf))).tokensOf;
  const tokensOf10 = tokensOfImportDecl(dictTokensOf).tokensOf;
  const tokensOf11 = tokensOfDecl(dictTokensOf).tokensOf;
  return {
    tokensOf: v => PureScript$dCST$dRange$dTokenList.$TokenList(
      "TokenCons",
      v.header.keyword,
      (() => {
        const $5 = PureScript$dCST$dRange$dTokenList.$TokenList(
          "TokenDefer",
          v1 => {
            if (v.header.exports.tag === "Nothing") { return PureScript$dCST$dRange$dTokenList.TokenEmpty; }
            if (v.header.exports.tag === "Just") { return tokensOf9(v.header.exports._1); }
            $runtime.fail();
          }
        );
        const $6 = PureScript$dCST$dRange$dTokenList.$TokenList("TokenDefer", v1 => foldMap(tokensOf10)(v.header.imports));
        const $7 = PureScript$dCST$dRange$dTokenList.$TokenList("TokenDefer", v1 => foldMap(tokensOf11)(v.body.decls));
        const $8 = (() => {
          if ($7.tag === "TokenEmpty") { return $6; }
          if ($6.tag === "TokenEmpty") { return $7; }
          return PureScript$dCST$dRange$dTokenList.$TokenList("TokenAppend", $6, $7);
        })();
        const $9 = (() => {
          if ($8.tag === "TokenEmpty") { return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v.header.where, PureScript$dCST$dRange$dTokenList.TokenEmpty); }
          return PureScript$dCST$dRange$dTokenList.$TokenList(
            "TokenAppend",
            PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v.header.where, PureScript$dCST$dRange$dTokenList.TokenEmpty),
            $8
          );
        })();
        const $10 = (() => {
          if ($9.tag === "TokenEmpty") { return $5; }
          if ($5.tag === "TokenEmpty") { return $9; }
          return PureScript$dCST$dRange$dTokenList.$TokenList("TokenAppend", $5, $9);
        })();
        if ($10.tag === "TokenEmpty") { return PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v.header.name.token, PureScript$dCST$dRange$dTokenList.TokenEmpty); }
        return PureScript$dCST$dRange$dTokenList.$TokenList(
          "TokenAppend",
          PureScript$dCST$dRange$dTokenList.$TokenList("TokenCons", v.header.name.token, PureScript$dCST$dRange$dTokenList.TokenEmpty),
          $10
        );
      })()
    )
  };
};
const rangeOfWrapped = {rangeOf: v => ({start: v.open.range.start, end: v.close.range.end})};
const rangeOfVoid = {rangeOf: Data$dVoid.absurd};
const rangeOfRecoveredError = {
  rangeOf: v => {
    if (v.tokens.length > 0) {
      return {
        start: (() => {
          const $1 = Data$dArray.index(v.tokens)(0);
          if ($1.tag === "Just") { return $1._1.range.start; }
          $runtime.fail();
        })(),
        end: (() => {
          const $1 = Data$dArray.index(v.tokens)(v.tokens.length - 1 | 0);
          if ($1.tag === "Just") { return $1._1.range.end; }
          $runtime.fail();
        })()
      };
    }
    return {start: v.position, end: v.position};
  }
};
const rangeOfQualifiedName = {rangeOf: v => v.token.range};
const rangeOfName = {rangeOf: v => v.token.range};
const rangeOfModule = {rangeOf: v => ({start: v.header.keyword.range.start, end: v.body.end})};
const rangeOf = dict => dict.rangeOf;
const rangeOfClassFundep = {
  rangeOf: v => {
    if (v.tag === "FundepDetermined") {
      return {
        start: v._1.range.start,
        end: (() => {
          const $1 = Data$dArray.index(v._2)(v._2.length - 1 | 0);
          if ($1.tag === "Just") { return $1._1.token.range.end; }
          $runtime.fail();
        })()
      };
    }
    if (v.tag === "FundepDetermines") {
      return {
        start: (() => {
          const $1 = Data$dArray.index(v._1)(0);
          if ($1.tag === "Just") { return $1._1.token.range.start; }
          $runtime.fail();
        })(),
        end: (() => {
          const $1 = Data$dArray.index(v._3)(v._3.length - 1 | 0);
          if ($1.tag === "Just") { return $1._1.token.range.end; }
          $runtime.fail();
        })()
      };
    }
    $runtime.fail();
  }
};
const rangeOfDataMembers = {
  rangeOf: v => {
    if (v.tag === "DataAll") { return v._1.range; }
    if (v.tag === "DataEnumerated") { return {start: v._1.open.range.start, end: v._1.close.range.end}; }
    $runtime.fail();
  }
};
const rangeOfExport = dictRangeOf => (
  {
    rangeOf: v => {
      if (v.tag === "ExportValue") { return v._1.token.range; }
      if (v.tag === "ExportOp") { return v._1.token.range; }
      if (v.tag === "ExportType") {
        if (v._2.tag === "Nothing") { return v._1.token.range; }
        if (v._2.tag === "Just") {
          return {
            start: v._1.token.range.start,
            end: (() => {
              if (v._2._1.tag === "DataAll") { return v._2._1._1.range.end; }
              if (v._2._1.tag === "DataEnumerated") { return v._2._1._1.close.range.end; }
              $runtime.fail();
            })()
          };
        }
        $runtime.fail();
      }
      if (v.tag === "ExportTypeOp") { return {start: v._1.range.start, end: v._2.token.range.end}; }
      if (v.tag === "ExportClass") { return {start: v._1.range.start, end: v._2.token.range.end}; }
      if (v.tag === "ExportModule") { return {start: v._1.range.start, end: v._2.token.range.end}; }
      if (v.tag === "ExportError") { return dictRangeOf.rangeOf(v._1); }
      $runtime.fail();
    }
  }
);
const rangeOfFixityOp = {
  rangeOf: v => {
    if (v.tag === "FixityValue") { return {start: v._1.token.range.start, end: v._3.token.range.end}; }
    if (v.tag === "FixityType") { return {start: v._1.range.start, end: v._4.token.range.end}; }
    $runtime.fail();
  }
};
const rangeOfImport = dictRangeOf => (
  {
    rangeOf: v => {
      if (v.tag === "ImportValue") { return v._1.token.range; }
      if (v.tag === "ImportOp") { return v._1.token.range; }
      if (v.tag === "ImportType") {
        if (v._2.tag === "Nothing") { return v._1.token.range; }
        if (v._2.tag === "Just") {
          return {
            start: v._1.token.range.start,
            end: (() => {
              if (v._2._1.tag === "DataAll") { return v._2._1._1.range.end; }
              if (v._2._1.tag === "DataEnumerated") { return v._2._1._1.close.range.end; }
              $runtime.fail();
            })()
          };
        }
        $runtime.fail();
      }
      if (v.tag === "ImportTypeOp") { return {start: v._1.range.start, end: v._2.token.range.end}; }
      if (v.tag === "ImportClass") { return {start: v._1.range.start, end: v._2.token.range.end}; }
      if (v.tag === "ImportError") { return dictRangeOf.rangeOf(v._1); }
      $runtime.fail();
    }
  }
);
const rangeOfImportDecl = {
  rangeOf: v => (
    {
      start: v.keyword.range.start,
      end: (() => {
        if (v.qualified.tag === "Nothing") {
          if (v.names.tag === "Nothing") { return v.module.token.range.end; }
          if (v.names.tag === "Just") { return v.names._1._2.close.range.end; }
          $runtime.fail();
        }
        if (v.qualified.tag === "Just") { return v.qualified._1._2.token.range.end; }
        $runtime.fail();
      })()
    }
  )
};
const rangeOfLabeled = dictRangeOf => dictRangeOf1 => ({rangeOf: v => ({start: dictRangeOf.rangeOf(v.label).start, end: dictRangeOf1.rangeOf(v.value).end})});
const rangeOfOneOrDelimited = dictRangeOf => (
  {
    rangeOf: v => {
      if (v.tag === "One") { return dictRangeOf.rangeOf(v._1); }
      if (v.tag === "Many") { return {start: v._1.open.range.start, end: v._1.close.range.end}; }
      $runtime.fail();
    }
  }
);
const rangeOfSeparated = dictRangeOf => (
  {
    rangeOf: v => {
      const v1 = Data$dArray.index(v.tail)(v.tail.length - 1 | 0);
      if (v1.tag === "Just") { return {start: dictRangeOf.rangeOf(v.head).start, end: dictRangeOf.rangeOf(v1._1._2).end}; }
      if (v1.tag === "Nothing") { return dictRangeOf.rangeOf(v.head); }
      $runtime.fail();
    }
  }
);
const rangeOf6 = /* #__PURE__ */ (() => rangeOfSeparated(rangeOfName).rangeOf)();
const rangeOf7 = /* #__PURE__ */ (() => rangeOfSeparated(rangeOfClassFundep).rangeOf)();
const rangeOfType = dictRangeOf => (
  {
    rangeOf: v => {
      if (v.tag === "TypeVar") { return v._1.token.range; }
      if (v.tag === "TypeConstructor") { return v._1.token.range; }
      if (v.tag === "TypeWildcard") { return v._1.range; }
      if (v.tag === "TypeHole") { return v._1.token.range; }
      if (v.tag === "TypeString") { return v._1.range; }
      if (v.tag === "TypeInt") {
        if (v._1.tag === "Nothing") { return v._2.range; }
        if (v._1.tag === "Just") { return {start: v._1._1.range.start, end: v._2.range.end}; }
        $runtime.fail();
      }
      if (v.tag === "TypeRow") { return {start: v._1.open.range.start, end: v._1.close.range.end}; }
      if (v.tag === "TypeRecord") { return {start: v._1.open.range.start, end: v._1.close.range.end}; }
      if (v.tag === "TypeForall") { return {start: v._1.range.start, end: rangeOfType(dictRangeOf).rangeOf(v._4).end}; }
      if (v.tag === "TypeKinded") { return {start: rangeOfType(dictRangeOf).rangeOf(v._1).start, end: rangeOfType(dictRangeOf).rangeOf(v._3).end}; }
      if (v.tag === "TypeApp") {
        return {
          start: rangeOfType(dictRangeOf).rangeOf(v._1).start,
          end: rangeOfType(dictRangeOf).rangeOf((() => {
            const $2 = Data$dArray.index(v._2)(v._2.length - 1 | 0);
            if ($2.tag === "Just") { return $2._1; }
            $runtime.fail();
          })()).end
        };
      }
      if (v.tag === "TypeOp") {
        return {
          start: rangeOfType(dictRangeOf).rangeOf(v._1).start,
          end: rangeOfType(dictRangeOf).rangeOf((() => {
            const $2 = Data$dArray.index(v._2)(v._2.length - 1 | 0);
            if ($2.tag === "Just") { return $2._1._2; }
            $runtime.fail();
          })()).end
        };
      }
      if (v.tag === "TypeOpName") { return v._1.token.range; }
      if (v.tag === "TypeArrow") { return {start: rangeOfType(dictRangeOf).rangeOf(v._1).start, end: rangeOfType(dictRangeOf).rangeOf(v._3).end}; }
      if (v.tag === "TypeArrowName") { return v._1.range; }
      if (v.tag === "TypeConstrained") { return {start: rangeOfType(dictRangeOf).rangeOf(v._1).start, end: rangeOfType(dictRangeOf).rangeOf(v._3).end}; }
      if (v.tag === "TypeParens") { return {start: v._1.open.range.start, end: v._1.close.range.end}; }
      if (v.tag === "TypeError") { return dictRangeOf.rangeOf(v._1); }
      $runtime.fail();
    }
  }
);
const rangeOfBinder = dictRangeOf => {
  const rangeOf9 = rangeOfType(dictRangeOf).rangeOf;
  return {
    rangeOf: v => {
      if (v.tag === "BinderWildcard") { return v._1.range; }
      if (v.tag === "BinderVar") { return v._1.token.range; }
      if (v.tag === "BinderNamed") { return {start: v._1.token.range.start, end: rangeOfBinder(dictRangeOf).rangeOf(v._3).end}; }
      if (v.tag === "BinderConstructor") {
        const v1 = Data$dArray.index(v._2)(v._2.length - 1 | 0);
        if (v1.tag === "Nothing") { return v._1.token.range; }
        if (v1.tag === "Just") { return {start: v._1.token.range.start, end: rangeOfBinder(dictRangeOf).rangeOf(v1._1).end}; }
        $runtime.fail();
      }
      if (v.tag === "BinderBoolean") { return v._1.range; }
      if (v.tag === "BinderChar") { return v._1.range; }
      if (v.tag === "BinderString") { return v._1.range; }
      if (v.tag === "BinderInt") {
        if (v._1.tag === "Nothing") { return v._2.range; }
        if (v._1.tag === "Just") { return {start: v._1._1.range.start, end: v._2.range.end}; }
        $runtime.fail();
      }
      if (v.tag === "BinderNumber") {
        if (v._1.tag === "Nothing") { return v._2.range; }
        if (v._1.tag === "Just") { return {start: v._1._1.range.start, end: v._2.range.end}; }
        $runtime.fail();
      }
      if (v.tag === "BinderArray") { return {start: v._1.open.range.start, end: v._1.close.range.end}; }
      if (v.tag === "BinderRecord") { return {start: v._1.open.range.start, end: v._1.close.range.end}; }
      if (v.tag === "BinderParens") { return {start: v._1.open.range.start, end: v._1.close.range.end}; }
      if (v.tag === "BinderTyped") { return {start: rangeOfBinder(dictRangeOf).rangeOf(v._1).start, end: rangeOf9(v._3).end}; }
      if (v.tag === "BinderOp") {
        return {
          start: rangeOfBinder(dictRangeOf).rangeOf(v._1).start,
          end: rangeOfBinder(dictRangeOf).rangeOf((() => {
            const $3 = Data$dArray.index(v._2)(v._2.length - 1 | 0);
            if ($3.tag === "Just") { return $3._1._2; }
            $runtime.fail();
          })()).end
        };
      }
      if (v.tag === "BinderError") { return dictRangeOf.rangeOf(v._1); }
      $runtime.fail();
    }
  };
};
const rangeOfDataCtor = dictRangeOf => {
  const rangeOf9 = rangeOfType(dictRangeOf).rangeOf;
  return {
    rangeOf: v => {
      const v2 = Data$dArray.index(v.fields)(v.fields.length - 1 | 0);
      return {
        start: v.name.token.range.start,
        end: (() => {
          if (v2.tag === "Nothing") { return v.name.token.range.end; }
          if (v2.tag === "Just") { return rangeOf9(v2._1).end; }
          $runtime.fail();
        })()
      };
    }
  };
};
const rangeOfForeign = dictRangeOf => {
  const $1 = rangeOfType(dictRangeOf);
  return {
    rangeOf: v => {
      if (v.tag === "ForeignValue") { return {start: v._1.label.token.range.start, end: $1.rangeOf(v._1.value).end}; }
      if (v.tag === "ForeignData") { return {start: v._1.range.start, end: $1.rangeOf(v._2.value).end}; }
      if (v.tag === "ForeignKind") { return {start: v._1.range.start, end: v._2.token.range.end}; }
      $runtime.fail();
    }
  };
};
const rangeOfTypeVarBinding = {
  rangeOf: v => {
    if (v.tag === "TypeVarKinded") { return {start: v._1.open.range.start, end: v._1.close.range.end}; }
    if (v.tag === "TypeVarName") { return v._1.token.range; }
    $runtime.fail();
  }
};
const rangeOfWhere = dictRangeOf => (
  {
    rangeOf: v => {
      if (v.bindings.tag === "Nothing") { return rangeOfExpr(dictRangeOf).rangeOf(v.expr); }
      if (v.bindings.tag === "Just") {
        return {
          start: rangeOfExpr(dictRangeOf).rangeOf(v.expr).start,
          end: rangeOfLetBinding(dictRangeOf).rangeOf((() => {
            const $2 = Data$dArray.index(v.bindings._1._2)(v.bindings._1._2.length - 1 | 0);
            if ($2.tag === "Just") { return $2._1; }
            $runtime.fail();
          })()).end
        };
      }
      $runtime.fail();
    }
  }
);
const rangeOfLetBinding = dictRangeOf => {
  const $1 = rangeOfType(dictRangeOf);
  const rangeOf10 = rangeOfBinder(dictRangeOf).rangeOf;
  return {
    rangeOf: v => {
      if (v.tag === "LetBindingSignature") { return {start: v._1.label.token.range.start, end: $1.rangeOf(v._1.value).end}; }
      if (v.tag === "LetBindingName") { return {start: v._1.name.token.range.start, end: rangeOfGuarded(dictRangeOf).rangeOf(v._1.guarded).end}; }
      if (v.tag === "LetBindingPattern") { return {start: rangeOf10(v._1).start, end: rangeOfWhere(dictRangeOf).rangeOf(v._3).end}; }
      if (v.tag === "LetBindingError") { return dictRangeOf.rangeOf(v._1); }
      $runtime.fail();
    }
  };
};
const rangeOfGuardedExpr = dictRangeOf => ({rangeOf: v => ({start: v.bar.range.start, end: rangeOfWhere(dictRangeOf).rangeOf(v.where).end})});
const rangeOfGuarded = dictRangeOf => (
  {
    rangeOf: v => {
      if (v.tag === "Unconditional") { return {start: v._1.range.start, end: rangeOfWhere(dictRangeOf).rangeOf(v._2).end}; }
      if (v.tag === "Guarded") {
        return {
          start: rangeOfGuardedExpr(dictRangeOf).rangeOf((() => {
            const $2 = Data$dArray.index(v._1)(0);
            if ($2.tag === "Just") { return $2._1; }
            $runtime.fail();
          })()).start,
          end: rangeOfGuardedExpr(dictRangeOf).rangeOf((() => {
            const $2 = Data$dArray.index(v._1)(v._1.length - 1 | 0);
            if ($2.tag === "Just") { return $2._1; }
            $runtime.fail();
          })()).end
        };
      }
      $runtime.fail();
    }
  }
);
const rangeOfExpr = dictRangeOf => {
  const rangeOf9 = rangeOfType(dictRangeOf).rangeOf;
  return {
    rangeOf: v => {
      if (v.tag === "ExprHole") { return v._1.token.range; }
      if (v.tag === "ExprSection") { return v._1.range; }
      if (v.tag === "ExprIdent") { return v._1.token.range; }
      if (v.tag === "ExprConstructor") { return v._1.token.range; }
      if (v.tag === "ExprBoolean") { return v._1.range; }
      if (v.tag === "ExprChar") { return v._1.range; }
      if (v.tag === "ExprString") { return v._1.range; }
      if (v.tag === "ExprInt") { return v._1.range; }
      if (v.tag === "ExprNumber") { return v._1.range; }
      if (v.tag === "ExprArray") { return {start: v._1.open.range.start, end: v._1.close.range.end}; }
      if (v.tag === "ExprRecord") { return {start: v._1.open.range.start, end: v._1.close.range.end}; }
      if (v.tag === "ExprParens") { return {start: v._1.open.range.start, end: v._1.close.range.end}; }
      if (v.tag === "ExprTyped") { return {start: rangeOfExpr(dictRangeOf).rangeOf(v._1).start, end: rangeOf9(v._3).end}; }
      if (v.tag === "ExprInfix") {
        return {
          start: rangeOfExpr(dictRangeOf).rangeOf(v._1).start,
          end: rangeOfExpr(dictRangeOf).rangeOf((() => {
            const $3 = Data$dArray.index(v._2)(v._2.length - 1 | 0);
            if ($3.tag === "Just") { return $3._1._2; }
            $runtime.fail();
          })()).end
        };
      }
      if (v.tag === "ExprOp") {
        return {
          start: rangeOfExpr(dictRangeOf).rangeOf(v._1).start,
          end: rangeOfExpr(dictRangeOf).rangeOf((() => {
            const $3 = Data$dArray.index(v._2)(v._2.length - 1 | 0);
            if ($3.tag === "Just") { return $3._1._2; }
            $runtime.fail();
          })()).end
        };
      }
      if (v.tag === "ExprOpName") { return v._1.token.range; }
      if (v.tag === "ExprNegate") { return {start: v._1.range.start, end: rangeOfExpr(dictRangeOf).rangeOf(v._2).end}; }
      if (v.tag === "ExprRecordAccessor") { return {start: rangeOfExpr(dictRangeOf).rangeOf(v._1.expr).start, end: rangeOf6(v._1.path).end}; }
      if (v.tag === "ExprRecordUpdate") { return {start: rangeOfExpr(dictRangeOf).rangeOf(v._1).start, end: v._2.close.range.end}; }
      if (v.tag === "ExprApp") {
        return {
          start: rangeOfExpr(dictRangeOf).rangeOf(v._1).start,
          end: rangeOfExpr(dictRangeOf).rangeOf((() => {
            const $3 = Data$dArray.index(v._2)(v._2.length - 1 | 0);
            if ($3.tag === "Just") { return $3._1; }
            $runtime.fail();
          })()).end
        };
      }
      if (v.tag === "ExprLambda") { return {start: v._1.symbol.range.start, end: rangeOfExpr(dictRangeOf).rangeOf(v._1.body).end}; }
      if (v.tag === "ExprIf") { return {start: v._1.keyword.range.start, end: rangeOfExpr(dictRangeOf).rangeOf(v._1.false).end}; }
      if (v.tag === "ExprCase") {
        return {
          start: v._1.keyword.range.start,
          end: rangeOfGuarded(dictRangeOf).rangeOf((() => {
            const $3 = Data$dArray.index(v._1.branches)(v._1.branches.length - 1 | 0);
            if ($3.tag === "Just") { return $3._1._2; }
            $runtime.fail();
          })()).end
        };
      }
      if (v.tag === "ExprLet") { return {start: v._1.keyword.range.start, end: rangeOfExpr(dictRangeOf).rangeOf(v._1.body).end}; }
      if (v.tag === "ExprDo") {
        return {
          start: v._1.keyword.range.start,
          end: rangeOfDoStatement(dictRangeOf).rangeOf((() => {
            const $3 = Data$dArray.index(v._1.statements)(v._1.statements.length - 1 | 0);
            if ($3.tag === "Just") { return $3._1; }
            $runtime.fail();
          })()).end
        };
      }
      if (v.tag === "ExprAdo") { return {start: v._1.keyword.range.start, end: rangeOfExpr(dictRangeOf).rangeOf(v._1.result).end}; }
      if (v.tag === "ExprError") { return dictRangeOf.rangeOf(v._1); }
      $runtime.fail();
    }
  };
};
const rangeOfDoStatement = dictRangeOf => {
  const rangeOf9 = rangeOfBinder(dictRangeOf).rangeOf;
  return {
    rangeOf: v => {
      if (v.tag === "DoLet") {
        return {
          start: v._1.range.start,
          end: rangeOfLetBinding(dictRangeOf).rangeOf((() => {
            const $3 = Data$dArray.index(v._2)(v._2.length - 1 | 0);
            if ($3.tag === "Just") { return $3._1; }
            $runtime.fail();
          })()).end
        };
      }
      if (v.tag === "DoDiscard") { return rangeOfExpr(dictRangeOf).rangeOf(v._1); }
      if (v.tag === "DoBind") { return {start: rangeOf9(v._1).start, end: rangeOfExpr(dictRangeOf).rangeOf(v._3).end}; }
      if (v.tag === "DoError") { return dictRangeOf.rangeOf(v._1); }
      $runtime.fail();
    }
  };
};
const rangeOfInstanceBinding = dictRangeOf => {
  const $1 = rangeOfType(dictRangeOf);
  const rangeOf10 = rangeOfGuarded(dictRangeOf).rangeOf;
  return {
    rangeOf: v => {
      if (v.tag === "InstanceBindingSignature") { return {start: v._1.label.token.range.start, end: $1.rangeOf(v._1.value).end}; }
      if (v.tag === "InstanceBindingName") { return {start: v._1.name.token.range.start, end: rangeOf10(v._1.guarded).end}; }
      $runtime.fail();
    }
  };
};
const rangeOfInstance = dictRangeOf => {
  const rangeOf9 = rangeOfType(dictRangeOf).rangeOf;
  const rangeOf10 = rangeOfInstanceBinding(dictRangeOf).rangeOf;
  return {
    rangeOf: v => (
      {
        start: v.head.keyword.range.start,
        end: (() => {
          if (v.body.tag === "Nothing") {
            const v2 = Data$dArray.index(v.head.types)(v.head.types.length - 1 | 0);
            if (v2.tag === "Nothing") { return v.head.className.token.range.end; }
            if (v2.tag === "Just") { return rangeOf9(v2._1).end; }
            $runtime.fail();
          }
          if (v.body.tag === "Just") {
            return rangeOf10((() => {
              const $4 = Data$dArray.index(v.body._1._2)(v.body._1._2.length - 1 | 0);
              if ($4.tag === "Just") { return $4._1; }
              $runtime.fail();
            })()).end;
          }
          $runtime.fail();
        })()
      }
    )
  };
};
const rangeOfDecl = dictRangeOf => {
  const rangeOf9 = rangeOfDataCtor(dictRangeOf).rangeOf;
  const rangeOfType1 = rangeOfType(dictRangeOf);
  const rangeOf12 = rangeOfSeparated(rangeOfInstance(dictRangeOf)).rangeOf;
  const rangeOf13 = rangeOfGuarded(dictRangeOf).rangeOf;
  const rangeOf14 = rangeOfForeign(dictRangeOf).rangeOf;
  return {
    rangeOf: v => {
      if (v.tag === "DeclData") {
        return {
          start: v._1.keyword.range.start,
          end: (() => {
            if (v._2.tag === "Nothing") {
              const v2 = Data$dArray.index(v._1.vars)(v._1.vars.length - 1 | 0);
              if (v2.tag === "Nothing") { return v._1.name.token.range.end; }
              if (v2.tag === "Just") {
                if (v2._1.tag === "TypeVarKinded") { return v2._1._1.close.range.end; }
                if (v2._1.tag === "TypeVarName") { return v2._1._1.token.range.end; }
                $runtime.fail();
              }
              $runtime.fail();
            }
            if (v._2.tag === "Just") {
              return rangeOf9((() => {
                const $7 = Data$dArray.index(v._2._1._2.tail)(v._2._1._2.tail.length - 1 | 0);
                if ($7.tag === "Nothing") { return v._2._1._2.head; }
                if ($7.tag === "Just") { return $7._1._2; }
                $runtime.fail();
              })()).end;
            }
            $runtime.fail();
          })()
        };
      }
      if (v.tag === "DeclType") { return {start: v._1.keyword.range.start, end: rangeOfType1.rangeOf(v._3).end}; }
      if (v.tag === "DeclNewtype") { return {start: v._1.keyword.range.start, end: rangeOfType1.rangeOf(v._4).end}; }
      if (v.tag === "DeclClass") {
        return {
          start: v._1.keyword.range.start,
          end: (() => {
            if (v._2.tag === "Nothing") {
              if (v._1.fundeps.tag === "Nothing") {
                const v2 = Data$dArray.index(v._1.vars)(v._1.vars.length - 1 | 0);
                if (v2.tag === "Nothing") { return v._1.name.token.range.end; }
                if (v2.tag === "Just") {
                  if (v2._1.tag === "TypeVarKinded") { return v2._1._1.close.range.end; }
                  if (v2._1.tag === "TypeVarName") { return v2._1._1.token.range.end; }
                  $runtime.fail();
                }
                $runtime.fail();
              }
              if (v._1.fundeps.tag === "Just") { return rangeOf7(v._1.fundeps._1._2).end; }
              $runtime.fail();
            }
            if (v._2.tag === "Just") {
              const $7 = Data$dArray.index(v._2._1._2)(v._2._1._2.length - 1 | 0);
              return rangeOfType1.rangeOf((() => {
                if ($7.tag === "Just") { return $7._1.value; }
                $runtime.fail();
              })()).end;
            }
            $runtime.fail();
          })()
        };
      }
      if (v.tag === "DeclInstanceChain") { return rangeOf12(v._1); }
      if (v.tag === "DeclDerive") {
        const v2 = Data$dArray.index(v._3.types)(v._3.types.length - 1 | 0);
        return {
          start: v._1.range.start,
          end: (() => {
            if (v2.tag === "Nothing") { return v._3.className.token.range.end; }
            if (v2.tag === "Just") { return rangeOfType1.rangeOf(v2._1).end; }
            $runtime.fail();
          })()
        };
      }
      if (v.tag === "DeclKindSignature") { return {start: v._1.range.start, end: rangeOfType1.rangeOf(v._2.value).end}; }
      if (v.tag === "DeclSignature") { return {start: v._1.label.token.range.start, end: rangeOfType1.rangeOf(v._1.value).end}; }
      if (v.tag === "DeclValue") { return {start: v._1.name.token.range.start, end: rangeOf13(v._1.guarded).end}; }
      if (v.tag === "DeclFixity") {
        return {
          start: v._1.keyword._1.range.start,
          end: (() => {
            if (v._1.operator.tag === "FixityValue") { return v._1.operator._3.token.range.end; }
            if (v._1.operator.tag === "FixityType") { return v._1.operator._4.token.range.end; }
            $runtime.fail();
          })()
        };
      }
      if (v.tag === "DeclForeign") { return {start: v._1.range.start, end: rangeOf14(v._3).end}; }
      if (v.tag === "DeclRole") {
        return {
          start: v._1.range.start,
          end: (() => {
            const $7 = Data$dArray.index(v._4)(v._4.length - 1 | 0);
            if ($7.tag === "Just") { return $7._1._1.range.end; }
            $runtime.fail();
          })()
        };
      }
      if (v.tag === "DeclError") { return dictRangeOf.rangeOf(v._1); }
      $runtime.fail();
    }
  };
};
export {
  foldMap,
  foldMap1,
  foldMap2,
  rangeOf,
  rangeOf6,
  rangeOf7,
  rangeOfBinder,
  rangeOfClassFundep,
  rangeOfDataCtor,
  rangeOfDataMembers,
  rangeOfDecl,
  rangeOfDoStatement,
  rangeOfExport,
  rangeOfExpr,
  rangeOfFixityOp,
  rangeOfForeign,
  rangeOfGuarded,
  rangeOfGuardedExpr,
  rangeOfImport,
  rangeOfImportDecl,
  rangeOfInstance,
  rangeOfInstanceBinding,
  rangeOfLabeled,
  rangeOfLetBinding,
  rangeOfModule,
  rangeOfName,
  rangeOfOneOrDelimited,
  rangeOfQualifiedName,
  rangeOfRecoveredError,
  rangeOfSeparated,
  rangeOfType,
  rangeOfTypeVarBinding,
  rangeOfVoid,
  rangeOfWhere,
  rangeOfWrapped,
  tokensOf,
  tokensOf4,
  tokensOf6,
  tokensOf7,
  tokensOfArray,
  tokensOfBinder,
  tokensOfClassFundep,
  tokensOfDataCtor,
  tokensOfDataMembers,
  tokensOfDecl,
  tokensOfDoStatement,
  tokensOfExport,
  tokensOfExpr,
  tokensOfFixityOp,
  tokensOfForeign,
  tokensOfGuarded,
  tokensOfGuardedExpr,
  tokensOfImport,
  tokensOfImportDecl,
  tokensOfInstance,
  tokensOfInstanceBinding,
  tokensOfLabeled,
  tokensOfLetBinding,
  tokensOfMaybe,
  tokensOfModule,
  tokensOfName,
  tokensOfNonEmptyArray,
  tokensOfOneOrDelimited,
  tokensOfPatternGuard,
  tokensOfQualifiedName,
  tokensOfRecordLabeled,
  tokensOfRecordUpdate,
  tokensOfRecoveredError,
  tokensOfRow,
  tokensOfSeparated,
  tokensOfSeparated1,
  tokensOfTuple,
  tokensOfType,
  tokensOfTypeVarBinding,
  tokensOfVoid,
  tokensOfWhere,
  tokensOfWrapped
};
