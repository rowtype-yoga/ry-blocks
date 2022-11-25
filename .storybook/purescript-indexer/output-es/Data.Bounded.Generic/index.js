import * as $runtime from "../runtime.js";
import * as Data$dGeneric$dRep from "../Data.Generic.Rep/index.js";
const genericTopNoArguments = {"genericTop'": Data$dGeneric$dRep.NoArguments};
const genericTopArgument = dictBounded => ({"genericTop'": dictBounded.top});
const genericTop$p = dict => dict["genericTop'"];
const genericTopConstructor = dictGenericTop => ({"genericTop'": dictGenericTop["genericTop'"]});
const genericTopProduct = dictGenericTop => dictGenericTop1 => ({"genericTop'": Data$dGeneric$dRep.$Product(dictGenericTop["genericTop'"], dictGenericTop1["genericTop'"])});
const genericTopSum = dictGenericTop => ({"genericTop'": Data$dGeneric$dRep.$Sum("Inr", dictGenericTop["genericTop'"])});
const genericTop = dictGeneric => dictGenericTop => dictGeneric.to(dictGenericTop["genericTop'"]);
const genericBottomNoArguments = {"genericBottom'": Data$dGeneric$dRep.NoArguments};
const genericBottomArgument = dictBounded => ({"genericBottom'": dictBounded.bottom});
const genericBottom$p = dict => dict["genericBottom'"];
const genericBottomConstructor = dictGenericBottom => ({"genericBottom'": dictGenericBottom["genericBottom'"]});
const genericBottomProduct = dictGenericBottom => dictGenericBottom1 => (
  {"genericBottom'": Data$dGeneric$dRep.$Product(dictGenericBottom["genericBottom'"], dictGenericBottom1["genericBottom'"])}
);
const genericBottomSum = dictGenericBottom => ({"genericBottom'": Data$dGeneric$dRep.$Sum("Inl", dictGenericBottom["genericBottom'"])});
const genericBottom = dictGeneric => dictGenericBottom => dictGeneric.to(dictGenericBottom["genericBottom'"]);
export {
  genericBottom,
  genericBottom$p,
  genericBottomArgument,
  genericBottomConstructor,
  genericBottomNoArguments,
  genericBottomProduct,
  genericBottomSum,
  genericTop,
  genericTop$p,
  genericTopArgument,
  genericTopConstructor,
  genericTopNoArguments,
  genericTopProduct,
  genericTopSum
};
