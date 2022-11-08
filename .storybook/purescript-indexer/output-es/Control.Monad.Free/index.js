import * as $runtime from "../runtime.js";
import * as Control$dBind from "../Control.Bind/index.js";
import * as Control$dMonad$dRec$dClass from "../Control.Monad.Rec.Class/index.js";
import * as Data$dCatList from "../Data.CatList/index.js";
import * as Data$dCatQueue from "../Data.CatQueue/index.js";
import * as Data$dEither from "../Data.Either/index.js";
import * as Data$dList$dTypes from "../Data.List.Types/index.js";
import * as Data$dOrdering from "../Data.Ordering/index.js";
import * as Unsafe$dCoerce from "../Unsafe.Coerce/index.js";
const $Free = (_1, _2) => ({tag: "Free", _1, _2});
const $FreeView = (tag, _1, _2) => ({tag, _1, _2});
const identity = x => x;
const Free = value0 => value1 => $Free(value0, value1);
const Return = value0 => $FreeView("Return", value0);
const Bind = value0 => value1 => $FreeView("Bind", value0, value1);
const toView = toView$a0$copy => {
  let toView$a0 = toView$a0$copy, toView$c = true, toView$r;
  while (toView$c) {
    const v = toView$a0;
    if (v._1.tag === "Return") {
      const v2 = Data$dCatList.uncons(v._2);
      if (v2.tag === "Nothing") {
        toView$c = false;
        toView$r = $FreeView("Return", v._1._1);
        continue;
      }
      if (v2.tag === "Just") {
        toView$a0 = (() => {
          const $2 = v2._1._1(v._1._1);
          return $Free($2._1, Data$dCatList.link($2._2)(v2._1._2));
        })();
        continue;
      }
      $runtime.fail();
    }
    if (v._1.tag === "Bind") {
      toView$c = false;
      toView$r = $FreeView(
        "Bind",
        v._1._1,
        a => {
          const $2 = v._1._2(a);
          return $Free($2._1, Data$dCatList.link($2._2)(v._2));
        }
      );
      continue;
    }
    $runtime.fail();
  };
  return toView$r;
};
const runFreeM = dictFunctor => dictMonadRec => {
  const Monad0 = dictMonadRec.Monad0();
  const map2 = Monad0.Bind1().Apply0().Functor0().map;
  const pure1 = Monad0.Applicative0().pure;
  return k => dictMonadRec.tailRecM(f => {
    const v = toView(f);
    if (v.tag === "Return") { return map2(Control$dMonad$dRec$dClass.Done)(pure1(v._1)); }
    if (v.tag === "Bind") { return map2(Control$dMonad$dRec$dClass.Loop)(k(dictFunctor.map(v._2)(v._1))); }
    $runtime.fail();
  });
};
const runFree = dictFunctor => k => {
  const go = go$a0$copy => {
    let go$a0 = go$a0$copy, go$c = true, go$r;
    while (go$c) {
      const f = go$a0;
      const v = toView(f);
      if (v.tag === "Return") {
        go$c = false;
        go$r = v._1;
        continue;
      }
      if (v.tag === "Bind") {
        go$a0 = k(dictFunctor.map(v._2)(v._1));
        continue;
      }
      $runtime.fail();
    };
    return go$r;
  };
  return go;
};
const resume$p = k => j => f => {
  const v = toView(f);
  if (v.tag === "Return") { return j(v._1); }
  if (v.tag === "Bind") { return k(v._1)(v._2); }
  $runtime.fail();
};
const resume = dictFunctor => resume$p(g => i => Data$dEither.$Either("Left", dictFunctor.map(i)(g)))(Data$dEither.Right);
const wrap = f => $Free($FreeView("Bind", f, Unsafe$dCoerce.unsafeCoerce), Data$dCatList.CatNil);
const suspendF = dictApplicative => f => $Free($FreeView("Bind", dictApplicative.pure(f), Unsafe$dCoerce.unsafeCoerce), Data$dCatList.CatNil);
const freeMonad = {Applicative0: () => freeApplicative, Bind1: () => freeBind};
const freeFunctor = {map: k => f => freeBind.bind(f)(x => freeApplicative.pure(k(x)))};
const freeBind = {
  bind: v => k => $Free(v._1, Data$dCatList.link(v._2)(Data$dCatList.$CatList("CatCons", k, Data$dCatQueue.$CatQueue(Data$dList$dTypes.Nil, Data$dList$dTypes.Nil)))),
  Apply0: () => freeApply
};
const freeApply = {
  apply: f => a => $Free(
    f._1,
    Data$dCatList.link(f._2)(Data$dCatList.$CatList(
      "CatCons",
      f$p => $Free(
        a._1,
        Data$dCatList.link(a._2)(Data$dCatList.$CatList("CatCons", a$p => freeApplicative.pure(f$p(a$p)), Data$dCatQueue.$CatQueue(Data$dList$dTypes.Nil, Data$dList$dTypes.Nil)))
      ),
      Data$dCatQueue.$CatQueue(Data$dList$dTypes.Nil, Data$dList$dTypes.Nil)
    ))
  ),
  Functor0: () => freeFunctor
};
const freeApplicative = {pure: x => $Free($FreeView("Return", x), Data$dCatList.CatNil), Apply0: () => freeApply};
const semigroupFree = dictSemigroup => (
  {
    append: a => b => freeApply.apply($Free(
      a._1,
      Data$dCatList.link(a._2)(Data$dCatList.$CatList(
        "CatCons",
        x => $Free($FreeView("Return", dictSemigroup.append(x)), Data$dCatList.CatNil),
        Data$dCatQueue.$CatQueue(Data$dList$dTypes.Nil, Data$dList$dTypes.Nil)
      ))
    ))(b)
  }
);
const freeMonadRec = {
  tailRecM: k => a => {
    const $2 = k(a);
    return $Free(
      $2._1,
      Data$dCatList.link($2._2)(Data$dCatList.$CatList(
        "CatCons",
        v => {
          if (v.tag === "Loop") { return freeMonadRec.tailRecM(k)(v._1); }
          if (v.tag === "Done") { return $Free($FreeView("Return", v._1), Data$dCatList.CatNil); }
          $runtime.fail();
        },
        Data$dCatQueue.$CatQueue(Data$dList$dTypes.Nil, Data$dList$dTypes.Nil)
      ))
    );
  },
  Monad0: () => freeMonad
};
const liftF = f => $Free($FreeView("Bind", f, x => $Free($FreeView("Return", x), Data$dCatList.CatNil)), Data$dCatList.CatNil);
const freeMonadTrans = {lift: dictMonad => liftF};
const monoidFree = dictMonoid => {
  const semigroupFree1 = semigroupFree(dictMonoid.Semigroup0());
  return {mempty: $Free($FreeView("Return", dictMonoid.mempty), Data$dCatList.CatNil), Semigroup0: () => semigroupFree1};
};
const substFree = k => {
  const go = f => {
    const v = toView(f);
    if (v.tag === "Return") { return $Free($FreeView("Return", v._1), Data$dCatList.CatNil); }
    if (v.tag === "Bind") {
      const $4 = k(v._1);
      return $Free($4._1, Data$dCatList.link($4._2)(Data$dCatList.$CatList("CatCons", x => go(v._2(x)), Data$dCatQueue.$CatQueue(Data$dList$dTypes.Nil, Data$dList$dTypes.Nil))));
    }
    $runtime.fail();
  };
  return go;
};
const hoistFree = k => substFree(x => $Free($FreeView("Bind", k(x), x$1 => $Free($FreeView("Return", x$1), Data$dCatList.CatNil)), Data$dCatList.CatNil));
const foldableFree = dictFunctor => dictFoldable => (
  {
    foldMap: dictMonoid => {
      const foldMap1 = dictFoldable.foldMap(dictMonoid);
      return f => {
        const go = x => {
          const $7 = resume$p(g => i => Data$dEither.$Either("Left", dictFunctor.map(i)(g)))(Data$dEither.Right)(x);
          if ($7.tag === "Left") { return foldMap1(go)($7._1); }
          if ($7.tag === "Right") { return f($7._1); }
          $runtime.fail();
        };
        return go;
      };
    },
    foldl: f => {
      const go = r => x => {
        const $6 = resume$p(g => i => Data$dEither.$Either("Left", dictFunctor.map(i)(g)))(Data$dEither.Right)(x);
        if ($6.tag === "Left") { return dictFoldable.foldl(go)(r)($6._1); }
        if ($6.tag === "Right") { return f(r)($6._1); }
        $runtime.fail();
      };
      return go;
    },
    foldr: f => {
      const go = r => x => {
        const $6 = resume$p(g => i => Data$dEither.$Either("Left", dictFunctor.map(i)(g)))(Data$dEither.Right)(x);
        if ($6.tag === "Left") { return dictFoldable.foldr(b => a => go(a)(b))(r)($6._1); }
        if ($6.tag === "Right") { return f($6._1)(r); }
        $runtime.fail();
      };
      return go;
    }
  }
);
const traversableFree = dictTraversable => {
  const Functor0 = dictTraversable.Functor0();
  const foldableFree1 = foldableFree(Functor0)(dictTraversable.Foldable1());
  return {
    traverse: dictApplicative => {
      const map1 = dictApplicative.Apply0().Functor0().map;
      const traverse1 = dictTraversable.traverse(dictApplicative);
      return f => {
        const go = x => {
          const $9 = resume$p(g => i => Data$dEither.$Either("Left", Functor0.map(i)(g)))(Data$dEither.Right)(x);
          if ($9.tag === "Left") {
            return map1(x$1 => $Free(
              $FreeView("Bind", x$1, x$2 => $Free($FreeView("Return", x$2), Data$dCatList.CatNil)),
              Data$dCatList.link(Data$dCatList.CatNil)(Data$dCatList.$CatList(
                "CatCons",
                Control$dBind.identity,
                Data$dCatQueue.$CatQueue(Data$dList$dTypes.Nil, Data$dList$dTypes.Nil)
              ))
            ))(traverse1(go)($9._1));
          }
          if ($9.tag === "Right") { return map1(freeApplicative.pure)(f($9._1)); }
          $runtime.fail();
        };
        return go;
      };
    },
    sequence: dictApplicative => tma => traversableFree(dictTraversable).traverse(dictApplicative)(identity)(tma),
    Functor0: () => freeFunctor,
    Foldable1: () => foldableFree1
  };
};
const foldFree = dictMonadRec => {
  const Monad0 = dictMonadRec.Monad0();
  const map1 = Monad0.Bind1().Apply0().Functor0().map;
  const pure1 = Monad0.Applicative0().pure;
  return k => dictMonadRec.tailRecM(f => {
    const v = toView(f);
    if (v.tag === "Return") { return map1(Control$dMonad$dRec$dClass.Done)(pure1(v._1)); }
    if (v.tag === "Bind") { return map1(x => Control$dMonad$dRec$dClass.$Step("Loop", v._2(x)))(k(v._1)); }
    $runtime.fail();
  });
};
const eqFree = dictFunctor => dictEq1 => dictEq => (
  {
    eq: x => y => {
      const v = resume$p(g => i => Data$dEither.$Either("Left", dictFunctor.map(i)(g)))(Data$dEither.Right)(y);
      const v1 = resume$p(g => i => Data$dEither.$Either("Left", dictFunctor.map(i)(g)))(Data$dEither.Right)(x);
      if (v1.tag === "Left") {
        if (v.tag === "Left") { return dictEq1.eq1(eqFree(dictFunctor)(dictEq1)(dictEq))(v1._1)(v._1); }
        return false;
      }
      if (v1.tag === "Right") {
        if (v.tag === "Right") { return dictEq.eq(v1._1)(v._1); }
        return false;
      }
      return false;
    }
  }
);
const ordFree = dictFunctor => dictOrd1 => {
  const eqFree2 = eqFree(dictFunctor)(dictOrd1.Eq10());
  return dictOrd => {
    const eqFree3 = eqFree2(dictOrd.Eq0());
    return {
      compare: x => y => {
        const v = resume$p(g => i => Data$dEither.$Either("Left", dictFunctor.map(i)(g)))(Data$dEither.Right)(y);
        const v1 = resume$p(g => i => Data$dEither.$Either("Left", dictFunctor.map(i)(g)))(Data$dEither.Right)(x);
        if (v1.tag === "Left") {
          if (v.tag === "Left") { return dictOrd1.compare1(ordFree(dictFunctor)(dictOrd1)(dictOrd))(v1._1)(v._1); }
          return Data$dOrdering.LT;
        }
        if (v.tag === "Left") { return Data$dOrdering.GT; }
        if (v1.tag === "Right") {
          if (v.tag === "Right") { return dictOrd.compare(v1._1)(v._1); }
          $runtime.fail();
        }
        $runtime.fail();
      },
      Eq0: () => eqFree3
    };
  };
};
const eq1Free = dictFunctor => dictEq1 => ({eq1: dictEq => eqFree(dictFunctor)(dictEq1)(dictEq).eq});
const ord1Free = dictFunctor => dictOrd1 => {
  const ordFree2 = ordFree(dictFunctor)(dictOrd1);
  const $3 = dictOrd1.Eq10();
  const eq1Free2 = {eq1: dictEq => eqFree(dictFunctor)($3)(dictEq).eq};
  return {compare1: dictOrd => ordFree2(dictOrd).compare, Eq10: () => eq1Free2};
};
export {
  $Free,
  $FreeView,
  Bind,
  Free,
  Return,
  eq1Free,
  eqFree,
  foldFree,
  foldableFree,
  freeApplicative,
  freeApply,
  freeBind,
  freeFunctor,
  freeMonad,
  freeMonadRec,
  freeMonadTrans,
  hoistFree,
  identity,
  liftF,
  monoidFree,
  ord1Free,
  ordFree,
  resume,
  resume$p,
  runFree,
  runFreeM,
  semigroupFree,
  substFree,
  suspendF,
  toView,
  traversableFree,
  wrap
};
