import * as $runtime from "../runtime.js";
import * as Data$dEither from "../Data.Either/index.js";
import * as Data$dFunctor from "../Data.Functor/index.js";
import * as Data$dTuple from "../Data.Tuple/index.js";
const Star = x => x;
const semigroupoidStar = dictBind => ({compose: v => v1 => x => dictBind.bind(v1(x))(v)});
const profunctorStar = dictFunctor => (
  {
    dimap: f => g => v => {
      const $4 = dictFunctor.map(g);
      return x => $4(v(f(x)));
    }
  }
);
const strongStar = dictFunctor => {
  const profunctorStar1 = {
    dimap: f => g => v => {
      const $4 = dictFunctor.map(g);
      return x => $4(v(f(x)));
    }
  };
  return {
    first: v => v1 => dictFunctor.map(v2 => Data$dTuple.$Tuple(v2, v1._2))(v(v1._1)),
    second: v => v1 => dictFunctor.map(Data$dTuple.Tuple(v1._1))(v(v1._2)),
    Profunctor0: () => profunctorStar1
  };
};
const newtypeStar = {Coercible0: () => undefined};
const invariantStar = dictInvariant => (
  {
    imap: f => g => v => {
      const $4 = dictInvariant.imap(f)(g);
      return x => $4(v(x));
    }
  }
);
const hoistStar = f => v => x => f(v(x));
const functorStar = dictFunctor => (
  {
    map: f => v => {
      const $3 = dictFunctor.map(f);
      return x => $3(v(x));
    }
  }
);
const distributiveStar = dictDistributive => {
  const $1 = dictDistributive.Functor0();
  const functorStar1 = {
    map: f => v => {
      const $4 = $1.map(f);
      return x => $4(v(x));
    }
  };
  return {
    distribute: dictFunctor => {
      const collect1 = dictDistributive.collect(dictFunctor);
      return f => a => collect1(v => v(a))(f);
    },
    collect: dictFunctor => f => {
      const $5 = distributiveStar(dictDistributive).distribute(dictFunctor);
      const $6 = dictFunctor.map(f);
      return x => $5($6(x));
    },
    Functor0: () => functorStar1
  };
};
const closedStar = dictDistributive => {
  const distribute = dictDistributive.distribute(Data$dFunctor.functorFn);
  const $2 = dictDistributive.Functor0();
  const profunctorStar1 = {
    dimap: f => g => v => {
      const $6 = $2.map(g);
      return x => $6(v(f(x)));
    }
  };
  return {closed: v => g => distribute(x => v(g(x))), Profunctor0: () => profunctorStar1};
};
const choiceStar = dictApplicative => {
  const Functor0 = dictApplicative.Apply0().Functor0();
  const profunctorStar1 = {
    dimap: f => g => v => {
      const $5 = Functor0.map(g);
      return x => $5(v(f(x)));
    }
  };
  return {
    left: v => {
      const $4 = Functor0.map(Data$dEither.Left);
      return v2 => {
        if (v2.tag === "Left") { return $4(v(v2._1)); }
        if (v2.tag === "Right") { return dictApplicative.pure(Data$dEither.$Either("Right", v2._1)); }
        $runtime.fail();
      };
    },
    right: v => {
      const $4 = Functor0.map(Data$dEither.Right);
      return v2 => {
        if (v2.tag === "Left") { return dictApplicative.pure(Data$dEither.$Either("Left", v2._1)); }
        if (v2.tag === "Right") { return $4(v(v2._1)); }
        $runtime.fail();
      };
    },
    Profunctor0: () => profunctorStar1
  };
};
const categoryStar = dictMonad => {
  const $1 = dictMonad.Bind1();
  const semigroupoidStar1 = {compose: v => v1 => x => $1.bind(v1(x))(v)};
  return {identity: dictMonad.Applicative0().pure, Semigroupoid0: () => semigroupoidStar1};
};
const applyStar = dictApply => {
  const $1 = dictApply.Functor0();
  const functorStar1 = {
    map: f => v => {
      const $4 = $1.map(f);
      return x => $4(v(x));
    }
  };
  return {apply: v => v1 => a => dictApply.apply(v(a))(v1(a)), Functor0: () => functorStar1};
};
const bindStar = dictBind => {
  const $1 = dictBind.Apply0();
  const $2 = $1.Functor0();
  const functorStar1 = {
    map: f => v => {
      const $5 = $2.map(f);
      return x => $5(v(x));
    }
  };
  const applyStar1 = {apply: v => v1 => a => $1.apply(v(a))(v1(a)), Functor0: () => functorStar1};
  return {bind: v => f => x => dictBind.bind(v(x))(a => f(a)(x)), Apply0: () => applyStar1};
};
const applicativeStar = dictApplicative => {
  const $1 = dictApplicative.Apply0();
  const $2 = $1.Functor0();
  const functorStar1 = {
    map: f => v => {
      const $5 = $2.map(f);
      return x => $5(v(x));
    }
  };
  const applyStar1 = {apply: v => v1 => a => $1.apply(v(a))(v1(a)), Functor0: () => functorStar1};
  return {pure: a => v => dictApplicative.pure(a), Apply0: () => applyStar1};
};
const monadStar = dictMonad => {
  const $1 = dictMonad.Applicative0();
  const $2 = $1.Apply0();
  const $3 = $2.Functor0();
  const functorStar1 = {
    map: f => v => {
      const $6 = $3.map(f);
      return x => $6(v(x));
    }
  };
  const applyStar1 = {apply: v => v1 => a => $2.apply(v(a))(v1(a)), Functor0: () => functorStar1};
  const applicativeStar1 = {pure: a => v => $1.pure(a), Apply0: () => applyStar1};
  const bindStar1 = bindStar(dictMonad.Bind1());
  return {Applicative0: () => applicativeStar1, Bind1: () => bindStar1};
};
const altStar = dictAlt => {
  const $1 = dictAlt.Functor0();
  const functorStar1 = {
    map: f => v => {
      const $4 = $1.map(f);
      return x => $4(v(x));
    }
  };
  return {alt: v => v1 => a => dictAlt.alt(v(a))(v1(a)), Functor0: () => functorStar1};
};
const plusStar = dictPlus => {
  const $1 = dictPlus.Alt0();
  const $2 = $1.Functor0();
  const functorStar1 = {
    map: f => v => {
      const $5 = $2.map(f);
      return x => $5(v(x));
    }
  };
  const altStar1 = {alt: v => v1 => a => $1.alt(v(a))(v1(a)), Functor0: () => functorStar1};
  return {empty: v => dictPlus.empty, Alt0: () => altStar1};
};
const alternativeStar = dictAlternative => {
  const $1 = dictAlternative.Applicative0();
  const $2 = $1.Apply0();
  const $3 = $2.Functor0();
  const functorStar1 = {
    map: f => v => {
      const $6 = $3.map(f);
      return x => $6(v(x));
    }
  };
  const applyStar1 = {apply: v => v1 => a => $2.apply(v(a))(v1(a)), Functor0: () => functorStar1};
  const applicativeStar1 = {pure: a => v => $1.pure(a), Apply0: () => applyStar1};
  const $7 = dictAlternative.Plus1();
  const $8 = $7.Alt0();
  const $9 = $8.Functor0();
  const functorStar1$1 = {
    map: f => v => {
      const $12 = $9.map(f);
      return x => $12(v(x));
    }
  };
  const altStar1 = {alt: v => v1 => a => $8.alt(v(a))(v1(a)), Functor0: () => functorStar1$1};
  return {Applicative0: () => applicativeStar1, Plus1: () => ({empty: v => $7.empty, Alt0: () => altStar1})};
};
const monadPlusStar = dictMonadPlus => {
  const monadStar1 = monadStar(dictMonadPlus.Monad0());
  const alternativeStar1 = alternativeStar(dictMonadPlus.Alternative1());
  return {Monad0: () => monadStar1, Alternative1: () => alternativeStar1};
};
export {
  Star,
  altStar,
  alternativeStar,
  applicativeStar,
  applyStar,
  bindStar,
  categoryStar,
  choiceStar,
  closedStar,
  distributiveStar,
  functorStar,
  hoistStar,
  invariantStar,
  monadPlusStar,
  monadStar,
  newtypeStar,
  plusStar,
  profunctorStar,
  semigroupoidStar,
  strongStar
};
