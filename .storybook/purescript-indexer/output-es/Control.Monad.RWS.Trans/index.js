// | This module defines the reader-writer-state monad transformer, `RWST`.
import * as $runtime from "../runtime.js";
import * as Control$dMonad$dRec$dClass from "../Control.Monad.Rec.Class/index.js";
import * as Data$dTuple from "../Data.Tuple/index.js";
import * as Data$dUnit from "../Data.Unit/index.js";
const $RWSResult = (_1, _2, _3) => ({tag: "RWSResult", _1, _2, _3});
const RWSResult = value0 => value1 => value2 => $RWSResult(value0, value1, value2);
const RWST = x => x;
const withRWST = f => m => r => s => {
  const $4 = f(r)(s);
  return m($4._1)($4._2);
};
const runRWST = v => v;
const newtypeRWST = {Coercible0: () => undefined};
const monadTransRWST = dictMonoid => (
  {
    lift: dictMonad => {
      const bind = dictMonad.Bind1().bind;
      const pure = dictMonad.Applicative0().pure;
      return m => v => s => bind(m)(a => pure($RWSResult(s, a, dictMonoid.mempty)));
    }
  }
);
const mapRWST = f => v => r => s => f(v(r)(s));
const lazyRWST = {defer: f => r => s => f(Data$dUnit.unit)(r)(s)};
const functorRWST = dictFunctor => ({map: f => v => r => s => dictFunctor.map(v1 => $RWSResult(v1._1, f(v1._2), v1._3))(v(r)(s))});
const execRWST = dictMonad => {
  const bind = dictMonad.Bind1().bind;
  const pure = dictMonad.Applicative0().pure;
  return v => r => s => bind(v(r)(s))(v1 => pure(Data$dTuple.$Tuple(v1._1, v1._3)));
};
const evalRWST = dictMonad => {
  const bind = dictMonad.Bind1().bind;
  const pure = dictMonad.Applicative0().pure;
  return v => r => s => bind(v(r)(s))(v1 => pure(Data$dTuple.$Tuple(v1._2, v1._3)));
};
const applyRWST = dictBind => {
  const Functor0 = dictBind.Apply0().Functor0();
  const functorRWST1 = functorRWST(Functor0);
  return dictMonoid => {
    const append = dictMonoid.Semigroup0().append;
    return {
      apply: v => v1 => r => s => dictBind.bind(v(r)(s))(v2 => Functor0.map(v3 => $RWSResult(v3._1, v2._2(v3._2), append(v2._3)(v3._3)))(v1(r)(v2._1))),
      Functor0: () => functorRWST1
    };
  };
};
const bindRWST = dictBind => {
  const $1 = dictBind.Apply0().Functor0();
  const applyRWST1 = applyRWST(dictBind);
  return dictMonoid => {
    const append = dictMonoid.Semigroup0().append;
    const applyRWST2 = applyRWST1(dictMonoid);
    return {bind: v => f => r => s => dictBind.bind(v(r)(s))(v1 => $1.map(v3 => $RWSResult(v3._1, v3._2, append(v1._3)(v3._3)))(f(v1._2)(r)(v1._1))), Apply0: () => applyRWST2};
  };
};
const semigroupRWST = dictBind => {
  const applyRWST1 = applyRWST(dictBind);
  return dictMonoid => {
    const $3 = applyRWST1(dictMonoid);
    const map = $3.Functor0().map;
    return dictSemigroup => ({append: a => b => $3.apply(map(dictSemigroup.append)(a))(b)});
  };
};
const applicativeRWST = dictMonad => {
  const pure = dictMonad.Applicative0().pure;
  const applyRWST1 = applyRWST(dictMonad.Bind1());
  return dictMonoid => {
    const applyRWST2 = applyRWST1(dictMonoid);
    return {pure: a => v => s => pure($RWSResult(s, a, dictMonoid.mempty)), Apply0: () => applyRWST2};
  };
};
const monadRWST = dictMonad => {
  const applicativeRWST1 = applicativeRWST(dictMonad);
  const bindRWST1 = bindRWST(dictMonad.Bind1());
  return dictMonoid => {
    const applicativeRWST2 = applicativeRWST1(dictMonoid);
    const bindRWST2 = bindRWST1(dictMonoid);
    return {Applicative0: () => applicativeRWST2, Bind1: () => bindRWST2};
  };
};
const monadAskRWST = dictMonad => {
  const pure = dictMonad.Applicative0().pure;
  const monadRWST1 = monadRWST(dictMonad);
  return dictMonoid => {
    const monadRWST2 = monadRWST1(dictMonoid);
    return {ask: r => s => pure($RWSResult(s, r, dictMonoid.mempty)), Monad0: () => monadRWST2};
  };
};
const monadReaderRWST = dictMonad => {
  const monadAskRWST1 = monadAskRWST(dictMonad);
  return dictMonoid => {
    const monadAskRWST2 = monadAskRWST1(dictMonoid);
    return {local: f => m => r => s => m(f(r))(s), MonadAsk0: () => monadAskRWST2};
  };
};
const monadEffectRWS = dictMonoid => {
  const lift = monadTransRWST(dictMonoid).lift;
  return dictMonadEffect => {
    const Monad0 = dictMonadEffect.Monad0();
    const monadRWST1 = monadRWST(Monad0)(dictMonoid);
    return {
      liftEffect: (() => {
        const $5 = lift(Monad0);
        return x => $5(dictMonadEffect.liftEffect(x));
      })(),
      Monad0: () => monadRWST1
    };
  };
};
const monadRecRWST = dictMonadRec => {
  const Monad0 = dictMonadRec.Monad0();
  const bind = Monad0.Bind1().bind;
  const pure = Monad0.Applicative0().pure;
  const monadRWST1 = monadRWST(Monad0);
  return dictMonoid => {
    const append = dictMonoid.Semigroup0().append;
    const monadRWST2 = monadRWST1(dictMonoid);
    return {
      tailRecM: k => a => r => s => dictMonadRec.tailRecM(v => bind(k(v._2)(r)(v._1))(v2 => pure((() => {
        if (v2._2.tag === "Loop") { return Control$dMonad$dRec$dClass.$Step("Loop", $RWSResult(v2._1, v2._2._1, append(v._3)(v2._3))); }
        if (v2._2.tag === "Done") { return Control$dMonad$dRec$dClass.$Step("Done", $RWSResult(v2._1, v2._2._1, append(v._3)(v2._3))); }
        $runtime.fail();
      })())))($RWSResult(s, a, dictMonoid.mempty)),
      Monad0: () => monadRWST2
    };
  };
};
const monadStateRWST = dictMonad => {
  const pure = dictMonad.Applicative0().pure;
  const monadRWST1 = monadRWST(dictMonad);
  return dictMonoid => {
    const monadRWST2 = monadRWST1(dictMonoid);
    return {
      state: f => v => s => {
        const v1 = f(s);
        return pure($RWSResult(v1._2, v1._1, dictMonoid.mempty));
      },
      Monad0: () => monadRWST2
    };
  };
};
const monadTellRWST = dictMonad => {
  const pure = dictMonad.Applicative0().pure;
  const monadRWST1 = monadRWST(dictMonad);
  return dictMonoid => {
    const Semigroup0 = dictMonoid.Semigroup0();
    const monadRWST2 = monadRWST1(dictMonoid);
    return {tell: w => v => s => pure($RWSResult(s, Data$dUnit.unit, w)), Semigroup0: () => Semigroup0, Monad1: () => monadRWST2};
  };
};
const monadWriterRWST = dictMonad => {
  const bind = dictMonad.Bind1().bind;
  const pure = dictMonad.Applicative0().pure;
  const monadTellRWST1 = monadTellRWST(dictMonad);
  return dictMonoid => {
    const monadTellRWST2 = monadTellRWST1(dictMonoid);
    return {
      listen: m => r => s => bind(m(r)(s))(v => pure($RWSResult(v._1, Data$dTuple.$Tuple(v._2, v._3), v._3))),
      pass: m => r => s => bind(m(r)(s))(v => pure($RWSResult(v._1, v._2._1, v._2._2(v._3)))),
      Monoid0: () => dictMonoid,
      MonadTell1: () => monadTellRWST2
    };
  };
};
const monadThrowRWST = dictMonadThrow => {
  const Monad0 = dictMonadThrow.Monad0();
  const monadRWST1 = monadRWST(Monad0);
  return dictMonoid => {
    const lift = monadTransRWST(dictMonoid).lift(Monad0);
    const monadRWST2 = monadRWST1(dictMonoid);
    return {throwError: e => lift(dictMonadThrow.throwError(e)), Monad0: () => monadRWST2};
  };
};
const monadErrorRWST = dictMonadError => {
  const monadThrowRWST1 = monadThrowRWST(dictMonadError.MonadThrow0());
  return dictMonoid => {
    const monadThrowRWST2 = monadThrowRWST1(dictMonoid);
    return {catchError: m => h => r => s => dictMonadError.catchError(m(r)(s))(e => h(e)(r)(s)), MonadThrow0: () => monadThrowRWST2};
  };
};
const monoidRWST = dictMonad => {
  const applicativeRWST1 = applicativeRWST(dictMonad);
  const semigroupRWST1 = semigroupRWST(dictMonad.Bind1());
  return dictMonoid => {
    const pure = applicativeRWST1(dictMonoid).pure;
    const semigroupRWST2 = semigroupRWST1(dictMonoid);
    return dictMonoid1 => {
      const semigroupRWST3 = semigroupRWST2(dictMonoid1.Semigroup0());
      return {mempty: pure(dictMonoid1.mempty), Semigroup0: () => semigroupRWST3};
    };
  };
};
const altRWST = dictAlt => {
  const functorRWST1 = functorRWST(dictAlt.Functor0());
  return {alt: v => v1 => r => s => dictAlt.alt(v(r)(s))(v1(r)(s)), Functor0: () => functorRWST1};
};
const plusRWST = dictPlus => {
  const altRWST1 = altRWST(dictPlus.Alt0());
  return {empty: v => v1 => dictPlus.empty, Alt0: () => altRWST1};
};
const alternativeRWST = dictMonoid => dictAlternative => {
  const plusRWST1 = plusRWST(dictAlternative.Plus1());
  return dictMonad => {
    const applicativeRWST1 = applicativeRWST(dictMonad)(dictMonoid);
    return {Applicative0: () => applicativeRWST1, Plus1: () => plusRWST1};
  };
};
export {
  $RWSResult,
  RWSResult,
  RWST,
  altRWST,
  alternativeRWST,
  applicativeRWST,
  applyRWST,
  bindRWST,
  evalRWST,
  execRWST,
  functorRWST,
  lazyRWST,
  mapRWST,
  monadAskRWST,
  monadEffectRWS,
  monadErrorRWST,
  monadRWST,
  monadReaderRWST,
  monadRecRWST,
  monadStateRWST,
  monadTellRWST,
  monadThrowRWST,
  monadTransRWST,
  monadWriterRWST,
  monoidRWST,
  newtypeRWST,
  plusRWST,
  runRWST,
  semigroupRWST,
  withRWST
};
