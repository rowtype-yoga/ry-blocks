// | This module defines the writer monad transformer, `WriterT`.
import * as $runtime from "../runtime.js";
import * as Control$dMonad$dRec$dClass from "../Control.Monad.Rec.Class/index.js";
import * as Data$dTuple from "../Data.Tuple/index.js";
import * as Data$dUnit from "../Data.Unit/index.js";
const WriterT = x => x;
const runWriterT = v => v;
const newtypeWriterT = {Coercible0: () => undefined};
const monadTransWriterT = dictMonoid => (
  {
    lift: dictMonad => {
      const bind = dictMonad.Bind1().bind;
      const pure = dictMonad.Applicative0().pure;
      return m => bind(m)(a => pure(Data$dTuple.$Tuple(a, dictMonoid.mempty)));
    }
  }
);
const mapWriterT = f => v => f(v);
const functorWriterT = dictFunctor => ({map: f => dictFunctor.map(v => Data$dTuple.$Tuple(f(v._1), v._2))});
const execWriterT = dictFunctor => v => dictFunctor.map(Data$dTuple.snd)(v);
const applyWriterT = dictSemigroup => dictApply => {
  const Functor0 = dictApply.Functor0();
  const functorWriterT1 = functorWriterT(Functor0);
  return {apply: v => v1 => dictApply.apply(Functor0.map(v3 => v4 => Data$dTuple.$Tuple(v3._1(v4._1), dictSemigroup.append(v3._2)(v4._2)))(v))(v1), Functor0: () => functorWriterT1};
};
const bindWriterT = dictSemigroup => dictBind => {
  const Apply0 = dictBind.Apply0();
  const map = Apply0.Functor0().map;
  const applyWriterT2 = applyWriterT(dictSemigroup)(Apply0);
  return {bind: v => k => dictBind.bind(v)(v1 => map(v3 => Data$dTuple.$Tuple(v3._1, dictSemigroup.append(v1._2)(v3._2)))(k(v1._1))), Apply0: () => applyWriterT2};
};
const semigroupWriterT = dictApply => dictSemigroup => {
  const $2 = applyWriterT(dictSemigroup)(dictApply);
  const map = $2.Functor0().map;
  return dictSemigroup1 => ({append: a => b => $2.apply(map(dictSemigroup1.append)(a))(b)});
};
const applicativeWriterT = dictMonoid => {
  const applyWriterT1 = applyWriterT(dictMonoid.Semigroup0());
  return dictApplicative => {
    const applyWriterT2 = applyWriterT1(dictApplicative.Apply0());
    return {pure: a => dictApplicative.pure(Data$dTuple.$Tuple(a, dictMonoid.mempty)), Apply0: () => applyWriterT2};
  };
};
const monadWriterT = dictMonoid => {
  const applicativeWriterT1 = applicativeWriterT(dictMonoid);
  const bindWriterT1 = bindWriterT(dictMonoid.Semigroup0());
  return dictMonad => {
    const applicativeWriterT2 = applicativeWriterT1(dictMonad.Applicative0());
    const bindWriterT2 = bindWriterT1(dictMonad.Bind1());
    return {Applicative0: () => applicativeWriterT2, Bind1: () => bindWriterT2};
  };
};
const monadAskWriterT = dictMonoid => {
  const lift = monadTransWriterT(dictMonoid).lift;
  const monadWriterT1 = monadWriterT(dictMonoid);
  return dictMonadAsk => {
    const Monad0 = dictMonadAsk.Monad0();
    const monadWriterT2 = monadWriterT1(Monad0);
    return {ask: lift(Monad0)(dictMonadAsk.ask), Monad0: () => monadWriterT2};
  };
};
const monadReaderWriterT = dictMonoid => {
  const monadAskWriterT1 = monadAskWriterT(dictMonoid);
  return dictMonadReader => {
    const monadAskWriterT2 = monadAskWriterT1(dictMonadReader.MonadAsk0());
    return {local: f => dictMonadReader.local(f), MonadAsk0: () => monadAskWriterT2};
  };
};
const monadContWriterT = dictMonoid => {
  const monadWriterT1 = monadWriterT(dictMonoid);
  return dictMonadCont => {
    const monadWriterT2 = monadWriterT1(dictMonadCont.Monad0());
    return {callCC: f => dictMonadCont.callCC(c => f(a => c(Data$dTuple.$Tuple(a, dictMonoid.mempty)))), Monad0: () => monadWriterT2};
  };
};
const monadEffectWriter = dictMonoid => {
  const lift = monadTransWriterT(dictMonoid).lift;
  const monadWriterT1 = monadWriterT(dictMonoid);
  return dictMonadEffect => {
    const Monad0 = dictMonadEffect.Monad0();
    const monadWriterT2 = monadWriterT1(Monad0);
    return {
      liftEffect: (() => {
        const $6 = lift(Monad0);
        return x => $6(dictMonadEffect.liftEffect(x));
      })(),
      Monad0: () => monadWriterT2
    };
  };
};
const monadRecWriterT = dictMonoid => {
  const append = dictMonoid.Semigroup0().append;
  const monadWriterT1 = monadWriterT(dictMonoid);
  return dictMonadRec => {
    const Monad0 = dictMonadRec.Monad0();
    const bind = Monad0.Bind1().bind;
    const pure = Monad0.Applicative0().pure;
    const monadWriterT2 = monadWriterT1(Monad0);
    return {
      tailRecM: f => a => dictMonadRec.tailRecM(v => bind(f(v._1))(v2 => pure((() => {
        if (v2._1.tag === "Loop") { return Control$dMonad$dRec$dClass.$Step("Loop", Data$dTuple.$Tuple(v2._1._1, append(v._2)(v2._2))); }
        if (v2._1.tag === "Done") { return Control$dMonad$dRec$dClass.$Step("Done", Data$dTuple.$Tuple(v2._1._1, append(v._2)(v2._2))); }
        $runtime.fail();
      })())))(Data$dTuple.$Tuple(a, dictMonoid.mempty)),
      Monad0: () => monadWriterT2
    };
  };
};
const monadStateWriterT = dictMonoid => {
  const lift = monadTransWriterT(dictMonoid).lift;
  const monadWriterT1 = monadWriterT(dictMonoid);
  return dictMonadState => {
    const Monad0 = dictMonadState.Monad0();
    const lift1 = lift(Monad0);
    const monadWriterT2 = monadWriterT1(Monad0);
    return {state: f => lift1(dictMonadState.state(f)), Monad0: () => monadWriterT2};
  };
};
const monadTellWriterT = dictMonoid => {
  const Semigroup0 = dictMonoid.Semigroup0();
  const monadWriterT1 = monadWriterT(dictMonoid);
  return dictMonad => {
    const monadWriterT2 = monadWriterT1(dictMonad);
    return {
      tell: (() => {
        const $5 = dictMonad.Applicative0().pure;
        const $6 = Data$dTuple.Tuple(Data$dUnit.unit);
        return x => $5($6(x));
      })(),
      Semigroup0: () => Semigroup0,
      Monad1: () => monadWriterT2
    };
  };
};
const monadWriterWriterT = dictMonoid => {
  const monadTellWriterT1 = monadTellWriterT(dictMonoid);
  return dictMonad => {
    const bind = dictMonad.Bind1().bind;
    const pure = dictMonad.Applicative0().pure;
    const monadTellWriterT2 = monadTellWriterT1(dictMonad);
    return {
      listen: v => bind(v)(v1 => pure(Data$dTuple.$Tuple(Data$dTuple.$Tuple(v1._1, v1._2), v1._2))),
      pass: v => bind(v)(v1 => pure(Data$dTuple.$Tuple(v1._1._1, v1._1._2(v1._2)))),
      Monoid0: () => dictMonoid,
      MonadTell1: () => monadTellWriterT2
    };
  };
};
const monadThrowWriterT = dictMonoid => {
  const lift = monadTransWriterT(dictMonoid).lift;
  const monadWriterT1 = monadWriterT(dictMonoid);
  return dictMonadThrow => {
    const Monad0 = dictMonadThrow.Monad0();
    const lift1 = lift(Monad0);
    const monadWriterT2 = monadWriterT1(Monad0);
    return {throwError: e => lift1(dictMonadThrow.throwError(e)), Monad0: () => monadWriterT2};
  };
};
const monadErrorWriterT = dictMonoid => {
  const monadThrowWriterT1 = monadThrowWriterT(dictMonoid);
  return dictMonadError => {
    const monadThrowWriterT2 = monadThrowWriterT1(dictMonadError.MonadThrow0());
    return {catchError: v => h => dictMonadError.catchError(v)(e => h(e)), MonadThrow0: () => monadThrowWriterT2};
  };
};
const monoidWriterT = dictApplicative => {
  const semigroupWriterT1 = semigroupWriterT(dictApplicative.Apply0());
  return dictMonoid => {
    const pure = applicativeWriterT(dictMonoid)(dictApplicative).pure;
    const semigroupWriterT2 = semigroupWriterT1(dictMonoid.Semigroup0());
    return dictMonoid1 => {
      const semigroupWriterT3 = semigroupWriterT2(dictMonoid1.Semigroup0());
      return {mempty: pure(dictMonoid1.mempty), Semigroup0: () => semigroupWriterT3};
    };
  };
};
const altWriterT = dictAlt => {
  const functorWriterT1 = functorWriterT(dictAlt.Functor0());
  return {alt: v => v1 => dictAlt.alt(v)(v1), Functor0: () => functorWriterT1};
};
const plusWriterT = dictPlus => {
  const altWriterT1 = altWriterT(dictPlus.Alt0());
  return {empty: dictPlus.empty, Alt0: () => altWriterT1};
};
const alternativeWriterT = dictMonoid => {
  const applicativeWriterT1 = applicativeWriterT(dictMonoid);
  return dictAlternative => {
    const applicativeWriterT2 = applicativeWriterT1(dictAlternative.Applicative0());
    const $4 = dictAlternative.Plus1();
    const altWriterT1 = altWriterT($4.Alt0());
    return {Applicative0: () => applicativeWriterT2, Plus1: () => ({empty: $4.empty, Alt0: () => altWriterT1})};
  };
};
const monadPlusWriterT = dictMonoid => {
  const monadWriterT1 = monadWriterT(dictMonoid);
  const alternativeWriterT1 = alternativeWriterT(dictMonoid);
  return dictMonadPlus => {
    const monadWriterT2 = monadWriterT1(dictMonadPlus.Monad0());
    const alternativeWriterT2 = alternativeWriterT1(dictMonadPlus.Alternative1());
    return {Monad0: () => monadWriterT2, Alternative1: () => alternativeWriterT2};
  };
};
export {
  WriterT,
  altWriterT,
  alternativeWriterT,
  applicativeWriterT,
  applyWriterT,
  bindWriterT,
  execWriterT,
  functorWriterT,
  mapWriterT,
  monadAskWriterT,
  monadContWriterT,
  monadEffectWriter,
  monadErrorWriterT,
  monadPlusWriterT,
  monadReaderWriterT,
  monadRecWriterT,
  monadStateWriterT,
  monadTellWriterT,
  monadThrowWriterT,
  monadTransWriterT,
  monadWriterT,
  monadWriterWriterT,
  monoidWriterT,
  newtypeWriterT,
  plusWriterT,
  runWriterT,
  semigroupWriterT
};
