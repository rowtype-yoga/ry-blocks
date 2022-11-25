import * as $runtime from "../runtime.js";
import * as Data$dEuclideanRing from "../Data.EuclideanRing/index.js";
import * as Data$dGeneric$dRep from "../Data.Generic.Rep/index.js";
import * as Data$dMaybe from "../Data.Maybe/index.js";
const genericToEnum$p = dict => dict["genericToEnum'"];
const genericToEnum = dictGeneric => dictGenericBoundedEnum => x => {
  const $3 = dictGenericBoundedEnum["genericToEnum'"](x);
  if ($3.tag === "Just") { return Data$dMaybe.$Maybe("Just", dictGeneric.to($3._1)); }
  return Data$dMaybe.Nothing;
};
const genericSucc$p = dict => dict["genericSucc'"];
const genericSucc = dictGeneric => dictGenericEnum => x => {
  const $3 = dictGenericEnum["genericSucc'"](dictGeneric.from(x));
  if ($3.tag === "Just") { return Data$dMaybe.$Maybe("Just", dictGeneric.to($3._1)); }
  return Data$dMaybe.Nothing;
};
const genericPred$p = dict => dict["genericPred'"];
const genericPred = dictGeneric => dictGenericEnum => x => {
  const $3 = dictGenericEnum["genericPred'"](dictGeneric.from(x));
  if ($3.tag === "Just") { return Data$dMaybe.$Maybe("Just", dictGeneric.to($3._1)); }
  return Data$dMaybe.Nothing;
};
const genericFromEnum$p = dict => dict["genericFromEnum'"];
const genericFromEnum = dictGeneric => dictGenericBoundedEnum => x => dictGenericBoundedEnum["genericFromEnum'"](dictGeneric.from(x));
const genericEnumSum = dictGenericEnum => dictGenericTop => dictGenericEnum1 => dictGenericBottom => (
  {
    "genericPred'": v => {
      if (v.tag === "Inl") {
        const $5 = dictGenericEnum["genericPred'"](v._1);
        if ($5.tag === "Just") { return Data$dMaybe.$Maybe("Just", Data$dGeneric$dRep.$Sum("Inl", $5._1)); }
        return Data$dMaybe.Nothing;
      }
      if (v.tag === "Inr") {
        const v1 = dictGenericEnum1["genericPred'"](v._1);
        if (v1.tag === "Nothing") { return Data$dMaybe.$Maybe("Just", Data$dGeneric$dRep.$Sum("Inl", dictGenericTop["genericTop'"])); }
        if (v1.tag === "Just") { return Data$dMaybe.$Maybe("Just", Data$dGeneric$dRep.$Sum("Inr", v1._1)); }
        $runtime.fail();
      }
      $runtime.fail();
    },
    "genericSucc'": v => {
      if (v.tag === "Inl") {
        const v1 = dictGenericEnum["genericSucc'"](v._1);
        if (v1.tag === "Nothing") { return Data$dMaybe.$Maybe("Just", Data$dGeneric$dRep.$Sum("Inr", dictGenericBottom["genericBottom'"])); }
        if (v1.tag === "Just") { return Data$dMaybe.$Maybe("Just", Data$dGeneric$dRep.$Sum("Inl", v1._1)); }
        $runtime.fail();
      }
      if (v.tag === "Inr") {
        const $5 = dictGenericEnum1["genericSucc'"](v._1);
        if ($5.tag === "Just") { return Data$dMaybe.$Maybe("Just", Data$dGeneric$dRep.$Sum("Inr", $5._1)); }
        return Data$dMaybe.Nothing;
      }
      $runtime.fail();
    }
  }
);
const genericEnumProduct = dictGenericEnum => dictGenericTop => dictGenericBottom => dictGenericEnum1 => dictGenericTop1 => dictGenericBottom1 => (
  {
    "genericPred'": v => {
      const v1 = dictGenericEnum1["genericPred'"](v._2);
      if (v1.tag === "Just") { return Data$dMaybe.$Maybe("Just", Data$dGeneric$dRep.$Product(v._1, v1._1)); }
      if (v1.tag === "Nothing") {
        const $8 = dictGenericEnum["genericPred'"](v._1);
        if ($8.tag === "Just") { return Data$dMaybe.$Maybe("Just", Data$dGeneric$dRep.$Product($8._1, dictGenericTop1["genericTop'"])); }
        return Data$dMaybe.Nothing;
      }
      $runtime.fail();
    },
    "genericSucc'": v => {
      const v1 = dictGenericEnum1["genericSucc'"](v._2);
      if (v1.tag === "Just") { return Data$dMaybe.$Maybe("Just", Data$dGeneric$dRep.$Product(v._1, v1._1)); }
      if (v1.tag === "Nothing") {
        const $8 = dictGenericEnum["genericSucc'"](v._1);
        if ($8.tag === "Just") { return Data$dMaybe.$Maybe("Just", Data$dGeneric$dRep.$Product($8._1, dictGenericBottom1["genericBottom'"])); }
        return Data$dMaybe.Nothing;
      }
      $runtime.fail();
    }
  }
);
const genericEnumNoArguments = {"genericPred'": v => Data$dMaybe.Nothing, "genericSucc'": v => Data$dMaybe.Nothing};
const genericEnumConstructor = dictGenericEnum => (
  {
    "genericPred'": v => {
      const $2 = dictGenericEnum["genericPred'"](v);
      if ($2.tag === "Just") { return Data$dMaybe.$Maybe("Just", $2._1); }
      return Data$dMaybe.Nothing;
    },
    "genericSucc'": v => {
      const $2 = dictGenericEnum["genericSucc'"](v);
      if ($2.tag === "Just") { return Data$dMaybe.$Maybe("Just", $2._1); }
      return Data$dMaybe.Nothing;
    }
  }
);
const genericEnumArgument = dictEnum => (
  {
    "genericPred'": v => {
      const $2 = dictEnum.pred(v);
      if ($2.tag === "Just") { return Data$dMaybe.$Maybe("Just", $2._1); }
      return Data$dMaybe.Nothing;
    },
    "genericSucc'": v => {
      const $2 = dictEnum.succ(v);
      if ($2.tag === "Just") { return Data$dMaybe.$Maybe("Just", $2._1); }
      return Data$dMaybe.Nothing;
    }
  }
);
const genericCardinality$p = dict => dict["genericCardinality'"];
const genericCardinality = dictGeneric => dictGenericBoundedEnum => dictGenericBoundedEnum["genericCardinality'"];
const genericBoundedEnumSum = dictGenericBoundedEnum => dictGenericBoundedEnum1 => (
  {
    "genericCardinality'": dictGenericBoundedEnum["genericCardinality'"] + dictGenericBoundedEnum1["genericCardinality'"] | 0,
    "genericToEnum'": n => {
      if (n >= 0 && n < dictGenericBoundedEnum["genericCardinality'"]) {
        const $3 = dictGenericBoundedEnum["genericToEnum'"](n);
        if ($3.tag === "Just") { return Data$dMaybe.$Maybe("Just", Data$dGeneric$dRep.$Sum("Inl", $3._1)); }
        return Data$dMaybe.Nothing;
      }
      const $3 = dictGenericBoundedEnum1["genericToEnum'"](n - dictGenericBoundedEnum["genericCardinality'"] | 0);
      if ($3.tag === "Just") { return Data$dMaybe.$Maybe("Just", Data$dGeneric$dRep.$Sum("Inr", $3._1)); }
      return Data$dMaybe.Nothing;
    },
    "genericFromEnum'": v => {
      if (v.tag === "Inl") { return dictGenericBoundedEnum["genericFromEnum'"](v._1); }
      if (v.tag === "Inr") { return dictGenericBoundedEnum1["genericFromEnum'"](v._1) + dictGenericBoundedEnum["genericCardinality'"] | 0; }
      $runtime.fail();
    }
  }
);
const genericBoundedEnumProduct = dictGenericBoundedEnum => dictGenericBoundedEnum1 => (
  {
    "genericCardinality'": dictGenericBoundedEnum["genericCardinality'"] * dictGenericBoundedEnum1["genericCardinality'"] | 0,
    "genericToEnum'": n => Data$dMaybe.applyMaybe.apply((() => {
      const $3 = dictGenericBoundedEnum["genericToEnum'"](Data$dEuclideanRing.intDiv(n)(dictGenericBoundedEnum1["genericCardinality'"]));
      if ($3.tag === "Just") { return Data$dMaybe.$Maybe("Just", Data$dGeneric$dRep.Product($3._1)); }
      return Data$dMaybe.Nothing;
    })())(dictGenericBoundedEnum1["genericToEnum'"](Data$dEuclideanRing.intMod(n)(dictGenericBoundedEnum1["genericCardinality'"]))),
    "genericFromEnum'": v1 => (dictGenericBoundedEnum["genericFromEnum'"](v1._1) * dictGenericBoundedEnum1["genericCardinality'"] | 0) + dictGenericBoundedEnum1["genericFromEnum'"](v1._2) | 0
  }
);
const genericBoundedEnumNoArguments = {
  "genericCardinality'": 1,
  "genericToEnum'": i => {
    if (i === 0) { return Data$dMaybe.$Maybe("Just", Data$dGeneric$dRep.NoArguments); }
    return Data$dMaybe.Nothing;
  },
  "genericFromEnum'": v => 0
};
const genericBoundedEnumConstructor = dictGenericBoundedEnum => (
  {
    "genericCardinality'": dictGenericBoundedEnum["genericCardinality'"],
    "genericToEnum'": i => {
      const $2 = dictGenericBoundedEnum["genericToEnum'"](i);
      if ($2.tag === "Just") { return Data$dMaybe.$Maybe("Just", $2._1); }
      return Data$dMaybe.Nothing;
    },
    "genericFromEnum'": v => dictGenericBoundedEnum["genericFromEnum'"](v)
  }
);
const genericBoundedEnumArgument = dictBoundedEnum => (
  {
    "genericCardinality'": dictBoundedEnum.cardinality,
    "genericToEnum'": i => {
      const $2 = dictBoundedEnum.toEnum(i);
      if ($2.tag === "Just") { return Data$dMaybe.$Maybe("Just", $2._1); }
      return Data$dMaybe.Nothing;
    },
    "genericFromEnum'": v => dictBoundedEnum.fromEnum(v)
  }
);
export {
  genericBoundedEnumArgument,
  genericBoundedEnumConstructor,
  genericBoundedEnumNoArguments,
  genericBoundedEnumProduct,
  genericBoundedEnumSum,
  genericCardinality,
  genericCardinality$p,
  genericEnumArgument,
  genericEnumConstructor,
  genericEnumNoArguments,
  genericEnumProduct,
  genericEnumSum,
  genericFromEnum,
  genericFromEnum$p,
  genericPred,
  genericPred$p,
  genericSucc,
  genericSucc$p,
  genericToEnum,
  genericToEnum$p
};
