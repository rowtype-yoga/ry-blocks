import * as $runtime from "../runtime.js";
import * as Control$dApplicative from "../Control.Applicative/index.js";
import * as Control$dMonad$dExcept$dTrans from "../Control.Monad.Except.Trans/index.js";
import * as Control$dMonad$dST$dInternal from "../Control.Monad.ST.Internal/index.js";
import * as Data$dArray from "../Data.Array/index.js";
import * as Data$dBifunctor from "../Data.Bifunctor/index.js";
import * as Data$dDateTime$dInstant from "../Data.DateTime.Instant/index.js";
import * as Data$dEither from "../Data.Either/index.js";
import * as Data$dFoldable from "../Data.Foldable/index.js";
import * as Data$dFunctor from "../Data.Functor/index.js";
import * as Data$dFunctorWithIndex from "../Data.FunctorWithIndex/index.js";
import * as Data$dIdentity from "../Data.Identity/index.js";
import * as Data$dInt from "../Data.Int/index.js";
import * as Data$dJSDate from "../Data.JSDate/index.js";
import * as Data$dList$dTypes from "../Data.List.Types/index.js";
import * as Data$dMap$dInternal from "../Data.Map.Internal/index.js";
import * as Data$dMaybe from "../Data.Maybe/index.js";
import * as Data$dMonoid from "../Data.Monoid/index.js";
import * as Data$dNonEmpty from "../Data.NonEmpty/index.js";
import * as Data$dNullable from "../Data.Nullable/index.js";
import * as Data$dNumber from "../Data.Number/index.js";
import * as Data$dOrd from "../Data.Ord/index.js";
import * as Data$dSemigroup from "../Data.Semigroup/index.js";
import * as Data$dShow from "../Data.Show/index.js";
import * as Data$dTraversable from "../Data.Traversable/index.js";
import * as Data$dTuple from "../Data.Tuple/index.js";
import * as Data$dUnfoldable from "../Data.Unfoldable/index.js";
import * as Effect$dException from "../Effect.Exception/index.js";
import * as Effect$dUncurried from "../Effect.Uncurried/index.js";
import * as Effect$dUnsafe from "../Effect.Unsafe/index.js";
import * as Foreign from "../Foreign/index.js";
import * as Foreign$dIndex from "../Foreign.Index/index.js";
import * as Foreign$dObject from "../Foreign.Object/index.js";
import * as Foreign$dObject$dST from "../Foreign.Object.ST/index.js";
import * as Js$dBigInt$dBigInt from "../Js.BigInt.BigInt/index.js";
import * as Partial from "../Partial/index.js";
import * as Record$dBuilder from "../Record.Builder/index.js";
import * as Record$dUnsafe from "../Record.Unsafe/index.js";
import * as Type$dProxy from "../Type.Proxy/index.js";
import * as Unsafe$dCoerce from "../Unsafe.Coerce/index.js";
import {_parseJSON, _undefined, _unsafeStringify} from "./foreign.js";
const identity = x => x;
const fail = /* #__PURE__ */ (() => {
  const $0 = Control$dMonad$dExcept$dTrans.monadThrowExceptT(Data$dIdentity.monadIdentity).throwError;
  return x => $0(Data$dNonEmpty.$NonEmpty(x, Data$dList$dTypes.Nil));
})();
const readString = /* #__PURE__ */ Foreign.unsafeReadTagged(Data$dIdentity.monadIdentity)("String");
const readNumber = /* #__PURE__ */ Foreign.unsafeReadTagged(Data$dIdentity.monadIdentity)("Number");
const readInt = /* #__PURE__ */ Foreign.readInt(Data$dIdentity.monadIdentity);
const applicativeExceptT = /* #__PURE__ */ Control$dMonad$dExcept$dTrans.applicativeExceptT(Data$dIdentity.monadIdentity);
const typeIsSymbol = {reflectSymbol: () => "type"};
const valueIsSymbol = {reflectSymbol: () => "value"};
const functorExceptT = {
  map: f => m => {
    if (m.tag === "Left") { return Data$dEither.$Either("Left", m._1); }
    if (m.tag === "Right") { return Data$dEither.$Either("Right", f(m._1)); }
    $runtime.fail();
  }
};
const bindExceptT = /* #__PURE__ */ Control$dMonad$dExcept$dTrans.bindExceptT(Data$dIdentity.monadIdentity);
const traverse = /* #__PURE__ */ (() => Data$dTraversable.traversableMaybe.traverse(applicativeExceptT))();
const readNull = /* #__PURE__ */ Foreign.readNull(Data$dIdentity.monadIdentity);
const toUnfoldable = /* #__PURE__ */ (() => {
  const $0 = Foreign$dObject.toArrayWithKey(Data$dTuple.Tuple);
  return x => Data$dArray.toUnfoldable(Data$dUnfoldable.unfoldableArray)($0(x));
})();
const alt = /* #__PURE__ */ (() => Control$dMonad$dExcept$dTrans.altExceptT(Data$dList$dTypes.semigroupNonEmptyList)(Data$dIdentity.monadIdentity).alt)();
const readProp = /* #__PURE__ */ Foreign$dIndex.unsafeReadProp(Data$dIdentity.monadIdentity);
const readArray = /* #__PURE__ */ Foreign.readArray(Data$dIdentity.monadIdentity);
const throwError = /* #__PURE__ */ (() => Control$dMonad$dExcept$dTrans.monadThrowExceptT(Data$dIdentity.monadIdentity).throwError)();
const writeForeignVariantNilRow = {writeVariantImpl: v => v1 => Partial._crashWith("Attempted to write empty variant.")};
const writeForeignString = {writeImpl: Unsafe$dCoerce.unsafeCoerce};
const writeForeignNumber = {writeImpl: Unsafe$dCoerce.unsafeCoerce};
const writeForeignInt = {writeImpl: Unsafe$dCoerce.unsafeCoerce};
const writeForeignForeign = {writeImpl: x => x};
const writeForeignFieldsNilRowR = {writeImplFields: v => v1 => identity};
const writeForeignChar = {writeImpl: Unsafe$dCoerce.unsafeCoerce};
const writeForeignBoolean = {writeImpl: Unsafe$dCoerce.unsafeCoerce};
const writeForeignBigInt = {writeImpl: Unsafe$dCoerce.unsafeCoerce};
const readForeignVariantNil = {readVariantImpl: v => v1 => fail(Foreign.$ForeignError("ForeignError", "Unable to match any variant member."))};
const readForeignString = {readImpl: readString};
const readForeignNumber = {readImpl: readNumber};
const readForeignInt = {readImpl: readInt};
const readForeignForeign = /* #__PURE__ */ (() => ({readImpl: applicativeExceptT.pure}))();
const readForeignFieldsNilRowRo = {getFields: v => v1 => applicativeExceptT.pure(identity)};
const readForeignChar = {readImpl: /* #__PURE__ */ Foreign.readChar(Data$dIdentity.monadIdentity)};
const readForeignBoolean = {readImpl: /* #__PURE__ */ Foreign.unsafeReadTagged(Data$dIdentity.monadIdentity)("Boolean")};
const writeVariantImpl = dict => dict.writeVariantImpl;
const writeForeignVariant = () => dictWriteForeignVariant => ({writeImpl: variant => dictWriteForeignVariant.writeVariantImpl(Type$dProxy.Proxy)(variant)});
const writeImplFields = dict => dict.writeImplFields;
const writeForeignRecord = () => dictWriteForeignFields => ({writeImpl: rec => dictWriteForeignFields.writeImplFields(Type$dProxy.Proxy)(rec)({})});
const writeImpl = dict => dict.writeImpl;
const writeJSON = dictWriteForeign => x => _unsafeStringify(dictWriteForeign.writeImpl(x));
const writeForeignArray = dictWriteForeign => ({writeImpl: xs => Data$dFunctor.arrayMap(dictWriteForeign.writeImpl)(xs)});
const writeForeignFieldsCons = dictIsSymbol => dictWriteForeign => dictWriteForeignFields => () => () => () => (
  {
    writeImplFields: v => rec => {
      const $8 = Record$dBuilder.insert()()(dictIsSymbol)(Type$dProxy.Proxy)(dictWriteForeign.writeImpl(Record$dUnsafe.unsafeGet(dictIsSymbol.reflectSymbol(Type$dProxy.Proxy))(rec)));
      const $9 = dictWriteForeignFields.writeImplFields(Type$dProxy.Proxy)(rec);
      return x => $8($9(x));
    }
  }
);
const writeImpl2 = /* #__PURE__ */ (() => {
  const $0 = writeForeignFieldsCons(typeIsSymbol)(writeForeignString)(writeForeignFieldsCons(valueIsSymbol)(writeForeignForeign)(writeForeignFieldsNilRowR)()()())()()();
  return rec => $0.writeImplFields(Type$dProxy.Proxy)(rec)({});
})();
const writeForeignEither = dictWriteForeign => dictWriteForeign1 => (
  {
    writeImpl: value => {
      if (value.tag === "Left") { return writeImpl2({type: "left", value: dictWriteForeign.writeImpl(value._1)}); }
      if (value.tag === "Right") { return writeImpl2({type: "right", value: dictWriteForeign1.writeImpl(value._1)}); }
      $runtime.fail();
    }
  }
);
const writeForeignJSDate = {writeImpl: x => Effect$dUnsafe.unsafePerformEffect(Data$dJSDate.dateMethodEff("toISOString", x))};
const writeForeignDateTime = {writeImpl: x => Effect$dUnsafe.unsafePerformEffect(Data$dJSDate.dateMethodEff("toISOString", Data$dJSDate.fromDateTime(x)))};
const writeForeignMap = () => dictWriteForeign => ({writeImpl: x => dictWriteForeign.writeImpl(x)});
const writeForeignNullable = dictWriteForeign => (
  {
    writeImpl: x => {
      const $2 = Data$dNullable.nullable(x, Data$dMaybe.Nothing, Data$dMaybe.Just);
      if ($2.tag === "Nothing") { return Data$dNullable.null; }
      if ($2.tag === "Just") { return dictWriteForeign.writeImpl($2._1); }
      $runtime.fail();
    }
  }
);
const writeForeignObject = dictWriteForeign => ({writeImpl: x => Foreign$dObject._mapWithKey(x, v => dictWriteForeign.writeImpl)});
const writeForeignMapInt = dictWriteForeign => (
  {
    writeImpl: (() => {
      const $1 = Data$dMap$dInternal.foldableWithIndexMap.foldrWithIndex(x => Foreign$dObject.insert(Data$dShow.showIntImpl(x)))(Foreign$dObject.empty);
      return x => Foreign$dObject._mapWithKey($1(x), v => dictWriteForeign.writeImpl);
    })()
  }
);
const writeForeignMapString = dictWriteForeign => (
  {
    writeImpl: x => Foreign$dObject._mapWithKey(
      Data$dMap$dInternal.foldableWithIndexMap.foldrWithIndex(Foreign$dObject.insert)(Foreign$dObject.empty)(x),
      v => dictWriteForeign.writeImpl
    )
  }
);
const writeForeignTuple = dictWriteForeign => dictWriteForeign1 => (
  {writeImpl: v => Data$dFunctor.arrayMap(writeForeignForeign.writeImpl)([dictWriteForeign.writeImpl(v._1), dictWriteForeign1.writeImpl(v._2)])}
);
const writeForeignVariantCons = dictIsSymbol => dictWriteForeign => () => dictWriteForeignVariant => (
  {
    writeVariantImpl: v => variant => {
      const name = dictIsSymbol.reflectSymbol(Type$dProxy.Proxy);
      const $7 = dictWriteForeignVariant.writeVariantImpl(Type$dProxy.Proxy);
      if (variant.type === dictIsSymbol.reflectSymbol(Type$dProxy.Proxy)) {
        return Foreign$dObject._mapWithKey(
          Foreign$dObject.runST(Control$dMonad$dST$dInternal.bind_(Foreign$dObject$dST.new)(Foreign$dObject$dST.poke(name)(dictWriteForeign.writeImpl(variant.value)))),
          v$1 => writeForeignForeign.writeImpl
        );
      }
      return $7(variant);
    }
  }
);
const writeForeignNEArray = dictWriteForeign => ({writeImpl: a => Data$dFunctor.arrayMap(dictWriteForeign.writeImpl)(a)});
const write = dictWriteForeign => dictWriteForeign.writeImpl;
const unsafeStringify = _unsafeStringify;
const unsafeStringToInt = /* #__PURE__ */ (() => {
  const $0 = Data$dMaybe.fromMaybe$p(v => Partial._crashWith("impossible"));
  return x => $0(Data$dInt.fromString(x));
})();
const $$undefined = _undefined;
const writeForeignMaybe = dictWriteForeign => (
  {
    writeImpl: v2 => {
      if (v2.tag === "Nothing") { return _undefined; }
      if (v2.tag === "Just") { return dictWriteForeign.writeImpl(v2._1); }
      $runtime.fail();
    }
  }
);
const tupleSize = dict => dict.tupleSize;
const sequenceCombining = dictMonoid => {
  const append2 = dictMonoid.Semigroup0().append;
  return dictFoldable => dictApplicative => dictFoldable.foldl(acc => elem => {
    if (acc.tag === "Left") {
      if (elem.tag === "Left") { return Data$dEither.$Either("Left", Data$dList$dTypes.semigroupNonEmptyList.append(acc._1)(elem._1)); }
      if (elem.tag === "Right") { return Data$dEither.$Either("Left", acc._1); }
      $runtime.fail();
    }
    if (acc.tag === "Right") {
      if (elem.tag === "Right") { return Data$dEither.$Either("Right", append2(acc._1)(dictApplicative.pure(elem._1))); }
      if (elem.tag === "Left") { return Data$dEither.$Either("Left", elem._1); }
      $runtime.fail();
    }
    $runtime.fail();
  })(Data$dEither.$Either("Right", dictMonoid.mempty));
};
const sequenceCombining1 = /* #__PURE__ */ sequenceCombining(Data$dMonoid.monoidArray)(Data$dFoldable.foldableArray)(Control$dApplicative.applicativeArray);
const readVariantImpl = dict => dict.readVariantImpl;
const readForeignVariant = () => dictReadForeignVariant => ({readImpl: o => dictReadForeignVariant.readVariantImpl(Type$dProxy.Proxy)(o)});
const readTupleImpl = dict => dict.readTupleImpl;
const readForeignTuple = dictReadTuple => ({readImpl: dictReadTuple.readTupleImpl(0)});
const readImpl = dict => dict.readImpl;
const readForeignJSDate = {
  readImpl: x => {
    const $1 = readString(x);
    if ($1.tag === "Left") { return Data$dEither.$Either("Left", $1._1); }
    if ($1.tag === "Right") { return Data$dEither.$Either("Right", Effect$dUnsafe.unsafePerformEffect(Data$dJSDate.parse($1._1))); }
    $runtime.fail();
  }
};
const readForeignDateTime = {
  readImpl: a => bindExceptT.bind(readForeignJSDate.readImpl(a))(x => {
    const $2 = Data$dJSDate.toInstant(x);
    if ($2.tag === "Just") { return Data$dEither.$Either("Right", Data$dDateTime$dInstant.toDateTime($2._1)); }
    return Data$dEither.$Either("Left", Data$dNonEmpty.$NonEmpty(Foreign.$ForeignError("ForeignError", "Invalid date time"), Data$dList$dTypes.Nil));
  })
};
const readForeignMap = () => dictReadForeign => (
  {
    readImpl: x => {
      const $3 = dictReadForeign.readImpl(x);
      if ($3.tag === "Left") { return Data$dEither.$Either("Left", $3._1); }
      if ($3.tag === "Right") { return Data$dEither.$Either("Right", $3._1); }
      $runtime.fail();
    }
  }
);
const readForeignMaybe = dictReadForeign => (
  {
    readImpl: v1 => {
      if (Foreign.isNull(v1) || Foreign.isUndefined(v1)) { return applicativeExceptT.pure(Data$dMaybe.Nothing); }
      const $2 = dictReadForeign.readImpl(v1);
      if ($2.tag === "Left") { return Data$dEither.$Either("Left", $2._1); }
      if ($2.tag === "Right") { return Data$dEither.$Either("Right", Data$dMaybe.$Maybe("Just", $2._1)); }
      $runtime.fail();
    }
  }
);
const readForeignNullable = dictReadForeign => (
  {
    readImpl: o => Control$dMonad$dExcept$dTrans.withExceptT(Data$dIdentity.functorIdentity)(Data$dList$dTypes.functorNonEmptyList.map(error => {
      if (error.tag === "TypeMismatch") { return Foreign.$ForeignError("TypeMismatch", "Nullable " + error._1, error._2); }
      return error;
    }))(bindExceptT.bind(readNull(o))((() => {
      const $2 = traverse(dictReadForeign.readImpl);
      return x => {
        const $4 = $2(x);
        if ($4.tag === "Left") { return Data$dEither.$Either("Left", $4._1); }
        if ($4.tag === "Right") {
          return Data$dEither.$Either(
            "Right",
            (() => {
              if ($4._1.tag === "Nothing") { return Data$dNullable.null; }
              if ($4._1.tag === "Just") { return Data$dNullable.notNull($4._1._1); }
              $runtime.fail();
            })()
          );
        }
        $runtime.fail();
      };
    })()))
  }
);
const readForeignObject = dictReadForeign => (
  {
    readImpl: (() => {
      const $1 = Data$dFoldable.foldlArray(acc => v => {
        if (acc.tag === "Left") {
          if (v._2.tag === "Left") { return Data$dEither.$Either("Left", Data$dList$dTypes.semigroupNonEmptyList.append(acc._1)(v._2._1)); }
          if (v._2.tag === "Right") { return Data$dEither.$Either("Left", acc._1); }
          $runtime.fail();
        }
        if (acc.tag === "Right") {
          if (v._2.tag === "Right") { return Data$dEither.$Either("Right", Foreign$dObject.mutate(Foreign$dObject$dST.poke(v._1)(v._2._1))(acc._1)); }
          if (v._2.tag === "Left") { return Data$dEither.$Either("Left", v._2._1); }
          $runtime.fail();
        }
        $runtime.fail();
      })(Data$dEither.$Either("Right", Foreign$dObject.empty));
      const $2 = Foreign$dObject.mapWithKey(key => value => Data$dBifunctor.bifunctorEither.bimap(Data$dList$dTypes.functorNonEmptyList.map(Foreign.ErrorAtProperty(key)))(Data$dBifunctor.identity)(dictReadForeign.readImpl(value)));
      return a => bindExceptT.bind((() => {
        if (Foreign.tagOf(a) === "Object") { return applicativeExceptT.pure(a); }
        return fail(Foreign.$ForeignError("TypeMismatch", "Object", Foreign.tagOf(a)));
      })())(x => $1(toUnfoldable($2(x))));
    })()
  }
);
const readForeignMapInt = dictReadForeign => (
  {
    readImpl: (() => {
      const $1 = readForeignObject(dictReadForeign).readImpl;
      const $2 = functorExceptT.map(Foreign$dObject.foldableWithIndexObject.foldrWithIndex(x => Data$dMap$dInternal.insert(Data$dOrd.ordInt)(unsafeStringToInt(x)))(Data$dMap$dInternal.Leaf));
      return x => $2($1(x));
    })()
  }
);
const readForeignMapString = dictReadForeign => (
  {
    readImpl: (() => {
      const $1 = readForeignObject(dictReadForeign).readImpl;
      return x => {
        const $3 = $1(x);
        if ($3.tag === "Left") { return Data$dEither.$Either("Left", $3._1); }
        if ($3.tag === "Right") {
          return Data$dEither.$Either(
            "Right",
            Foreign$dObject.foldableWithIndexObject.foldrWithIndex(Data$dMap$dInternal.insert(Data$dOrd.ordString))(Data$dMap$dInternal.Leaf)($3._1)
          );
        }
        $runtime.fail();
      };
    })()
  }
);
const readForeignVariantCons = dictIsSymbol => dictReadForeign => () => dictReadForeignVariant => (
  {
    readVariantImpl: v => o => alt(dictReadForeignVariant.readVariantImpl(Type$dProxy.Proxy)(o))((() => {
      const $6 = bindExceptT.bind(readProp(dictIsSymbol.reflectSymbol(Type$dProxy.Proxy))(o))(dictReadForeign.readImpl);
      if ($6.tag === "Left") { return Data$dEither.$Either("Left", $6._1); }
      if ($6.tag === "Right") { return Data$dEither.$Either("Right", {type: dictIsSymbol.reflectSymbol(Type$dProxy.Proxy), value: $6._1}); }
      $runtime.fail();
    })())
  }
);
const readBigInt1 = /* #__PURE__ */ Foreign.unsafeReadTagged(Data$dIdentity.monadIdentity)("BigInt");
const readForeignBigInt = {
  readImpl: fValue => alt((() => {
    const $1 = readInt(fValue);
    if ($1.tag === "Left") { return Data$dEither.$Either("Left", $1._1); }
    if ($1.tag === "Right") { return Data$dEither.$Either("Right", Js$dBigInt$dBigInt.fromInt($1._1)); }
    $runtime.fail();
  })())(alt(bindExceptT.bind(readNumber(fValue))(num => {
    if (Data$dNumber.round(num) === num) {
      const $2 = Data$dNonEmpty.$NonEmpty(Foreign.$ForeignError("ForeignError", "Cannot convert Number " + (Data$dShow.showNumberImpl(num) + " to BigInt")), Data$dList$dTypes.Nil);
      const $3 = Js$dBigInt$dBigInt.fromNumber(num);
      if ($3.tag === "Nothing") { return Data$dEither.$Either("Left", $2); }
      if ($3.tag === "Just") { return Data$dEither.$Either("Right", $3._1); }
      $runtime.fail();
    }
    return Data$dEither.$Either(
      "Left",
      Data$dNonEmpty.$NonEmpty(Foreign.$ForeignError("ForeignError", "Cannot convert decimal Number " + (Data$dShow.showNumberImpl(num) + " to BigInt")), Data$dList$dTypes.Nil)
    );
  }))(alt(readBigInt1(fValue))(bindExceptT.bind(readString(fValue))(bi => {
    const $2 = Data$dNonEmpty.$NonEmpty(Foreign.$ForeignError("ForeignError", "Cannot convert String " + (bi + " to BigInt")), Data$dList$dTypes.Nil);
    const $3 = Js$dBigInt$dBigInt.fromString(bi);
    if ($3.tag === "Nothing") { return Data$dEither.$Either("Left", $2); }
    if ($3.tag === "Just") { return Data$dEither.$Either("Right", $3._1); }
    $runtime.fail();
  }))))
};
const readAtIdx = dictReadForeign => i => f => Control$dMonad$dExcept$dTrans.withExceptT(Data$dIdentity.functorIdentity)(Data$dList$dTypes.functorNonEmptyList.map(Foreign.ErrorAtIndex(i)))(dictReadForeign.readImpl(f));
const readForeignArray = dictReadForeign => (
  {
    readImpl: (() => {
      const $1 = Data$dFunctorWithIndex.mapWithIndexArray(readAtIdx(dictReadForeign));
      return a => bindExceptT.bind(readArray(a))(x => sequenceCombining1($1(x)));
    })()
  }
);
const readForeignArray1 = /* #__PURE__ */ readForeignArray(readForeignForeign);
const readTupleHelper = dictReadForeign => dictReadForeign1 => (
  {
    readTupleImpl: n => a => bindExceptT.bind(readForeignArray1.readImpl(a))(v => {
      if (v.length === 2) {
        const $5 = Control$dMonad$dExcept$dTrans.applyExceptT(Data$dIdentity.monadIdentity);
        return $5.apply($5.Functor0().map(Data$dTuple.Tuple)(readAtIdx(dictReadForeign)(n)(v[0])))(readAtIdx(dictReadForeign1)(n + 1 | 0)(v[1]));
      }
      return throwError(Data$dNonEmpty.$NonEmpty(
        Foreign.$ForeignError("TypeMismatch", "array of length " + Data$dShow.showIntImpl(n + 2 | 0), "array of length " + Data$dShow.showIntImpl(n + v.length | 0)),
        Data$dList$dTypes.Nil
      ));
    }),
    tupleSize: v => 2
  }
);
const readForeignNonEmptyArray = dictReadForeign => {
  const readImpl3 = readForeignArray(dictReadForeign).readImpl;
  return {
    readImpl: f => bindExceptT.bind(readImpl3(f))(v => {
      if (v.length > 0) { return Data$dEither.$Either("Right", v); }
      return Data$dEither.$Either("Left", Data$dNonEmpty.$NonEmpty(Foreign.$ForeignError("ForeignError", "Nonempty array expected, got empty array"), Data$dList$dTypes.Nil));
    })
  };
};
const readTupleTupleTuple = dictReadForeign => dictReadTuple => (
  {
    readTupleImpl: n => a => bindExceptT.bind(readForeignArray1.readImpl(a))(v => {
      const v1 = Data$dArray.uncons(v);
      if (v1.tag === "Just") {
        const $6 = Control$dMonad$dExcept$dTrans.applyExceptT(Data$dIdentity.monadIdentity);
        return $6.apply($6.Functor0().map(Data$dTuple.Tuple)(readAtIdx(dictReadForeign)(n)(v1._1.head)))(dictReadTuple.readTupleImpl(n + 1 | 0)(Data$dFunctor.arrayMap(writeForeignForeign.writeImpl)(v1._1.tail)));
      }
      return throwError(Data$dNonEmpty.$NonEmpty(
        Foreign.$ForeignError(
          "TypeMismatch",
          "array of length " + Data$dShow.showIntImpl((1 + n | 0) + dictReadTuple.tupleSize(Type$dProxy.Proxy) | 0),
          "array of length " + Data$dShow.showIntImpl(n)
        ),
        Data$dList$dTypes.Nil
      ));
    }),
    tupleSize: v => 1 + dictReadTuple.tupleSize(Type$dProxy.Proxy) | 0
  }
);
const read$p = dictReadForeign => dictReadForeign.readImpl;
const read = dictReadForeign => x => dictReadForeign.readImpl(x);
const read_ = dictReadForeign => x => {
  const $2 = dictReadForeign.readImpl(x);
  if ($2.tag === "Left") { return Data$dMaybe.Nothing; }
  if ($2.tag === "Right") { return Data$dMaybe.$Maybe("Just", $2._1); }
  $runtime.fail();
};
const writeForeignTupleTuple = dictWriteForeign => dictWriteForeign1 => (
  {
    writeImpl: v => Data$dFunctor.arrayMap(writeForeignForeign.writeImpl)(Data$dSemigroup.concatArray([dictWriteForeign.writeImpl(v._1)])((() => {
      const $3 = read_(readForeignArray1)(dictWriteForeign1.writeImpl(v._2));
      if ($3.tag === "Nothing") { return []; }
      if ($3.tag === "Just") { return $3._1; }
      $runtime.fail();
    })()))
  }
);
const parseJSON = /* #__PURE__ */ (() => {
  const $0 = Data$dBifunctor.bifunctorEither.bimap(x => Data$dNonEmpty.$NonEmpty(Foreign.$ForeignError("ForeignError", Effect$dException.message(x)), Data$dList$dTypes.Nil))(Data$dBifunctor.identity);
  const $1 = Effect$dUncurried.runEffectFn1(_parseJSON);
  return x => $0(Effect$dUnsafe.unsafePerformEffect((() => {
    const $3 = $1(x);
    return Effect$dException.catchException(x$1 => () => Data$dEither.$Either("Left", x$1))(() => {
      const a$p = $3();
      return Data$dEither.$Either("Right", a$p);
    });
  })()));
})();
const readJSON = dictReadForeign => x => bindExceptT.bind(parseJSON(x))(dictReadForeign.readImpl);
const readJSON_ = dictReadForeign => x => {
  const $2 = bindExceptT.bind(parseJSON(x))(dictReadForeign.readImpl);
  if ($2.tag === "Left") { return Data$dMaybe.Nothing; }
  if ($2.tag === "Right") { return Data$dMaybe.$Maybe("Just", $2._1); }
  $runtime.fail();
};
const readJSON$p = dictReadForeign => a => bindExceptT.bind(parseJSON(a))(dictReadForeign.readImpl);
const getFields = dict => dict.getFields;
const readForeignFieldsCons = dictIsSymbol => dictReadForeign => dictReadForeignFields => () => () => (
  {
    getFields: v => obj => {
      const name = dictIsSymbol.reflectSymbol(Type$dProxy.Proxy);
      const v1 = dictReadForeignFields.getFields(Type$dProxy.Proxy)(obj);
      const $9 = Control$dMonad$dExcept$dTrans.withExceptT(Data$dIdentity.functorIdentity)(Data$dList$dTypes.functorNonEmptyList.map(Foreign.ErrorAtProperty(name)))(bindExceptT.bind(readProp(name)(obj))(dictReadForeign.readImpl));
      if ($9.tag === "Left") {
        if (v1.tag === "Left") { return Data$dEither.$Either("Left", Data$dList$dTypes.semigroupNonEmptyList.append($9._1)(v1._1)); }
        if (v1.tag === "Right") { return Data$dEither.$Either("Left", $9._1); }
        $runtime.fail();
      }
      if ($9.tag === "Right") {
        if (v1.tag === "Right") { return Data$dEither.$Either("Right", x => Record$dBuilder.unsafeInsert(dictIsSymbol.reflectSymbol(Type$dProxy.Proxy))($9._1)(v1._1(x))); }
        if (v1.tag === "Left") { return Data$dEither.$Either("Left", v1._1); }
        $runtime.fail();
      }
      $runtime.fail();
    }
  }
);
const readForeignRecord = () => dictReadForeignFields => (
  {
    readImpl: o => {
      const $3 = dictReadForeignFields.getFields(Type$dProxy.Proxy)(o);
      if ($3.tag === "Left") { return Data$dEither.$Either("Left", $3._1); }
      if ($3.tag === "Right") { return Data$dEither.$Either("Right", $3._1({})); }
      $runtime.fail();
    }
  }
);
const readImpl2 = /* #__PURE__ */ (() => readForeignRecord()(readForeignFieldsCons(typeIsSymbol)(readForeignString)(readForeignFieldsCons(valueIsSymbol)(readForeignForeign)(readForeignFieldsNilRowRo)()())()()).readImpl)();
const readForeignEither = dictReadForeign => dictReadForeign1 => (
  {
    readImpl: f => bindExceptT.bind(readImpl2(f))(v => {
      if (v.type === "left") {
        const $4 = dictReadForeign.readImpl(v.value);
        if ($4.tag === "Left") { return Data$dEither.$Either("Left", $4._1); }
        if ($4.tag === "Right") { return Data$dEither.$Either("Right", Data$dEither.$Either("Left", $4._1)); }
        $runtime.fail();
      }
      if (v.type === "right") {
        const $4 = dictReadForeign1.readImpl(v.value);
        if ($4.tag === "Left") { return Data$dEither.$Either("Left", $4._1); }
        if ($4.tag === "Right") { return Data$dEither.$Either("Right", Data$dEither.$Either("Right", $4._1)); }
        $runtime.fail();
      }
      return Data$dEither.$Either("Left", Data$dNonEmpty.$NonEmpty(Foreign.$ForeignError("ForeignError", "Invalid Either tag " + v.type), Data$dList$dTypes.Nil));
    })
  }
);
export {
  alt,
  applicativeExceptT,
  bindExceptT,
  fail,
  functorExceptT,
  getFields,
  identity,
  parseJSON,
  read,
  read$p,
  readArray,
  readAtIdx,
  readBigInt1,
  readForeignArray,
  readForeignArray1,
  readForeignBigInt,
  readForeignBoolean,
  readForeignChar,
  readForeignDateTime,
  readForeignEither,
  readForeignFieldsCons,
  readForeignFieldsNilRowRo,
  readForeignForeign,
  readForeignInt,
  readForeignJSDate,
  readForeignMap,
  readForeignMapInt,
  readForeignMapString,
  readForeignMaybe,
  readForeignNonEmptyArray,
  readForeignNullable,
  readForeignNumber,
  readForeignObject,
  readForeignRecord,
  readForeignString,
  readForeignTuple,
  readForeignVariant,
  readForeignVariantCons,
  readForeignVariantNil,
  readImpl,
  readImpl2,
  readInt,
  readJSON,
  readJSON$p,
  readJSON_,
  readNull,
  readNumber,
  readProp,
  readString,
  readTupleHelper,
  readTupleImpl,
  readTupleTupleTuple,
  readVariantImpl,
  read_,
  sequenceCombining,
  sequenceCombining1,
  throwError,
  toUnfoldable,
  traverse,
  tupleSize,
  typeIsSymbol,
  $$undefined as undefined,
  unsafeStringToInt,
  unsafeStringify,
  valueIsSymbol,
  write,
  writeForeignArray,
  writeForeignBigInt,
  writeForeignBoolean,
  writeForeignChar,
  writeForeignDateTime,
  writeForeignEither,
  writeForeignFieldsCons,
  writeForeignFieldsNilRowR,
  writeForeignForeign,
  writeForeignInt,
  writeForeignJSDate,
  writeForeignMap,
  writeForeignMapInt,
  writeForeignMapString,
  writeForeignMaybe,
  writeForeignNEArray,
  writeForeignNullable,
  writeForeignNumber,
  writeForeignObject,
  writeForeignRecord,
  writeForeignString,
  writeForeignTuple,
  writeForeignTupleTuple,
  writeForeignVariant,
  writeForeignVariantCons,
  writeForeignVariantNilRow,
  writeImpl,
  writeImpl2,
  writeImplFields,
  writeJSON,
  writeVariantImpl
};
export * from "./foreign.js";
