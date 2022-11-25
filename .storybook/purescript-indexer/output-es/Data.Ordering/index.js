import * as $runtime from "../runtime.js";
const $Ordering = tag => ({tag});
const LT = /* #__PURE__ */ $Ordering("LT");
const GT = /* #__PURE__ */ $Ordering("GT");
const EQ = /* #__PURE__ */ $Ordering("EQ");
const showOrdering = {
  show: v => {
    if (v.tag === "LT") { return "LT"; }
    if (v.tag === "GT") { return "GT"; }
    if (v.tag === "EQ") { return "EQ"; }
    $runtime.fail();
  }
};
const semigroupOrdering = {
  append: v => v1 => {
    if (v.tag === "LT") { return LT; }
    if (v.tag === "GT") { return GT; }
    if (v.tag === "EQ") { return v1; }
    $runtime.fail();
  }
};
const invert = v => {
  if (v.tag === "GT") { return LT; }
  if (v.tag === "EQ") { return EQ; }
  if (v.tag === "LT") { return GT; }
  $runtime.fail();
};
const eqOrdering = {
  eq: v => v1 => {
    if (v.tag === "LT") { return v1.tag === "LT"; }
    if (v.tag === "GT") { return v1.tag === "GT"; }
    if (v.tag === "EQ") { return v1.tag === "EQ"; }
    return false;
  }
};
export {$Ordering, EQ, GT, LT, eqOrdering, invert, semigroupOrdering, showOrdering};
