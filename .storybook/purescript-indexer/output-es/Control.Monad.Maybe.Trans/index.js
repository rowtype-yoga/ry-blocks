// | This module defines the `MaybeT` monad transformer.
import * as $runtime from "../runtime.js";
import * as Control$dMonad$dRec$dClass from "../Control.Monad.Rec.Class/index.js";
import * as Data$dMaybe from "../Data.Maybe/index.js";
import * as Data$dTuple from "../Data.Tuple/index.js";
const identity = x => x;
const MaybeT = x => x;
const runMaybeT = v => v;
const newtypeMaybeT = {Coercible0: () => undefined};
const monadTransMaybeT = {
  lift: dictMonad => {
    const bind = dictMonad.Bind1().bind;
    const pure = dictMonad.Applicative0().pure;
    return x => bind(x)(a$p => pure(Data$dMaybe.$Maybe("Just", a$p)));
  }
};
const mapMaybeT = f => v => f(v);
const functorMaybeT = dictFunctor => ({map: f => v => dictFunctor.map(Data$dMaybe.functorMaybe.map(f))(v)});
const monadMaybeT = dictMonad => ({Applicative0: () => applicativeMaybeT(dictMonad), Bind1: () => bindMaybeT(dictMonad)});
const bindMaybeT = dictMonad => {
  const bind = dictMonad.Bind1().bind;
  const pure = dictMonad.Applicative0().pure;
  return {
    bind: v => f => bind(v)(v1 => {
      if (v1.tag === "Nothing") { return pure(Data$dMaybe.Nothing); }
      if (v1.tag === "Just") { return f(v1._1); }
      $runtime.fail();
    }),
    Apply0: () => applyMaybeT(dictMonad)
  };
};
const applyMaybeT = dictMonad => {
  const $1 = dictMonad.Bind1().Apply0().Functor0();
  const functorMaybeT1 = {map: f => v => $1.map(Data$dMaybe.functorMaybe.map(f))(v)};
  return {
    apply: (() => {
      const bind = bindMaybeT(dictMonad).bind;
      const pure = applicativeMaybeT(dictMonad).pure;
      return f => a => bind(f)(f$p => bind(a)(a$p => pure(f$p(a$p))));
    })(),
    Functor0: () => functorMaybeT1
  };
};
const applicativeMaybeT = dictMonad => (
  {
    pure: (() => {
      const $1 = dictMonad.Applicative0().pure;
      return x => $1(Data$dMaybe.$Maybe("Just", x));
    })(),
    Apply0: () => applyMaybeT(dictMonad)
  }
);
const semigroupMaybeT = dictMonad => {
  const $1 = applyMaybeT(dictMonad);
  const map = $1.Functor0().map;
  return dictSemigroup => ({append: a => b => $1.apply(map(dictSemigroup.append)(a))(b)});
};
const monadAskMaybeT = dictMonadAsk => {
  const Monad0 = dictMonadAsk.Monad0();
  const monadMaybeT1 = {Applicative0: () => applicativeMaybeT(Monad0), Bind1: () => bindMaybeT(Monad0)};
  return {ask: monadTransMaybeT.lift(Monad0)(dictMonadAsk.ask), Monad0: () => monadMaybeT1};
};
const monadReaderMaybeT = dictMonadReader => {
  const monadAskMaybeT1 = monadAskMaybeT(dictMonadReader.MonadAsk0());
  return {local: f => dictMonadReader.local(f), MonadAsk0: () => monadAskMaybeT1};
};
const monadContMaybeT = dictMonadCont => {
  const $1 = dictMonadCont.Monad0();
  const monadMaybeT1 = {Applicative0: () => applicativeMaybeT($1), Bind1: () => bindMaybeT($1)};
  return {callCC: f => dictMonadCont.callCC(c => f(a => c(Data$dMaybe.$Maybe("Just", a)))), Monad0: () => monadMaybeT1};
};
const monadEffectMaybe = dictMonadEffect => {
  const Monad0 = dictMonadEffect.Monad0();
  const monadMaybeT1 = {Applicative0: () => applicativeMaybeT(Monad0), Bind1: () => bindMaybeT(Monad0)};
  return {
    liftEffect: (() => {
      const $3 = monadTransMaybeT.lift(Monad0);
      return x => $3(dictMonadEffect.liftEffect(x));
    })(),
    Monad0: () => monadMaybeT1
  };
};
const monadRecMaybeT = dictMonadRec => {
  const Monad0 = dictMonadRec.Monad0();
  const bind = Monad0.Bind1().bind;
  const pure = Monad0.Applicative0().pure;
  const monadMaybeT1 = {Applicative0: () => applicativeMaybeT(Monad0), Bind1: () => bindMaybeT(Monad0)};
  return {
    tailRecM: f => dictMonadRec.tailRecM(a => bind(f(a))(m$p => pure((() => {
      if (m$p.tag === "Nothing") { return Control$dMonad$dRec$dClass.$Step("Done", Data$dMaybe.Nothing); }
      if (m$p.tag === "Just") {
        if (m$p._1.tag === "Loop") { return Control$dMonad$dRec$dClass.$Step("Loop", m$p._1._1); }
        if (m$p._1.tag === "Done") { return Control$dMonad$dRec$dClass.$Step("Done", Data$dMaybe.$Maybe("Just", m$p._1._1)); }
        $runtime.fail();
      }
      $runtime.fail();
    })()))),
    Monad0: () => monadMaybeT1
  };
};
const monadStateMaybeT = dictMonadState => {
  const Monad0 = dictMonadState.Monad0();
  const lift1 = monadTransMaybeT.lift(Monad0);
  const monadMaybeT1 = {Applicative0: () => applicativeMaybeT(Monad0), Bind1: () => bindMaybeT(Monad0)};
  return {state: f => lift1(dictMonadState.state(f)), Monad0: () => monadMaybeT1};
};
const monadTellMaybeT = dictMonadTell => {
  const Monad1 = dictMonadTell.Monad1();
  const Semigroup0 = dictMonadTell.Semigroup0();
  const monadMaybeT1 = {Applicative0: () => applicativeMaybeT(Monad1), Bind1: () => bindMaybeT(Monad1)};
  return {
    tell: (() => {
      const $4 = monadTransMaybeT.lift(Monad1);
      return x => $4(dictMonadTell.tell(x));
    })(),
    Semigroup0: () => Semigroup0,
    Monad1: () => monadMaybeT1
  };
};
const monadWriterMaybeT = dictMonadWriter => {
  const MonadTell1 = dictMonadWriter.MonadTell1();
  const Monad1 = MonadTell1.Monad1();
  const bind = Monad1.Bind1().bind;
  const pure = Monad1.Applicative0().pure;
  const Monoid0 = dictMonadWriter.Monoid0();
  const monadTellMaybeT1 = monadTellMaybeT(MonadTell1);
  return {
    listen: v => bind(dictMonadWriter.listen(v))(v$1 => pure((() => {
      if (v$1._1.tag === "Just") { return Data$dMaybe.$Maybe("Just", Data$dTuple.$Tuple(v$1._1._1, v$1._2)); }
      return Data$dMaybe.Nothing;
    })())),
    pass: v => dictMonadWriter.pass(bind(v)(a => pure((() => {
      if (a.tag === "Nothing") { return Data$dTuple.$Tuple(Data$dMaybe.Nothing, identity); }
      if (a.tag === "Just") { return Data$dTuple.$Tuple(Data$dMaybe.$Maybe("Just", a._1._1), a._1._2); }
      $runtime.fail();
    })()))),
    Monoid0: () => Monoid0,
    MonadTell1: () => monadTellMaybeT1
  };
};
const monadThrowMaybeT = dictMonadThrow => {
  const Monad0 = dictMonadThrow.Monad0();
  const lift1 = monadTransMaybeT.lift(Monad0);
  const monadMaybeT1 = {Applicative0: () => applicativeMaybeT(Monad0), Bind1: () => bindMaybeT(Monad0)};
  return {throwError: e => lift1(dictMonadThrow.throwError(e)), Monad0: () => monadMaybeT1};
};
const monadErrorMaybeT = dictMonadError => {
  const monadThrowMaybeT1 = monadThrowMaybeT(dictMonadError.MonadThrow0());
  return {catchError: v => h => dictMonadError.catchError(v)(a => h(a)), MonadThrow0: () => monadThrowMaybeT1};
};
const monoidMaybeT = dictMonad => {
  const pure = applicativeMaybeT(dictMonad).pure;
  const semigroupMaybeT1 = semigroupMaybeT(dictMonad);
  return dictMonoid => {
    const semigroupMaybeT2 = semigroupMaybeT1(dictMonoid.Semigroup0());
    return {mempty: pure(dictMonoid.mempty), Semigroup0: () => semigroupMaybeT2};
  };
};
const altMaybeT = dictMonad => {
  const Bind1 = dictMonad.Bind1();
  const pure = dictMonad.Applicative0().pure;
  const $3 = Bind1.Apply0().Functor0();
  const functorMaybeT1 = {map: f => v => $3.map(Data$dMaybe.functorMaybe.map(f))(v)};
  return {
    alt: v => v1 => Bind1.bind(v)(m => {
      if (m.tag === "Nothing") { return v1; }
      return pure(m);
    }),
    Functor0: () => functorMaybeT1
  };
};
const plusMaybeT = dictMonad => {
  const altMaybeT1 = altMaybeT(dictMonad);
  return {empty: dictMonad.Applicative0().pure(Data$dMaybe.Nothing), Alt0: () => altMaybeT1};
};
const alternativeMaybeT = dictMonad => {
  const applicativeMaybeT1 = applicativeMaybeT(dictMonad);
  const plusMaybeT1 = plusMaybeT(dictMonad);
  return {Applicative0: () => applicativeMaybeT1, Plus1: () => plusMaybeT1};
};
const monadPlusMaybeT = dictMonad => {
  const monadMaybeT1 = {Applicative0: () => applicativeMaybeT(dictMonad), Bind1: () => bindMaybeT(dictMonad)};
  const alternativeMaybeT1 = alternativeMaybeT(dictMonad);
  return {Monad0: () => monadMaybeT1, Alternative1: () => alternativeMaybeT1};
};
export {
  MaybeT,
  altMaybeT,
  alternativeMaybeT,
  applicativeMaybeT,
  applyMaybeT,
  bindMaybeT,
  functorMaybeT,
  identity,
  mapMaybeT,
  monadAskMaybeT,
  monadContMaybeT,
  monadEffectMaybe,
  monadErrorMaybeT,
  monadMaybeT,
  monadPlusMaybeT,
  monadReaderMaybeT,
  monadRecMaybeT,
  monadStateMaybeT,
  monadTellMaybeT,
  monadThrowMaybeT,
  monadTransMaybeT,
  monadWriterMaybeT,
  monoidMaybeT,
  newtypeMaybeT,
  plusMaybeT,
  runMaybeT,
  semigroupMaybeT
};
