import * as $runtime from "../runtime.js";
import * as Data$dGeneric$dRep from "../Data.Generic.Rep/index.js";
const genericMonoidNoArguments = {"genericMempty'": Data$dGeneric$dRep.NoArguments};
const genericMonoidArgument = dictMonoid => ({"genericMempty'": dictMonoid.mempty});
const genericMempty$p = dict => dict["genericMempty'"];
const genericMonoidConstructor = dictGenericMonoid => ({"genericMempty'": dictGenericMonoid["genericMempty'"]});
const genericMonoidProduct = dictGenericMonoid => dictGenericMonoid1 => (
  {"genericMempty'": Data$dGeneric$dRep.$Product(dictGenericMonoid["genericMempty'"], dictGenericMonoid1["genericMempty'"])}
);
const genericMempty = dictGeneric => dictGenericMonoid => dictGeneric.to(dictGenericMonoid["genericMempty'"]);
export {genericMempty, genericMempty$p, genericMonoidArgument, genericMonoidConstructor, genericMonoidNoArguments, genericMonoidProduct};
