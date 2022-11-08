import * as $runtime from "../runtime.js";
import * as Unsafe$dCoerce from "../Unsafe.Coerce/index.js";
const wrap = () => Unsafe$dCoerce.unsafeCoerce;
const unwrap = () => Unsafe$dCoerce.unsafeCoerce;
const underF2 = () => () => () => () => v => Unsafe$dCoerce.unsafeCoerce;
const underF = () => () => () => () => v => Unsafe$dCoerce.unsafeCoerce;
const under2 = () => () => v => Unsafe$dCoerce.unsafeCoerce;
const under = () => () => v => Unsafe$dCoerce.unsafeCoerce;
const un = () => v => Unsafe$dCoerce.unsafeCoerce;
const traverse = () => () => v => Unsafe$dCoerce.unsafeCoerce;
const overF2 = () => () => () => () => v => Unsafe$dCoerce.unsafeCoerce;
const overF = () => () => () => () => v => Unsafe$dCoerce.unsafeCoerce;
const over2 = () => () => v => Unsafe$dCoerce.unsafeCoerce;
const over = () => () => v => Unsafe$dCoerce.unsafeCoerce;
const newtypeMultiplicative = {Coercible0: () => undefined};
const newtypeLast = {Coercible0: () => undefined};
const newtypeFirst = {Coercible0: () => undefined};
const newtypeEndo = {Coercible0: () => undefined};
const newtypeDual = {Coercible0: () => undefined};
const newtypeDisj = {Coercible0: () => undefined};
const newtypeConj = {Coercible0: () => undefined};
const newtypeAdditive = {Coercible0: () => undefined};
const modify = () => fn => t => fn(t);
const collect = () => () => v => Unsafe$dCoerce.unsafeCoerce;
const alaF = () => () => () => () => v => Unsafe$dCoerce.unsafeCoerce;
const ala = () => () => () => v => f => f(Unsafe$dCoerce.unsafeCoerce);
export {
  ala,
  alaF,
  collect,
  modify,
  newtypeAdditive,
  newtypeConj,
  newtypeDisj,
  newtypeDual,
  newtypeEndo,
  newtypeFirst,
  newtypeLast,
  newtypeMultiplicative,
  over,
  over2,
  overF,
  overF2,
  traverse,
  un,
  under,
  under2,
  underF,
  underF2,
  unwrap,
  wrap
};
