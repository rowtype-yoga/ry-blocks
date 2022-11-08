import * as $runtime from "../runtime.js";
import * as Data$dString$dRegex from "../Data.String.Regex/index.js";
import * as Partial from "../Partial/index.js";
const unsafeRegex = s => f => {
  const $2 = Data$dString$dRegex.regex(s)(f);
  if ($2.tag === "Left") { return Partial._crashWith($2._1); }
  if ($2.tag === "Right") { return $2._1; }
  $runtime.fail();
};
export {unsafeRegex};
