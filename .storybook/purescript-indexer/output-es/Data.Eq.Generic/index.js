import * as $runtime from "../runtime.js";
const genericEqNoConstructors = {"genericEq'": v => v1 => true};
const genericEqNoArguments = {"genericEq'": v => v1 => true};
const genericEqArgument = dictEq => ({"genericEq'": v => v1 => dictEq.eq(v)(v1)});
const genericEq$p = dict => dict["genericEq'"];
const genericEqConstructor = dictGenericEq => ({"genericEq'": v => v1 => dictGenericEq["genericEq'"](v)(v1)});
const genericEqProduct = dictGenericEq => dictGenericEq1 => ({"genericEq'": v => v1 => dictGenericEq["genericEq'"](v._1)(v1._1) && dictGenericEq1["genericEq'"](v._2)(v1._2)});
const genericEqSum = dictGenericEq => dictGenericEq1 => (
  {
    "genericEq'": v => v1 => {
      if (v.tag === "Inl") {
        if (v1.tag === "Inl") { return dictGenericEq["genericEq'"](v._1)(v1._1); }
        return false;
      }
      if (v.tag === "Inr") {
        if (v1.tag === "Inr") { return dictGenericEq1["genericEq'"](v._1)(v1._1); }
        return false;
      }
      return false;
    }
  }
);
const genericEq = dictGeneric => dictGenericEq => x => y => dictGenericEq["genericEq'"](dictGeneric.from(x))(dictGeneric.from(y));
export {genericEq, genericEq$p, genericEqArgument, genericEqConstructor, genericEqNoArguments, genericEqNoConstructors, genericEqProduct, genericEqSum};
