// | This module defines the state monad transformer, `StateT`.
import * as $runtime from "../runtime.js";
import * as Control$dMonad$dRec$dClass from "../Control.Monad.Rec.Class/index.js";
import * as Data$dTuple from "../Data.Tuple/index.js";
import * as Data$dUnit from "../Data.Unit/index.js";
const StateT = x => x;
const withStateT = f => v => x => v(f(x));
const runStateT = v => v;
const newtypeStateT = {Coercible0: () => undefined};
const monadTransStateT = {
  lift: dictMonad => {
    const bind = dictMonad.Bind1().bind;
    const pure = dictMonad.Applicative0().pure;
    return m => s => bind(m)(x => pure(Data$dTuple.$Tuple(x, s)));
  }
};
const mapStateT = f => v => x => f(v(x));
const lazyStateT = {defer: f => s => f(Data$dUnit.unit)(s)};
const functorStateT = dictFunctor => ({map: f => v => s => dictFunctor.map(v1 => Data$dTuple.$Tuple(f(v1._1), v1._2))(v(s))});
const execStateT = dictFunctor => v => s => dictFunctor.map(Data$dTuple.snd)(v(s));
const evalStateT = dictFunctor => v => s => dictFunctor.map(Data$dTuple.fst)(v(s));
const monadStateT = dictMonad => ({Applicative0: () => applicativeStateT(dictMonad), Bind1: () => bindStateT(dictMonad)});
const bindStateT = dictMonad => {
  const bind = dictMonad.Bind1().bind;
  return {bind: v => f => s => bind(v(s))(v1 => f(v1._1)(v1._2)), Apply0: () => applyStateT(dictMonad)};
};
const applyStateT = dictMonad => {
  const functorStateT1 = functorStateT(dictMonad.Bind1().Apply0().Functor0());
  return {
    apply: (() => {
      const bind = bindStateT(dictMonad).bind;
      const pure = applicativeStateT(dictMonad).pure;
      return f => a => bind(f)(f$p => bind(a)(a$p => pure(f$p(a$p))));
    })(),
    Functor0: () => functorStateT1
  };
};
const applicativeStateT = dictMonad => {
  const pure = dictMonad.Applicative0().pure;
  return {pure: a => s => pure(Data$dTuple.$Tuple(a, s)), Apply0: () => applyStateT(dictMonad)};
};
const semigroupStateT = dictMonad => {
  const $1 = applyStateT(dictMonad);
  const map = $1.Functor0().map;
  return dictSemigroup => ({append: a => b => $1.apply(map(dictSemigroup.append)(a))(b)});
};
const monadAskStateT = dictMonadAsk => {
  const Monad0 = dictMonadAsk.Monad0();
  const monadStateT1 = {Applicative0: () => applicativeStateT(Monad0), Bind1: () => bindStateT(Monad0)};
  return {ask: monadTransStateT.lift(Monad0)(dictMonadAsk.ask), Monad0: () => monadStateT1};
};
const monadReaderStateT = dictMonadReader => {
  const monadAskStateT1 = monadAskStateT(dictMonadReader.MonadAsk0());
  return {
    local: x => {
      const $3 = dictMonadReader.local(x);
      return v => x$1 => $3(v(x$1));
    },
    MonadAsk0: () => monadAskStateT1
  };
};
const monadContStateT = dictMonadCont => {
  const $1 = dictMonadCont.Monad0();
  const monadStateT1 = {Applicative0: () => applicativeStateT($1), Bind1: () => bindStateT($1)};
  return {callCC: f => s => dictMonadCont.callCC(c => f(a => s$p => c(Data$dTuple.$Tuple(a, s$p)))(s)), Monad0: () => monadStateT1};
};
const monadEffectState = dictMonadEffect => {
  const Monad0 = dictMonadEffect.Monad0();
  const monadStateT1 = {Applicative0: () => applicativeStateT(Monad0), Bind1: () => bindStateT(Monad0)};
  return {
    liftEffect: (() => {
      const $3 = monadTransStateT.lift(Monad0);
      return x => $3(dictMonadEffect.liftEffect(x));
    })(),
    Monad0: () => monadStateT1
  };
};
const monadRecStateT = dictMonadRec => {
  const Monad0 = dictMonadRec.Monad0();
  const bind = Monad0.Bind1().bind;
  const pure = Monad0.Applicative0().pure;
  const monadStateT1 = {Applicative0: () => applicativeStateT(Monad0), Bind1: () => bindStateT(Monad0)};
  return {
    tailRecM: f => a => s => dictMonadRec.tailRecM(v => bind(f(v._1)(v._2))(v2 => pure((() => {
      if (v2._1.tag === "Loop") { return Control$dMonad$dRec$dClass.$Step("Loop", Data$dTuple.$Tuple(v2._1._1, v2._2)); }
      if (v2._1.tag === "Done") { return Control$dMonad$dRec$dClass.$Step("Done", Data$dTuple.$Tuple(v2._1._1, v2._2)); }
      $runtime.fail();
    })())))(Data$dTuple.$Tuple(a, s)),
    Monad0: () => monadStateT1
  };
};
const monadStateStateT = dictMonad => {
  const pure = dictMonad.Applicative0().pure;
  const monadStateT1 = {Applicative0: () => applicativeStateT(dictMonad), Bind1: () => bindStateT(dictMonad)};
  return {state: f => x => pure(f(x)), Monad0: () => monadStateT1};
};
const monadTellStateT = dictMonadTell => {
  const Monad1 = dictMonadTell.Monad1();
  const Semigroup0 = dictMonadTell.Semigroup0();
  const monadStateT1 = {Applicative0: () => applicativeStateT(Monad1), Bind1: () => bindStateT(Monad1)};
  return {
    tell: (() => {
      const $4 = monadTransStateT.lift(Monad1);
      return x => $4(dictMonadTell.tell(x));
    })(),
    Semigroup0: () => Semigroup0,
    Monad1: () => monadStateT1
  };
};
const monadWriterStateT = dictMonadWriter => {
  const MonadTell1 = dictMonadWriter.MonadTell1();
  const Monad1 = MonadTell1.Monad1();
  const bind = Monad1.Bind1().bind;
  const pure = Monad1.Applicative0().pure;
  const Monoid0 = dictMonadWriter.Monoid0();
  const monadTellStateT1 = monadTellStateT(MonadTell1);
  return {
    listen: m => s => bind(dictMonadWriter.listen(m(s)))(v => pure(Data$dTuple.$Tuple(Data$dTuple.$Tuple(v._1._1, v._2), v._1._2))),
    pass: m => s => dictMonadWriter.pass(bind(m(s))(v => pure(Data$dTuple.$Tuple(Data$dTuple.$Tuple(v._1._1, v._2), v._1._2)))),
    Monoid0: () => Monoid0,
    MonadTell1: () => monadTellStateT1
  };
};
const monadThrowStateT = dictMonadThrow => {
  const Monad0 = dictMonadThrow.Monad0();
  const lift1 = monadTransStateT.lift(Monad0);
  const monadStateT1 = {Applicative0: () => applicativeStateT(Monad0), Bind1: () => bindStateT(Monad0)};
  return {throwError: e => lift1(dictMonadThrow.throwError(e)), Monad0: () => monadStateT1};
};
const monadErrorStateT = dictMonadError => {
  const monadThrowStateT1 = monadThrowStateT(dictMonadError.MonadThrow0());
  return {catchError: v => h => s => dictMonadError.catchError(v(s))(e => h(e)(s)), MonadThrow0: () => monadThrowStateT1};
};
const monoidStateT = dictMonad => {
  const pure = applicativeStateT(dictMonad).pure;
  const semigroupStateT1 = semigroupStateT(dictMonad);
  return dictMonoid => {
    const semigroupStateT2 = semigroupStateT1(dictMonoid.Semigroup0());
    return {mempty: pure(dictMonoid.mempty), Semigroup0: () => semigroupStateT2};
  };
};
const altStateT = dictMonad => dictAlt => {
  const functorStateT1 = functorStateT(dictAlt.Functor0());
  return {alt: v => v1 => s => dictAlt.alt(v(s))(v1(s)), Functor0: () => functorStateT1};
};
const plusStateT = dictMonad => dictPlus => {
  const altStateT2 = altStateT(dictMonad)(dictPlus.Alt0());
  return {empty: v => dictPlus.empty, Alt0: () => altStateT2};
};
const alternativeStateT = dictMonad => {
  const applicativeStateT1 = applicativeStateT(dictMonad);
  return dictAlternative => {
    const plusStateT2 = plusStateT(dictMonad)(dictAlternative.Plus1());
    return {Applicative0: () => applicativeStateT1, Plus1: () => plusStateT2};
  };
};
const monadPlusStateT = dictMonadPlus => {
  const Monad0 = dictMonadPlus.Monad0();
  const monadStateT1 = {Applicative0: () => applicativeStateT(Monad0), Bind1: () => bindStateT(Monad0)};
  const alternativeStateT1 = alternativeStateT(Monad0)(dictMonadPlus.Alternative1());
  return {Monad0: () => monadStateT1, Alternative1: () => alternativeStateT1};
};
export {
  StateT,
  altStateT,
  alternativeStateT,
  applicativeStateT,
  applyStateT,
  bindStateT,
  evalStateT,
  execStateT,
  functorStateT,
  lazyStateT,
  mapStateT,
  monadAskStateT,
  monadContStateT,
  monadEffectState,
  monadErrorStateT,
  monadPlusStateT,
  monadReaderStateT,
  monadRecStateT,
  monadStateStateT,
  monadStateT,
  monadTellStateT,
  monadThrowStateT,
  monadTransStateT,
  monadWriterStateT,
  monoidStateT,
  newtypeStateT,
  plusStateT,
  runStateT,
  semigroupStateT,
  withStateT
};
