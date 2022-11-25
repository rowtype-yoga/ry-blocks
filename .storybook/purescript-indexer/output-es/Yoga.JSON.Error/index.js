import * as $runtime from "../runtime.js";
import * as Data$dShow from "../Data.Show/index.js";
const toJSONPath = fe => {
  const go = v => {
    if (v.tag === "ForeignError") { return ""; }
    if (v.tag === "TypeMismatch") { return ""; }
    if (v.tag === "ErrorAtIndex") { return "[" + (Data$dShow.showIntImpl(v._1) + ("]" + go(v._2))); }
    if (v.tag === "ErrorAtProperty") {
      if (v._2.tag === "TypeMismatch") {
        if (v._2._2 === "undefined") { return ""; }
        return "." + (v._1 + go(v._2));
      }
      return "." + (v._1 + go(v._2));
    }
    $runtime.fail();
  };
  return "$" + go(fe);
};
const errorToJSON = err => {
  const path = toJSONPath(err);
  const go = go$a0$copy => {
    let go$a0 = go$a0$copy, go$c = true, go$r;
    while (go$c) {
      const v = go$a0;
      if (v.tag === "ForeignError") {
        go$c = false;
        go$r = {path: path, message: v._1};
        continue;
      }
      if (v.tag === "TypeMismatch") {
        if (v._2 === "Undefined") {
          go$c = false;
          go$r = {path: path, message: "Must provide a value of type '" + (v._1 + "'")};
          continue;
        }
        if (v._2 === "undefined") {
          go$c = false;
          go$r = {path: path, message: "Must provide a value of type '" + (v._1 + "'")};
          continue;
        }
        go$c = false;
        go$r = {path: path, message: "Must provide a value of type '" + (v._1 + ("' instead of '" + (v._2 + "'")))};
        continue;
      }
      if (v.tag === "ErrorAtIndex") {
        go$a0 = v._2;
        continue;
      }
      if (v.tag === "ErrorAtProperty") {
        go$a0 = v._2;
        continue;
      }
      $runtime.fail();
    };
    return go$r;
  };
  return go(err);
};
const renderHumanError = x => {
  const $1 = errorToJSON(x);
  return $1.message + (" at " + $1.path);
};
export {errorToJSON, renderHumanError, toJSONPath};
