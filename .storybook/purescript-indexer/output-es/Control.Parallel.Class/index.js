import * as $runtime from "../runtime.js";
import * as Control$dMonad$dCont$dTrans from "../Control.Monad.Cont.Trans/index.js";
import * as Control$dMonad$dExcept$dTrans from "../Control.Monad.Except.Trans/index.js";
import * as Control$dMonad$dMaybe$dTrans from "../Control.Monad.Maybe.Trans/index.js";
import * as Control$dMonad$dReader$dTrans from "../Control.Monad.Reader.Trans/index.js";
import * as Control$dMonad$dWriter$dTrans from "../Control.Monad.Writer.Trans/index.js";
import * as Data$dEither from "../Data.Either/index.js";
import * as Data$dFunctor$dCompose from "../Data.Functor.Compose/index.js";
import * as Data$dFunctor$dCostar from "../Data.Functor.Costar/index.js";
import * as Data$dMaybe from "../Data.Maybe/index.js";
import * as Data$dProfunctor$dStar from "../Data.Profunctor.Star/index.js";
import * as Data$dUnit from "../Data.Unit/index.js";
const ParCont = x => x;
const sequential = dict => dict.sequential;
const parallel = dict => dict.parallel;
const newtypeParCont = {Coercible0: () => undefined};
const monadParWriterT = dictMonoid => {
  const monadWriterT = Control$dMonad$dWriter$dTrans.monadWriterT(dictMonoid);
  const applicativeWriterT = Control$dMonad$dWriter$dTrans.applicativeWriterT(dictMonoid);
  return dictParallel => {
    const monadWriterT1 = monadWriterT(dictParallel.Monad0());
    const applicativeWriterT1 = applicativeWriterT(dictParallel.Applicative1());
    return {parallel: v => dictParallel.parallel(v), sequential: v => dictParallel.sequential(v), Monad0: () => monadWriterT1, Applicative1: () => applicativeWriterT1};
  };
};
const monadParStar = dictParallel => {
  const monadStar = Data$dProfunctor$dStar.monadStar(dictParallel.Monad0());
  const $2 = dictParallel.Applicative1();
  const $3 = $2.Apply0();
  const $4 = $3.Functor0();
  const functorStar1 = {
    map: f => v => {
      const $7 = $4.map(f);
      return x => $7(v(x));
    }
  };
  const applyStar1 = {apply: v => v1 => a => $3.apply(v(a))(v1(a)), Functor0: () => functorStar1};
  const applicativeStar = {pure: a => v => $2.pure(a), Apply0: () => applyStar1};
  return {parallel: v => x => dictParallel.parallel(v(x)), sequential: v => x => dictParallel.sequential(v(x)), Monad0: () => monadStar, Applicative1: () => applicativeStar};
};
const monadParReaderT = dictParallel => {
  const monadReaderT = Control$dMonad$dReader$dTrans.monadReaderT(dictParallel.Monad0());
  const $2 = dictParallel.Applicative1();
  const $3 = $2.Apply0();
  const $4 = $3.Functor0();
  const functorReaderT1 = {
    map: x => {
      const $6 = $4.map(x);
      return v => x$1 => $6(v(x$1));
    }
  };
  const applyReaderT1 = {apply: v => v1 => r => $3.apply(v(r))(v1(r)), Functor0: () => functorReaderT1};
  const applicativeReaderT = {
    pure: x => {
      const $8 = $2.pure(x);
      return v => $8;
    },
    Apply0: () => applyReaderT1
  };
  return {parallel: v => x => dictParallel.parallel(v(x)), sequential: v => x => dictParallel.sequential(v(x)), Monad0: () => monadReaderT, Applicative1: () => applicativeReaderT};
};
const monadParMaybeT = dictParallel => {
  const $1 = dictParallel.Monad0();
  const monadMaybeT = {Applicative0: () => Control$dMonad$dMaybe$dTrans.applicativeMaybeT($1), Bind1: () => Control$dMonad$dMaybe$dTrans.bindMaybeT($1)};
  const applicativeCompose = Data$dFunctor$dCompose.applicativeCompose(dictParallel.Applicative1())(Data$dMaybe.applicativeMaybe);
  return {parallel: v => dictParallel.parallel(v), sequential: v => dictParallel.sequential(v), Monad0: () => monadMaybeT, Applicative1: () => applicativeCompose};
};
const monadParExceptT = dictParallel => {
  const $1 = dictParallel.Monad0();
  const monadExceptT = {Applicative0: () => Control$dMonad$dExcept$dTrans.applicativeExceptT($1), Bind1: () => Control$dMonad$dExcept$dTrans.bindExceptT($1)};
  const applicativeCompose = Data$dFunctor$dCompose.applicativeCompose(dictParallel.Applicative1())(Data$dEither.applicativeEither);
  return {parallel: v => dictParallel.parallel(v), sequential: v => dictParallel.sequential(v), Monad0: () => monadExceptT, Applicative1: () => applicativeCompose};
};
const monadParCostar = dictParallel => (
  {
    parallel: v => x => v(dictParallel.sequential(x)),
    sequential: v => x => v(dictParallel.parallel(x)),
    Monad0: () => Data$dFunctor$dCostar.monadCostar,
    Applicative1: () => Data$dFunctor$dCostar.applicativeCostar
  }
);
const monadParParCont = dictMonadEffect => {
  const monadContT = Control$dMonad$dCont$dTrans.monadContT(dictMonadEffect.Monad0());
  return {parallel: ParCont, sequential: v => v, Monad0: () => monadContT, Applicative1: () => applicativeParCont(dictMonadEffect)};
};
const functorParCont = dictMonadEffect => (
  {
    map: f => {
      const $2 = monadParParCont(dictMonadEffect).parallel;
      const $3 = monadParParCont(dictMonadEffect).sequential;
      return x => $2((() => {
        const $5 = $3(x);
        return k => $5(a => k(f(a)));
      })());
    }
  }
);
const applyParCont = dictMonadEffect => {
  const Bind1 = dictMonadEffect.Monad0().Bind1();
  return {
    apply: v => v1 => k => Bind1.bind(dictMonadEffect.liftEffect(() => ({value: Data$dMaybe.Nothing})))(ra => Bind1.bind(dictMonadEffect.liftEffect(() => (
      {value: Data$dMaybe.Nothing}
    )))(rb => Bind1.bind(v(a => Bind1.bind(dictMonadEffect.liftEffect(() => rb.value))(mb => {
      if (mb.tag === "Nothing") { return dictMonadEffect.liftEffect(() => ra.value = Data$dMaybe.$Maybe("Just", a)); }
      if (mb.tag === "Just") { return k(a(mb._1)); }
      $runtime.fail();
    })))(() => v1(b => Bind1.bind(dictMonadEffect.liftEffect(() => ra.value))(ma => {
      if (ma.tag === "Nothing") { return dictMonadEffect.liftEffect(() => rb.value = Data$dMaybe.$Maybe("Just", b)); }
      if (ma.tag === "Just") { return k(ma._1(b)); }
      $runtime.fail();
    }))))),
    Functor0: () => functorParCont(dictMonadEffect)
  };
};
const applicativeParCont = dictMonadEffect => (
  {
    pure: (() => {
      const $1 = monadParParCont(dictMonadEffect).parallel;
      return x => $1(k => k(x));
    })(),
    Apply0: () => applyParCont(dictMonadEffect)
  }
);
const altParCont = dictMonadEffect => {
  const Monad0 = dictMonadEffect.Monad0();
  const Bind1 = Monad0.Bind1();
  const pure = Monad0.Applicative0().pure;
  const functorParCont1 = functorParCont(dictMonadEffect);
  return {
    alt: v => v1 => k => Bind1.bind(dictMonadEffect.liftEffect(() => ({value: false})))(done => Bind1.bind(v(a => Bind1.bind(dictMonadEffect.liftEffect(() => done.value))(b => {
      if (b) { return pure(Data$dUnit.unit); }
      return Bind1.bind(dictMonadEffect.liftEffect(() => done.value = true))(() => k(a));
    })))(() => v1(a => Bind1.bind(dictMonadEffect.liftEffect(() => done.value))(b => {
      if (b) { return pure(Data$dUnit.unit); }
      return Bind1.bind(dictMonadEffect.liftEffect(() => done.value = true))(() => k(a));
    })))),
    Functor0: () => functorParCont1
  };
};
const plusParCont = dictMonadEffect => {
  const pure = dictMonadEffect.Monad0().Applicative0().pure;
  const altParCont1 = altParCont(dictMonadEffect);
  return {empty: v => pure(Data$dUnit.unit), Alt0: () => altParCont1};
};
const alternativeParCont = dictMonadEffect => {
  const applicativeParCont1 = applicativeParCont(dictMonadEffect);
  const plusParCont1 = plusParCont(dictMonadEffect);
  return {Applicative0: () => applicativeParCont1, Plus1: () => plusParCont1};
};
export {
  ParCont,
  altParCont,
  alternativeParCont,
  applicativeParCont,
  applyParCont,
  functorParCont,
  monadParCostar,
  monadParExceptT,
  monadParMaybeT,
  monadParParCont,
  monadParReaderT,
  monadParStar,
  monadParWriterT,
  newtypeParCont,
  parallel,
  plusParCont,
  sequential
};
