// | This module defines the _exception monad transformer_ `ExceptT`.
import * as $runtime from "../runtime.js";
import * as Control$dMonad$dRec$dClass from "../Control.Monad.Rec.Class/index.js";
import * as Data$dEither from "../Data.Either/index.js";
import * as Data$dTuple from "../Data.Tuple/index.js";
const identity = x => x;
const ExceptT = x => x;
const withExceptT = dictFunctor => f => v => dictFunctor.map(v2 => {
  if (v2.tag === "Right") { return Data$dEither.$Either("Right", v2._1); }
  if (v2.tag === "Left") { return Data$dEither.$Either("Left", f(v2._1)); }
  $runtime.fail();
})(v);
const runExceptT = v => v;
const newtypeExceptT = {Coercible0: () => undefined};
const monadTransExceptT = {
  lift: dictMonad => {
    const bind = dictMonad.Bind1().bind;
    const pure = dictMonad.Applicative0().pure;
    return m => bind(m)(a => pure(Data$dEither.$Either("Right", a)));
  }
};
const mapExceptT = f => v => f(v);
const functorExceptT = dictFunctor => ({map: f => dictFunctor.map(Data$dEither.functorEither.map(f))});
const except = dictApplicative => x => dictApplicative.pure(x);
const monadExceptT = dictMonad => ({Applicative0: () => applicativeExceptT(dictMonad), Bind1: () => bindExceptT(dictMonad)});
const bindExceptT = dictMonad => {
  const bind = dictMonad.Bind1().bind;
  const pure = dictMonad.Applicative0().pure;
  return {
    bind: v => k => bind(v)(v2 => {
      if (v2.tag === "Left") { return pure(Data$dEither.$Either("Left", v2._1)); }
      if (v2.tag === "Right") { return k(v2._1); }
      $runtime.fail();
    }),
    Apply0: () => applyExceptT(dictMonad)
  };
};
const applyExceptT = dictMonad => {
  const $1 = dictMonad.Bind1().Apply0().Functor0();
  const functorExceptT1 = {map: f => $1.map(Data$dEither.functorEither.map(f))};
  return {
    apply: (() => {
      const bind = bindExceptT(dictMonad).bind;
      const pure = applicativeExceptT(dictMonad).pure;
      return f => a => bind(f)(f$p => bind(a)(a$p => pure(f$p(a$p))));
    })(),
    Functor0: () => functorExceptT1
  };
};
const applicativeExceptT = dictMonad => (
  {
    pure: (() => {
      const $1 = dictMonad.Applicative0().pure;
      return x => $1(Data$dEither.$Either("Right", x));
    })(),
    Apply0: () => applyExceptT(dictMonad)
  }
);
const semigroupExceptT = dictMonad => {
  const $1 = applyExceptT(dictMonad);
  const map = $1.Functor0().map;
  return dictSemigroup => ({append: a => b => $1.apply(map(dictSemigroup.append)(a))(b)});
};
const monadAskExceptT = dictMonadAsk => {
  const Monad0 = dictMonadAsk.Monad0();
  const monadExceptT1 = {Applicative0: () => applicativeExceptT(Monad0), Bind1: () => bindExceptT(Monad0)};
  return {ask: monadTransExceptT.lift(Monad0)(dictMonadAsk.ask), Monad0: () => monadExceptT1};
};
const monadReaderExceptT = dictMonadReader => {
  const monadAskExceptT1 = monadAskExceptT(dictMonadReader.MonadAsk0());
  return {local: f => dictMonadReader.local(f), MonadAsk0: () => monadAskExceptT1};
};
const monadContExceptT = dictMonadCont => {
  const $1 = dictMonadCont.Monad0();
  const monadExceptT1 = {Applicative0: () => applicativeExceptT($1), Bind1: () => bindExceptT($1)};
  return {callCC: f => dictMonadCont.callCC(c => f(a => c(Data$dEither.$Either("Right", a)))), Monad0: () => monadExceptT1};
};
const monadEffectExceptT = dictMonadEffect => {
  const Monad0 = dictMonadEffect.Monad0();
  const monadExceptT1 = {Applicative0: () => applicativeExceptT(Monad0), Bind1: () => bindExceptT(Monad0)};
  return {
    liftEffect: (() => {
      const $3 = monadTransExceptT.lift(Monad0);
      return x => $3(dictMonadEffect.liftEffect(x));
    })(),
    Monad0: () => monadExceptT1
  };
};
const monadRecExceptT = dictMonadRec => {
  const Monad0 = dictMonadRec.Monad0();
  const bind = Monad0.Bind1().bind;
  const pure = Monad0.Applicative0().pure;
  const monadExceptT1 = {Applicative0: () => applicativeExceptT(Monad0), Bind1: () => bindExceptT(Monad0)};
  return {
    tailRecM: f => dictMonadRec.tailRecM(a => bind(f(a))(m$p => pure((() => {
      if (m$p.tag === "Left") { return Control$dMonad$dRec$dClass.$Step("Done", Data$dEither.$Either("Left", m$p._1)); }
      if (m$p.tag === "Right") {
        if (m$p._1.tag === "Loop") { return Control$dMonad$dRec$dClass.$Step("Loop", m$p._1._1); }
        if (m$p._1.tag === "Done") { return Control$dMonad$dRec$dClass.$Step("Done", Data$dEither.$Either("Right", m$p._1._1)); }
        $runtime.fail();
      }
      $runtime.fail();
    })()))),
    Monad0: () => monadExceptT1
  };
};
const monadStateExceptT = dictMonadState => {
  const Monad0 = dictMonadState.Monad0();
  const lift1 = monadTransExceptT.lift(Monad0);
  const monadExceptT1 = {Applicative0: () => applicativeExceptT(Monad0), Bind1: () => bindExceptT(Monad0)};
  return {state: f => lift1(dictMonadState.state(f)), Monad0: () => monadExceptT1};
};
const monadTellExceptT = dictMonadTell => {
  const Monad1 = dictMonadTell.Monad1();
  const Semigroup0 = dictMonadTell.Semigroup0();
  const monadExceptT1 = {Applicative0: () => applicativeExceptT(Monad1), Bind1: () => bindExceptT(Monad1)};
  return {
    tell: (() => {
      const $4 = monadTransExceptT.lift(Monad1);
      return x => $4(dictMonadTell.tell(x));
    })(),
    Semigroup0: () => Semigroup0,
    Monad1: () => monadExceptT1
  };
};
const monadWriterExceptT = dictMonadWriter => {
  const MonadTell1 = dictMonadWriter.MonadTell1();
  const Monad1 = MonadTell1.Monad1();
  const bind = Monad1.Bind1().bind;
  const pure = Monad1.Applicative0().pure;
  const Monoid0 = dictMonadWriter.Monoid0();
  const monadTellExceptT1 = monadTellExceptT(MonadTell1);
  return {
    listen: v => bind(dictMonadWriter.listen(v))(v$1 => pure((() => {
      if (v$1._1.tag === "Left") { return Data$dEither.$Either("Left", v$1._1._1); }
      if (v$1._1.tag === "Right") { return Data$dEither.$Either("Right", Data$dTuple.$Tuple(v$1._1._1, v$1._2)); }
      $runtime.fail();
    })())),
    pass: v => dictMonadWriter.pass(bind(v)(a => pure((() => {
      if (a.tag === "Left") { return Data$dTuple.$Tuple(Data$dEither.$Either("Left", a._1), identity); }
      if (a.tag === "Right") { return Data$dTuple.$Tuple(Data$dEither.$Either("Right", a._1._1), a._1._2); }
      $runtime.fail();
    })()))),
    Monoid0: () => Monoid0,
    MonadTell1: () => monadTellExceptT1
  };
};
const monadThrowExceptT = dictMonad => {
  const monadExceptT1 = {Applicative0: () => applicativeExceptT(dictMonad), Bind1: () => bindExceptT(dictMonad)};
  return {
    throwError: (() => {
      const $2 = dictMonad.Applicative0().pure;
      return x => $2(Data$dEither.$Either("Left", x));
    })(),
    Monad0: () => monadExceptT1
  };
};
const monadErrorExceptT = dictMonad => {
  const bind = dictMonad.Bind1().bind;
  const pure = dictMonad.Applicative0().pure;
  const monadThrowExceptT1 = monadThrowExceptT(dictMonad);
  return {
    catchError: v => k => bind(v)(v2 => {
      if (v2.tag === "Left") { return k(v2._1); }
      if (v2.tag === "Right") { return pure(Data$dEither.$Either("Right", v2._1)); }
      $runtime.fail();
    }),
    MonadThrow0: () => monadThrowExceptT1
  };
};
const monoidExceptT = dictMonad => {
  const pure = applicativeExceptT(dictMonad).pure;
  const semigroupExceptT1 = semigroupExceptT(dictMonad);
  return dictMonoid => {
    const semigroupExceptT2 = semigroupExceptT1(dictMonoid.Semigroup0());
    return {mempty: pure(dictMonoid.mempty), Semigroup0: () => semigroupExceptT2};
  };
};
const altExceptT = dictSemigroup => dictMonad => {
  const Bind1 = dictMonad.Bind1();
  const pure = dictMonad.Applicative0().pure;
  const $4 = Bind1.Apply0().Functor0();
  const functorExceptT1 = {map: f => $4.map(Data$dEither.functorEither.map(f))};
  return {
    alt: v => v1 => Bind1.bind(v)(rm => {
      if (rm.tag === "Right") { return pure(Data$dEither.$Either("Right", rm._1)); }
      if (rm.tag === "Left") {
        return Bind1.bind(v1)(rn => {
          if (rn.tag === "Right") { return pure(Data$dEither.$Either("Right", rn._1)); }
          if (rn.tag === "Left") { return pure(Data$dEither.$Either("Left", dictSemigroup.append(rm._1)(rn._1))); }
          $runtime.fail();
        });
      }
      $runtime.fail();
    }),
    Functor0: () => functorExceptT1
  };
};
const plusExceptT = dictMonoid => {
  const altExceptT1 = altExceptT(dictMonoid.Semigroup0());
  return dictMonad => {
    const altExceptT2 = altExceptT1(dictMonad);
    return {empty: monadThrowExceptT(dictMonad).throwError(dictMonoid.mempty), Alt0: () => altExceptT2};
  };
};
const alternativeExceptT = dictMonoid => {
  const plusExceptT1 = plusExceptT(dictMonoid);
  return dictMonad => {
    const applicativeExceptT1 = applicativeExceptT(dictMonad);
    const plusExceptT2 = plusExceptT1(dictMonad);
    return {Applicative0: () => applicativeExceptT1, Plus1: () => plusExceptT2};
  };
};
const monadPlusExceptT = dictMonoid => {
  const alternativeExceptT1 = alternativeExceptT(dictMonoid);
  return dictMonad => {
    const monadExceptT1 = {Applicative0: () => applicativeExceptT(dictMonad), Bind1: () => bindExceptT(dictMonad)};
    const alternativeExceptT2 = alternativeExceptT1(dictMonad);
    return {Monad0: () => monadExceptT1, Alternative1: () => alternativeExceptT2};
  };
};
export {
  ExceptT,
  altExceptT,
  alternativeExceptT,
  applicativeExceptT,
  applyExceptT,
  bindExceptT,
  except,
  functorExceptT,
  identity,
  mapExceptT,
  monadAskExceptT,
  monadContExceptT,
  monadEffectExceptT,
  monadErrorExceptT,
  monadExceptT,
  monadPlusExceptT,
  monadReaderExceptT,
  monadRecExceptT,
  monadStateExceptT,
  monadTellExceptT,
  monadThrowExceptT,
  monadTransExceptT,
  monadWriterExceptT,
  monoidExceptT,
  newtypeExceptT,
  plusExceptT,
  runExceptT,
  semigroupExceptT,
  withExceptT
};
