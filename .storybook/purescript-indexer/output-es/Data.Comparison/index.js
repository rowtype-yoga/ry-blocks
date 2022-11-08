import * as $runtime from "../runtime.js";
import * as Data$dOrdering from "../Data.Ordering/index.js";
const append = f => g => x => {
  const $3 = f(x);
  const $4 = g(x);
  return x$1 => {
    const $6 = $3(x$1);
    const $7 = $4(x$1);
    if ($6.tag === "LT") { return Data$dOrdering.LT; }
    if ($6.tag === "GT") { return Data$dOrdering.GT; }
    if ($6.tag === "EQ") { return $7; }
    $runtime.fail();
  };
};
const Comparison = x => x;
const semigroupComparison = {append: v => v1 => append(v)(v1)};
const newtypeComparison = {Coercible0: () => undefined};
const monoidComparison = {mempty: v => v1 => Data$dOrdering.EQ, Semigroup0: () => semigroupComparison};
const defaultComparison = dictOrd => dictOrd.compare;
const contravariantComparison = {cmap: f => v => x => y => v(f(x))(f(y))};
export {Comparison, append, contravariantComparison, defaultComparison, monoidComparison, newtypeComparison, semigroupComparison};
