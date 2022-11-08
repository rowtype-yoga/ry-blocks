import * as $runtime from "../runtime.js";
import * as Data$dFunctor from "../Data.Functor/index.js";
import * as Data$dIdentity from "../Data.Identity/index.js";
import * as Data$dTuple from "../Data.Tuple/index.js";
import * as Data$dUnit from "../Data.Unit/index.js";
import * as Unsafe$dCoerce from "../Unsafe.Coerce/index.js";
const identity = x => x;
const distributiveIdentity = {
  distribute: dictFunctor => dictFunctor.map(Unsafe$dCoerce.unsafeCoerce),
  collect: dictFunctor => f => dictFunctor.map(x => f(x)),
  Functor0: () => Data$dIdentity.functorIdentity
};
const distribute = dict => dict.distribute;
const distributiveFunction = {
  distribute: dictFunctor => a => e => dictFunctor.map(v => v(e))(a),
  collect: dictFunctor => f => {
    const $2 = distributiveFunction.distribute(dictFunctor);
    const $3 = dictFunctor.map(f);
    return x => $2($3(x));
  },
  Functor0: () => Data$dFunctor.functorFn
};
const cotraverse = dictDistributive => {
  const map = dictDistributive.Functor0().map;
  return dictFunctor => {
    const distribute2 = dictDistributive.distribute(dictFunctor);
    return f => {
      const $5 = map(f);
      return x => $5(distribute2(x));
    };
  };
};
const collectDefault = dictDistributive => dictFunctor => {
  const distribute2 = dictDistributive.distribute(dictFunctor);
  return f => {
    const $4 = dictFunctor.map(f);
    return x => distribute2($4(x));
  };
};
const distributiveTuple = dictTypeEquals => {
  const from = dictTypeEquals.proof(a => a);
  return {
    collect: dictFunctor => {
      const distribute2 = distributiveTuple(dictTypeEquals).distribute(dictFunctor);
      return f => {
        const $5 = dictFunctor.map(f);
        return x => distribute2($5(x));
      };
    },
    distribute: dictFunctor => {
      const $3 = Data$dTuple.Tuple(from(Data$dUnit.unit));
      const $4 = dictFunctor.map(Data$dTuple.snd);
      return x => $3($4(x));
    },
    Functor0: () => Data$dTuple.functorTuple
  };
};
const collect = dict => dict.collect;
const distributeDefault = dictDistributive => dictFunctor => dictDistributive.collect(dictFunctor)(identity);
export {collect, collectDefault, cotraverse, distribute, distributeDefault, distributiveFunction, distributiveIdentity, distributiveTuple, identity};
