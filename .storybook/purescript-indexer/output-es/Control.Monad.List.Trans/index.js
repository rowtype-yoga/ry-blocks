// | This module defines the list monad transformer, `ListT`.
import * as $runtime from "../runtime.js";
import * as Control$dMonad$dRec$dClass from "../Control.Monad.Rec.Class/index.js";
import * as Data$dLazy from "../Data.Lazy/index.js";
import * as Data$dMaybe from "../Data.Maybe/index.js";
import * as Data$dTuple from "../Data.Tuple/index.js";
import * as Data$dUnit from "../Data.Unit/index.js";
const $Step = (tag, _1, _2) => ({tag, _1, _2});
const identity = x => x;
const Yield = value0 => value1 => $Step("Yield", value0, value1);
const Skip = value0 => $Step("Skip", value0);
const Done = /* #__PURE__ */ $Step("Done");
const ListT = x => x;
const wrapLazy = dictApplicative => v => dictApplicative.pure($Step("Skip", v));
const wrapEffect = dictFunctor => v => dictFunctor.map(x => $Step("Skip", Data$dLazy.defer(v$1 => x)))(v);
const unfold = dictMonad => {
  const map2 = dictMonad.Bind1().Apply0().Functor0().map;
  return f => z => map2(v => {
    if (v.tag === "Just") { return $Step("Yield", v._1._2, Data$dLazy.defer(v1 => unfold(dictMonad)(f)(v._1._1))); }
    if (v.tag === "Nothing") { return Done; }
    $runtime.fail();
  })(f(z));
};
const uncons = dictMonad => {
  const pure1 = dictMonad.Applicative0().pure;
  const bind = dictMonad.Bind1().bind;
  return v => bind(v)(v1 => {
    if (v1.tag === "Yield") { return pure1(Data$dMaybe.$Maybe("Just", Data$dTuple.$Tuple(v1._1, Data$dLazy.force(v1._2)))); }
    if (v1.tag === "Skip") { return uncons(dictMonad)(Data$dLazy.force(v1._1)); }
    if (v1.tag === "Done") { return pure1(Data$dMaybe.Nothing); }
    $runtime.fail();
  });
};
const tail = dictMonad => {
  const map2 = dictMonad.Bind1().Apply0().Functor0().map;
  const uncons1 = uncons(dictMonad);
  return l => map2(Data$dMaybe.functorMaybe.map(Data$dTuple.snd))(uncons1(l));
};
const takeWhile = dictApplicative => {
  const $1 = dictApplicative.Apply0().Functor0();
  return f => v => $1.map(v$1 => {
    if (v$1.tag === "Yield") {
      if (f(v$1._1)) {
        return $Step(
          "Yield",
          v$1._1,
          (() => {
            const $5 = takeWhile(dictApplicative)(f);
            return Data$dLazy.defer(v$2 => $5(Data$dLazy.force(v$1._2)));
          })()
        );
      }
      return Done;
    }
    if (v$1.tag === "Skip") {
      return $Step(
        "Skip",
        (() => {
          const $5 = takeWhile(dictApplicative)(f);
          return Data$dLazy.defer(v$2 => $5(Data$dLazy.force(v$1._1)));
        })()
      );
    }
    if (v$1.tag === "Done") { return Done; }
    $runtime.fail();
  })(v);
};
const scanl = dictMonad => {
  const map2 = dictMonad.Bind1().Apply0().Functor0().map;
  const unfold1 = unfold(dictMonad);
  return f => b => l => unfold1(v => map2(v1 => {
    if (v1.tag === "Yield") { return Data$dMaybe.$Maybe("Just", Data$dTuple.$Tuple(Data$dTuple.$Tuple(f(v._1)(v1._1), Data$dLazy.force(v1._2)), v._1)); }
    if (v1.tag === "Skip") { return Data$dMaybe.$Maybe("Just", Data$dTuple.$Tuple(Data$dTuple.$Tuple(v._1, Data$dLazy.force(v1._1)), v._1)); }
    if (v1.tag === "Done") { return Data$dMaybe.Nothing; }
    $runtime.fail();
  })(v._2))(Data$dTuple.$Tuple(b, l));
};
const prepend$p = dictApplicative => h => t => dictApplicative.pure($Step("Yield", h, t));
const prepend = dictApplicative => h => t => dictApplicative.pure($Step("Yield", h, Data$dLazy.defer(v => t)));
const nil = dictApplicative => dictApplicative.pure(Done);
const singleton = dictApplicative => {
  const nil1 = dictApplicative.pure(Done);
  return a => dictApplicative.pure($Step("Yield", a, Data$dLazy.defer(v => nil1)));
};
const take = dictApplicative => {
  const nil1 = dictApplicative.pure(Done);
  const $2 = dictApplicative.Apply0().Functor0();
  return v => v1 => {
    if (v === 0) { return nil1; }
    return $2.map(v2 => {
      if (v2.tag === "Yield") {
        return $Step(
          "Yield",
          v2._1,
          (() => {
            const $6 = take(dictApplicative)(v - 1 | 0);
            return Data$dLazy.defer(v$1 => $6(Data$dLazy.force(v2._2)));
          })()
        );
      }
      if (v2.tag === "Skip") {
        return $Step(
          "Skip",
          (() => {
            const $6 = take(dictApplicative)(v);
            return Data$dLazy.defer(v$1 => $6(Data$dLazy.force(v2._1)));
          })()
        );
      }
      if (v2.tag === "Done") { return Done; }
      $runtime.fail();
    })(v1);
  };
};
const zipWith$p = dictMonad => {
  const Applicative0 = dictMonad.Applicative0();
  const nil1 = Applicative0.pure(Done);
  const Bind1 = dictMonad.Bind1();
  const Functor0 = Bind1.Apply0().Functor0();
  const uncons1 = uncons(dictMonad);
  return f => fa => fb => Functor0.map(x => $Step("Skip", Data$dLazy.defer(v => x)))(Bind1.bind(uncons1(fa))(ua => Bind1.bind(uncons1(fb))(ub => {
    if (ub.tag === "Nothing") { return Applicative0.pure(nil1); }
    if (ua.tag === "Nothing") { return Applicative0.pure(nil1); }
    if (ua.tag === "Just") {
      if (ub.tag === "Just") {
        return Functor0.map((() => {
          const $11 = Data$dLazy.defer(v2 => zipWith$p(dictMonad)(f)(ua._1._2)(ub._1._2));
          return a => Applicative0.pure($Step("Yield", a, $11));
        })())(f(ua._1._1)(ub._1._1));
      }
      $runtime.fail();
    }
    $runtime.fail();
  })));
};
const zipWith = dictMonad => {
  const pure1 = dictMonad.Applicative0().pure;
  const zipWith$p1 = zipWith$p(dictMonad);
  return f => zipWith$p1(a => b => pure1(f(a)(b)));
};
const newtypeListT = {Coercible0: () => undefined};
const mapMaybe = dictFunctor => f => v => dictFunctor.map(v$1 => {
  if (v$1.tag === "Yield") {
    const $4 = f(v$1._1);
    if ($4.tag === "Just") {
      return $Step(
        "Yield",
        $4._1,
        (() => {
          const $5 = mapMaybe(dictFunctor)(f);
          return Data$dLazy.defer(v$2 => $5(Data$dLazy.force(v$1._2)));
        })()
      );
    }
    return $Step(
      "Skip",
      (() => {
        const $5 = mapMaybe(dictFunctor)(f);
        return Data$dLazy.defer(v$2 => $5(Data$dLazy.force(v$1._2)));
      })()
    );
  }
  if (v$1.tag === "Skip") {
    return $Step(
      "Skip",
      (() => {
        const $4 = mapMaybe(dictFunctor)(f);
        return Data$dLazy.defer(v$2 => $4(Data$dLazy.force(v$1._1)));
      })()
    );
  }
  if (v$1.tag === "Done") { return Done; }
  $runtime.fail();
})(v);
const iterate = dictMonad => {
  const pure1 = dictMonad.Applicative0().pure;
  const unfold1 = unfold(dictMonad);
  return f => a => unfold1(x => pure1(Data$dMaybe.$Maybe("Just", Data$dTuple.$Tuple(f(x), x))))(a);
};
const repeat = dictMonad => iterate(dictMonad)(identity);
const head = dictMonad => {
  const map2 = dictMonad.Bind1().Apply0().Functor0().map;
  const uncons1 = uncons(dictMonad);
  return l => map2(Data$dMaybe.functorMaybe.map(Data$dTuple.fst))(uncons1(l));
};
const functorListT = dictFunctor => (
  {
    map: f => v => dictFunctor.map(v$1 => {
      if (v$1.tag === "Yield") {
        return $Step(
          "Yield",
          f(v$1._1),
          (() => {
            const $4 = functorListT(dictFunctor).map(f);
            return Data$dLazy.defer(v$2 => $4(Data$dLazy.force(v$1._2)));
          })()
        );
      }
      if (v$1.tag === "Skip") {
        return $Step(
          "Skip",
          (() => {
            const $4 = functorListT(dictFunctor).map(f);
            return Data$dLazy.defer(v$2 => $4(Data$dLazy.force(v$1._1)));
          })()
        );
      }
      if (v$1.tag === "Done") { return Done; }
      $runtime.fail();
    })(v)
  }
);
const fromEffect = dictApplicative => {
  const map2 = dictApplicative.Apply0().Functor0().map;
  const nil1 = dictApplicative.pure(Done);
  return fa => map2((() => {
    const $4 = Data$dLazy.defer(v => nil1);
    return a => $Step("Yield", a, $4);
  })())(fa);
};
const monadTransListT = {lift: dictMonad => fromEffect(dictMonad.Applicative0())};
const foldlRec$p = dictMonadRec => {
  const Monad0 = dictMonadRec.Monad0();
  const pure1 = Monad0.Applicative0().pure;
  const bind = Monad0.Bind1().bind;
  const uncons1 = uncons(Monad0);
  return f => a => b => dictMonadRec.tailRecM(o => bind(uncons1(o.b))(v => {
    if (v.tag === "Nothing") { return pure1(Control$dMonad$dRec$dClass.$Step("Done", o.a)); }
    if (v.tag === "Just") { return bind(f(o.a)(v._1._1))(b$p => pure1(Control$dMonad$dRec$dClass.$Step("Loop", {a: b$p, b: v._1._2}))); }
    $runtime.fail();
  }))({a: a, b: b});
};
const runListTRec = dictMonadRec => {
  const pure1 = dictMonadRec.Monad0().Applicative0().pure;
  return foldlRec$p(dictMonadRec)(v => v1 => pure1(Data$dUnit.unit))(Data$dUnit.unit);
};
const foldlRec = dictMonadRec => {
  const Monad0 = dictMonadRec.Monad0();
  const pure1 = Monad0.Applicative0().pure;
  const bind = Monad0.Bind1().bind;
  const uncons1 = uncons(Monad0);
  return f => a => b => dictMonadRec.tailRecM(o => bind(uncons1(o.b))(v => {
    if (v.tag === "Nothing") { return pure1(Control$dMonad$dRec$dClass.$Step("Done", o.a)); }
    if (v.tag === "Just") { return pure1(Control$dMonad$dRec$dClass.$Step("Loop", {a: f(o.a)(v._1._1), b: v._1._2})); }
    $runtime.fail();
  }))({a: a, b: b});
};
const foldl$p = dictMonad => {
  const pure1 = dictMonad.Applicative0().pure;
  const bind = dictMonad.Bind1().bind;
  const uncons1 = uncons(dictMonad);
  return f => {
    const loop = b => l => bind(uncons1(l))(v => {
      if (v.tag === "Nothing") { return pure1(b); }
      if (v.tag === "Just") { return bind(f(b)(v._1._1))(a => loop(a)(v._1._2)); }
      $runtime.fail();
    });
    return loop;
  };
};
const runListT = dictMonad => {
  const pure1 = dictMonad.Applicative0().pure;
  return foldl$p(dictMonad)(v => v1 => pure1(Data$dUnit.unit))(Data$dUnit.unit);
};
const foldl = dictMonad => {
  const pure1 = dictMonad.Applicative0().pure;
  const bind = dictMonad.Bind1().bind;
  const uncons1 = uncons(dictMonad);
  return f => {
    const loop = b => l => bind(uncons1(l))(v => {
      if (v.tag === "Nothing") { return pure1(b); }
      if (v.tag === "Just") { return loop(f(b)(v._1._1))(v._1._2); }
      $runtime.fail();
    });
    return loop;
  };
};
const filter = dictFunctor => f => v => dictFunctor.map(v$1 => {
  if (v$1.tag === "Yield") {
    const $4 = filter(dictFunctor)(f);
    const s$p = Data$dLazy.defer(v$2 => $4(Data$dLazy.force(v$1._2)));
    if (f(v$1._1)) { return $Step("Yield", v$1._1, s$p); }
    return $Step("Skip", s$p);
  }
  if (v$1.tag === "Skip") {
    return $Step(
      "Skip",
      (() => {
        const $4 = filter(dictFunctor)(f);
        return Data$dLazy.defer(v$2 => $4(Data$dLazy.force(v$1._1)));
      })()
    );
  }
  if (v$1.tag === "Done") { return Done; }
  $runtime.fail();
})(v);
const dropWhile = dictApplicative => {
  const $1 = dictApplicative.Apply0().Functor0();
  return f => v => $1.map(v$1 => {
    if (v$1.tag === "Yield") {
      if (f(v$1._1)) {
        return $Step(
          "Skip",
          (() => {
            const $5 = dropWhile(dictApplicative)(f);
            return Data$dLazy.defer(v$2 => $5(Data$dLazy.force(v$1._2)));
          })()
        );
      }
      return $Step("Yield", v$1._1, v$1._2);
    }
    if (v$1.tag === "Skip") {
      return $Step(
        "Skip",
        (() => {
          const $5 = dropWhile(dictApplicative)(f);
          return Data$dLazy.defer(v$2 => $5(Data$dLazy.force(v$1._1)));
        })()
      );
    }
    if (v$1.tag === "Done") { return Done; }
    $runtime.fail();
  })(v);
};
const drop = dictApplicative => {
  const $1 = dictApplicative.Apply0().Functor0();
  return v => v1 => {
    if (v === 0) { return v1; }
    return $1.map(v2 => {
      if (v2.tag === "Yield") {
        return $Step(
          "Skip",
          (() => {
            const $5 = drop(dictApplicative)(v - 1 | 0);
            return Data$dLazy.defer(v$1 => $5(Data$dLazy.force(v2._2)));
          })()
        );
      }
      if (v2.tag === "Skip") {
        return $Step(
          "Skip",
          (() => {
            const $5 = drop(dictApplicative)(v);
            return Data$dLazy.defer(v$1 => $5(Data$dLazy.force(v2._1)));
          })()
        );
      }
      if (v2.tag === "Done") { return Done; }
      $runtime.fail();
    })(v1);
  };
};
const cons = dictApplicative => lh => t => dictApplicative.pure($Step("Yield", Data$dLazy.force(lh), t));
const unfoldable1ListT = dictMonad => {
  const Applicative0 = dictMonad.Applicative0();
  const singleton1 = singleton(Applicative0);
  return {
    unfoldr1: f => b => {
      const go = v => {
        if (v._2.tag === "Nothing") { return singleton1(v._1); }
        if (v._2.tag === "Just") { return Applicative0.pure($Step("Yield", Data$dLazy.force(Data$dLazy.defer(v$1 => v._1)), Data$dLazy.defer(v1 => go(f(v._2._1))))); }
        $runtime.fail();
      };
      return go(f(b));
    }
  };
};
const unfoldableListT = dictMonad => {
  const Applicative0 = dictMonad.Applicative0();
  const nil1 = Applicative0.pure(Done);
  const unfoldable1ListT1 = unfoldable1ListT(dictMonad);
  return {
    unfoldr: f => b => {
      const go = v => {
        if (v.tag === "Nothing") { return nil1; }
        if (v.tag === "Just") { return Applicative0.pure($Step("Yield", Data$dLazy.force(Data$dLazy.defer(v$1 => v._1._1)), Data$dLazy.defer(v1 => go(f(v._1._2))))); }
        $runtime.fail();
      };
      return go(f(b));
    },
    Unfoldable10: () => unfoldable1ListT1
  };
};
const semigroupListT = dictApplicative => ({append: concat(dictApplicative)});
const concat = dictApplicative => {
  const $1 = dictApplicative.Apply0().Functor0();
  return x => y => $1.map(v => {
    if (v.tag === "Yield") { return $Step("Yield", v._1, Data$dLazy.defer(v$1 => concat(dictApplicative)(Data$dLazy.force(v._2))(y))); }
    if (v.tag === "Skip") { return $Step("Skip", Data$dLazy.defer(v$1 => concat(dictApplicative)(Data$dLazy.force(v._1))(y))); }
    if (v.tag === "Done") { return $Step("Skip", Data$dLazy.defer(v$1 => y)); }
    $runtime.fail();
  })(x);
};
const monoidListT = dictApplicative => {
  const semigroupListT1 = {append: concat(dictApplicative)};
  return {mempty: dictApplicative.pure(Done), Semigroup0: () => semigroupListT1};
};
const catMaybes = dictFunctor => mapMaybe(dictFunctor)(identity);
const monadListT = dictMonad => ({Applicative0: () => applicativeListT(dictMonad), Bind1: () => bindListT(dictMonad)});
const bindListT = dictMonad => {
  const append = concat(dictMonad.Applicative0());
  const $2 = dictMonad.Bind1().Apply0().Functor0();
  return {
    bind: fa => f => $2.map(v => {
      if (v.tag === "Yield") { return $Step("Skip", Data$dLazy.defer(v$1 => append(f(v._1))(bindListT(dictMonad).bind(Data$dLazy.force(v._2))(f)))); }
      if (v.tag === "Skip") { return $Step("Skip", Data$dLazy.defer(v$1 => bindListT(dictMonad).bind(Data$dLazy.force(v._1))(f))); }
      if (v.tag === "Done") { return Done; }
      $runtime.fail();
    })(fa),
    Apply0: () => applyListT(dictMonad)
  };
};
const applyListT = dictMonad => {
  const functorListT1 = functorListT(dictMonad.Bind1().Apply0().Functor0());
  return {
    apply: (() => {
      const bind = bindListT(dictMonad).bind;
      const pure = applicativeListT(dictMonad).pure;
      return f => a => bind(f)(f$p => bind(a)(a$p => pure(f$p(a$p))));
    })(),
    Functor0: () => functorListT1
  };
};
const applicativeListT = dictMonad => ({pure: singleton(dictMonad.Applicative0()), Apply0: () => applyListT(dictMonad)});
const monadEffectListT = dictMonadEffect => {
  const Monad0 = dictMonadEffect.Monad0();
  const monadListT1 = {Applicative0: () => ({pure: singleton(Monad0.Applicative0()), Apply0: () => applyListT(Monad0)}), Bind1: () => bindListT(Monad0)};
  return {
    liftEffect: (() => {
      const $3 = fromEffect(Monad0.Applicative0());
      return x => $3(dictMonadEffect.liftEffect(x));
    })(),
    Monad0: () => monadListT1
  };
};
const altListT = dictApplicative => {
  const functorListT1 = functorListT(dictApplicative.Apply0().Functor0());
  return {alt: concat(dictApplicative), Functor0: () => functorListT1};
};
const plusListT = dictMonad => {
  const Applicative0 = dictMonad.Applicative0();
  const altListT1 = altListT(Applicative0);
  return {empty: Applicative0.pure(Done), Alt0: () => altListT1};
};
const alternativeListT = dictMonad => {
  const applicativeListT1 = {pure: singleton(dictMonad.Applicative0()), Apply0: () => applyListT(dictMonad)};
  const plusListT1 = plusListT(dictMonad);
  return {Applicative0: () => applicativeListT1, Plus1: () => plusListT1};
};
const monadPlusListT = dictMonad => {
  const monadListT1 = {Applicative0: () => ({pure: singleton(dictMonad.Applicative0()), Apply0: () => applyListT(dictMonad)}), Bind1: () => bindListT(dictMonad)};
  const alternativeListT1 = alternativeListT(dictMonad);
  return {Monad0: () => monadListT1, Alternative1: () => alternativeListT1};
};
export {
  $Step,
  Done,
  ListT,
  Skip,
  Yield,
  altListT,
  alternativeListT,
  applicativeListT,
  applyListT,
  bindListT,
  catMaybes,
  concat,
  cons,
  drop,
  dropWhile,
  filter,
  foldl,
  foldl$p,
  foldlRec,
  foldlRec$p,
  fromEffect,
  functorListT,
  head,
  identity,
  iterate,
  mapMaybe,
  monadEffectListT,
  monadListT,
  monadPlusListT,
  monadTransListT,
  monoidListT,
  newtypeListT,
  nil,
  plusListT,
  prepend,
  prepend$p,
  repeat,
  runListT,
  runListTRec,
  scanl,
  semigroupListT,
  singleton,
  tail,
  take,
  takeWhile,
  uncons,
  unfold,
  unfoldable1ListT,
  unfoldableListT,
  wrapEffect,
  wrapLazy,
  zipWith,
  zipWith$p
};
