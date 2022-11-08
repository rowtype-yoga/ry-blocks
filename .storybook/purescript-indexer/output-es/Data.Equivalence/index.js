import * as $runtime from "../runtime.js";
const Equivalence = x => x;
const semigroupEquivalence = {append: v => v1 => a => b => v(a)(b) && v1(a)(b)};
const newtypeEquivalence = {Coercible0: () => undefined};
const monoidEquivalence = {mempty: v => v1 => true, Semigroup0: () => semigroupEquivalence};
const defaultEquivalence = dictEq => dictEq.eq;
const contravariantEquivalence = {cmap: f => v => x => y => v(f(x))(f(y))};
const comparisonEquivalence = v => a => b => v(a)(b).tag === "EQ";
export {Equivalence, comparisonEquivalence, contravariantEquivalence, defaultEquivalence, monoidEquivalence, newtypeEquivalence, semigroupEquivalence};
