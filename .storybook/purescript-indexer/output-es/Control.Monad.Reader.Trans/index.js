// | This module defines the reader monad transformer, `ReaderT`.
import * as $runtime from "../runtime.js";
const ReaderT = x => x;
const withReaderT = f => v => x => v(f(x));
const runReaderT = v => v;
const newtypeReaderT = {Coercible0: () => undefined};
const monadTransReaderT = {lift: dictMonad => x => v => x};
const mapReaderT = f => v => x => f(v(x));
const functorReaderT = dictFunctor => (
  {
    map: x => {
      const $2 = dictFunctor.map(x);
      return v => x$1 => $2(v(x$1));
    }
  }
);
const distributiveReaderT = dictDistributive => {
  const $1 = dictDistributive.Functor0();
  const functorReaderT1 = {
    map: x => {
      const $3 = $1.map(x);
      return v => x$1 => $3(v(x$1));
    }
  };
  return {
    distribute: dictFunctor => {
      const collect1 = dictDistributive.collect(dictFunctor);
      return a => e => collect1(r => r(e))(a);
    },
    collect: dictFunctor => f => {
      const $5 = distributiveReaderT(dictDistributive).distribute(dictFunctor);
      const $6 = dictFunctor.map(f);
      return x => $5($6(x));
    },
    Functor0: () => functorReaderT1
  };
};
const applyReaderT = dictApply => {
  const $1 = dictApply.Functor0();
  const functorReaderT1 = {
    map: x => {
      const $3 = $1.map(x);
      return v => x$1 => $3(v(x$1));
    }
  };
  return {apply: v => v1 => r => dictApply.apply(v(r))(v1(r)), Functor0: () => functorReaderT1};
};
const bindReaderT = dictBind => {
  const $1 = dictBind.Apply0();
  const $2 = $1.Functor0();
  const functorReaderT1 = {
    map: x => {
      const $4 = $2.map(x);
      return v => x$1 => $4(v(x$1));
    }
  };
  const applyReaderT1 = {apply: v => v1 => r => $1.apply(v(r))(v1(r)), Functor0: () => functorReaderT1};
  return {bind: v => k => r => dictBind.bind(v(r))(a => k(a)(r)), Apply0: () => applyReaderT1};
};
const semigroupReaderT = dictApply => {
  const $1 = dictApply.Functor0();
  return dictSemigroup => (
    {
      append: a => b => {
        const $5 = $1.map(dictSemigroup.append);
        return r => dictApply.apply($5(a(r)))(b(r));
      }
    }
  );
};
const applicativeReaderT = dictApplicative => {
  const $1 = dictApplicative.Apply0();
  const $2 = $1.Functor0();
  const functorReaderT1 = {
    map: x => {
      const $4 = $2.map(x);
      return v => x$1 => $4(v(x$1));
    }
  };
  const applyReaderT1 = {apply: v => v1 => r => $1.apply(v(r))(v1(r)), Functor0: () => functorReaderT1};
  return {
    pure: x => {
      const $6 = dictApplicative.pure(x);
      return v => $6;
    },
    Apply0: () => applyReaderT1
  };
};
const monadReaderT = dictMonad => {
  const $1 = dictMonad.Applicative0();
  const $2 = $1.Apply0();
  const $3 = $2.Functor0();
  const functorReaderT1 = {
    map: x => {
      const $5 = $3.map(x);
      return v => x$1 => $5(v(x$1));
    }
  };
  const applyReaderT1 = {apply: v => v1 => r => $2.apply(v(r))(v1(r)), Functor0: () => functorReaderT1};
  const applicativeReaderT1 = {
    pure: x => {
      const $7 = $1.pure(x);
      return v => $7;
    },
    Apply0: () => applyReaderT1
  };
  const bindReaderT1 = bindReaderT(dictMonad.Bind1());
  return {Applicative0: () => applicativeReaderT1, Bind1: () => bindReaderT1};
};
const monadAskReaderT = dictMonad => {
  const monadReaderT1 = monadReaderT(dictMonad);
  return {ask: dictMonad.Applicative0().pure, Monad0: () => monadReaderT1};
};
const monadReaderReaderT = dictMonad => {
  const monadReaderT1 = monadReaderT(dictMonad);
  const monadAskReaderT1 = {ask: dictMonad.Applicative0().pure, Monad0: () => monadReaderT1};
  return {local: withReaderT, MonadAsk0: () => monadAskReaderT1};
};
const monadContReaderT = dictMonadCont => {
  const monadReaderT1 = monadReaderT(dictMonadCont.Monad0());
  return {
    callCC: f => r => dictMonadCont.callCC(c => f(x => {
      const $6 = c(x);
      return v => $6;
    })(r)),
    Monad0: () => monadReaderT1
  };
};
const monadEffectReader = dictMonadEffect => {
  const monadReaderT1 = monadReaderT(dictMonadEffect.Monad0());
  return {
    liftEffect: x => {
      const $3 = dictMonadEffect.liftEffect(x);
      return v => $3;
    },
    Monad0: () => monadReaderT1
  };
};
const monadRecReaderT = dictMonadRec => {
  const Monad0 = dictMonadRec.Monad0();
  const $2 = Monad0.Bind1();
  const pure = Monad0.Applicative0().pure;
  const monadReaderT1 = monadReaderT(Monad0);
  return {tailRecM: k => a => r => dictMonadRec.tailRecM(a$p => $2.bind(k(a$p)(r))(pure))(a), Monad0: () => monadReaderT1};
};
const monadStateReaderT = dictMonadState => {
  const monadReaderT1 = monadReaderT(dictMonadState.Monad0());
  return {
    state: x => {
      const $3 = dictMonadState.state(x);
      return v => $3;
    },
    Monad0: () => monadReaderT1
  };
};
const monadTellReaderT = dictMonadTell => {
  const Semigroup0 = dictMonadTell.Semigroup0();
  const monadReaderT1 = monadReaderT(dictMonadTell.Monad1());
  return {
    tell: x => {
      const $4 = dictMonadTell.tell(x);
      return v => $4;
    },
    Semigroup0: () => Semigroup0,
    Monad1: () => monadReaderT1
  };
};
const monadWriterReaderT = dictMonadWriter => {
  const Monoid0 = dictMonadWriter.Monoid0();
  const monadTellReaderT1 = monadTellReaderT(dictMonadWriter.MonadTell1());
  return {listen: v => x => dictMonadWriter.listen(v(x)), pass: v => x => dictMonadWriter.pass(v(x)), Monoid0: () => Monoid0, MonadTell1: () => monadTellReaderT1};
};
const monadThrowReaderT = dictMonadThrow => {
  const monadReaderT1 = monadReaderT(dictMonadThrow.Monad0());
  return {
    throwError: x => {
      const $3 = dictMonadThrow.throwError(x);
      return v => $3;
    },
    Monad0: () => monadReaderT1
  };
};
const monadErrorReaderT = dictMonadError => {
  const monadThrowReaderT1 = monadThrowReaderT(dictMonadError.MonadThrow0());
  return {catchError: v => h => r => dictMonadError.catchError(v(r))(e => h(e)(r)), MonadThrow0: () => monadThrowReaderT1};
};
const monoidReaderT = dictApplicative => {
  const $1 = dictApplicative.Apply0();
  const $2 = $1.Functor0();
  return dictMonoid => {
    const $4 = dictMonoid.Semigroup0();
    const semigroupReaderT2 = {
      append: a => b => {
        const $7 = $2.map($4.append);
        return r => $1.apply($7(a(r)))(b(r));
      }
    };
    return {
      mempty: (() => {
        const $6 = dictApplicative.pure(dictMonoid.mempty);
        return v => $6;
      })(),
      Semigroup0: () => semigroupReaderT2
    };
  };
};
const altReaderT = dictAlt => {
  const $1 = dictAlt.Functor0();
  const functorReaderT1 = {
    map: x => {
      const $3 = $1.map(x);
      return v => x$1 => $3(v(x$1));
    }
  };
  return {alt: v => v1 => r => dictAlt.alt(v(r))(v1(r)), Functor0: () => functorReaderT1};
};
const plusReaderT = dictPlus => {
  const $1 = dictPlus.Alt0();
  const $2 = $1.Functor0();
  const functorReaderT1 = {
    map: x => {
      const $4 = $2.map(x);
      return v => x$1 => $4(v(x$1));
    }
  };
  const altReaderT1 = {alt: v => v1 => r => $1.alt(v(r))(v1(r)), Functor0: () => functorReaderT1};
  return {empty: v => dictPlus.empty, Alt0: () => altReaderT1};
};
const alternativeReaderT = dictAlternative => {
  const $1 = dictAlternative.Applicative0();
  const $2 = $1.Apply0();
  const $3 = $2.Functor0();
  const functorReaderT1 = {
    map: x => {
      const $5 = $3.map(x);
      return v => x$1 => $5(v(x$1));
    }
  };
  const applyReaderT1 = {apply: v => v1 => r => $2.apply(v(r))(v1(r)), Functor0: () => functorReaderT1};
  const applicativeReaderT1 = {
    pure: x => {
      const $7 = $1.pure(x);
      return v => $7;
    },
    Apply0: () => applyReaderT1
  };
  const $7 = dictAlternative.Plus1();
  const $8 = $7.Alt0();
  const $9 = $8.Functor0();
  const functorReaderT1$1 = {
    map: x => {
      const $11 = $9.map(x);
      return v => x$1 => $11(v(x$1));
    }
  };
  const altReaderT1 = {alt: v => v1 => r => $8.alt(v(r))(v1(r)), Functor0: () => functorReaderT1$1};
  return {Applicative0: () => applicativeReaderT1, Plus1: () => ({empty: v => $7.empty, Alt0: () => altReaderT1})};
};
const monadPlusReaderT = dictMonadPlus => {
  const monadReaderT1 = monadReaderT(dictMonadPlus.Monad0());
  const alternativeReaderT1 = alternativeReaderT(dictMonadPlus.Alternative1());
  return {Monad0: () => monadReaderT1, Alternative1: () => alternativeReaderT1};
};
export {
  ReaderT,
  altReaderT,
  alternativeReaderT,
  applicativeReaderT,
  applyReaderT,
  bindReaderT,
  distributiveReaderT,
  functorReaderT,
  mapReaderT,
  monadAskReaderT,
  monadContReaderT,
  monadEffectReader,
  monadErrorReaderT,
  monadPlusReaderT,
  monadReaderReaderT,
  monadReaderT,
  monadRecReaderT,
  monadStateReaderT,
  monadTellReaderT,
  monadThrowReaderT,
  monadTransReaderT,
  monadWriterReaderT,
  monoidReaderT,
  newtypeReaderT,
  plusReaderT,
  runReaderT,
  semigroupReaderT,
  withReaderT
};
