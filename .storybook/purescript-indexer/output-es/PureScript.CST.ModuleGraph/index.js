import * as $runtime from "../runtime.js";
import * as Control$dBind from "../Control.Bind/index.js";
import * as Data$dArray from "../Data.Array/index.js";
import * as Data$dEither from "../Data.Either/index.js";
import * as Data$dFoldable from "../Data.Foldable/index.js";
import * as Data$dFunctor from "../Data.Functor/index.js";
import * as Data$dList from "../Data.List/index.js";
import * as Data$dList$dTypes from "../Data.List.Types/index.js";
import * as Data$dMap$dInternal from "../Data.Map.Internal/index.js";
import * as Data$dMaybe from "../Data.Maybe/index.js";
import * as Data$dOrd from "../Data.Ord/index.js";
import * as Data$dSemigroup from "../Data.Semigroup/index.js";
import * as Data$dSemiring from "../Data.Semiring/index.js";
import * as Data$dSet from "../Data.Set/index.js";
import * as Data$dTuple from "../Data.Tuple/index.js";
import * as Data$dUnfoldable from "../Data.Unfoldable/index.js";
import * as Data$dUnit from "../Data.Unit/index.js";
const $ModuleSort = (tag, _1) => ({tag, _1});
const toUnfoldable1 = /* #__PURE__ */ Data$dSet.toUnfoldable(Data$dUnfoldable.unfoldableArray);
const all = /* #__PURE__ */ (() => Data$dMap$dInternal.foldableMap.foldMap((() => {
  const semigroupConj1 = {append: v => v1 => v && v1};
  return {mempty: true, Semigroup0: () => semigroupConj1};
})()))();
const fromFoldable = /* #__PURE__ */ Data$dFoldable.foldlArray(m => a => Data$dMap$dInternal.insert(Data$dOrd.ordString)(a)(Data$dUnit.unit)(m))(Data$dMap$dInternal.Leaf);
const fromFoldable1 = /* #__PURE__ */ Data$dMap$dInternal.fromFoldable(Data$dOrd.ordString)(Data$dFoldable.foldableArray);
const toUnfoldable2 = /* #__PURE__ */ Data$dList.toUnfoldable(Data$dUnfoldable.unfoldableArray);
const Sorted = value0 => $ModuleSort("Sorted", value0);
const CycleDetected = value0 => $ModuleSort("CycleDetected", value0);
const topoSort = dictOrd => {
  const filterWithKey = Data$dMap$dInternal.filterWithKey(dictOrd);
  return graph => {
    const importCounts = Data$dMap$dInternal.fromFoldableWith(dictOrd)(Data$dFoldable.foldableArray)(Data$dSemiring.intAdd)(Control$dBind.arrayBind(Data$dMap$dInternal.toUnfoldable(Data$dUnfoldable.unfoldableArray)(graph))(v => Data$dSemigroup.concatArray([
      Data$dTuple.$Tuple(v._1, 0)
    ])(Data$dFunctor.arrayMap(a => Data$dTuple.$Tuple(a, 1))(toUnfoldable1(v._2)))));
    const depthFirst = v => {
      if (
        (() => {
          const $6 = Data$dMap$dInternal.lookup(dictOrd)(v.curr)(v.visited);
          if ($6.tag === "Nothing") { return false; }
          if ($6.tag === "Just") { return true; }
          $runtime.fail();
        })()
      ) {
        return Data$dMaybe.$Maybe("Just", Data$dList$dTypes.$List("Cons", v.curr, v.path));
      }
      if (
        (() => {
          const $6 = Data$dMap$dInternal.lookup(dictOrd)(v.curr)(graph);
          if ($6.tag === "Nothing") { return true; }
          if ($6.tag === "Just") { return $6._1.tag === "Leaf"; }
          $runtime.fail();
        })()
      ) {
        return Data$dMaybe.Nothing;
      }
      const $6 = Data$dMap$dInternal.lookup(dictOrd)(v.curr)(graph);
      if ($6.tag === "Just") {
        return Data$dSet.foldableSet.foldl(b => a => {
          if (
            (() => {
              if (b.tag === "Nothing") { return false; }
              if (b.tag === "Just") { return true; }
              $runtime.fail();
            })()
          ) {
            return b;
          }
          return depthFirst({path: Data$dList$dTypes.$List("Cons", v.curr, v.path), visited: Data$dMap$dInternal.insert(dictOrd)(v.curr)(Data$dUnit.unit)(v.visited), curr: a});
        })(Data$dMaybe.Nothing)($6._1);
      }
      if ($6.tag === "Nothing") { return Data$dMaybe.Nothing; }
      $runtime.fail();
    };
    const go = go$a0$copy => {
      let go$a0 = go$a0$copy, go$c = true, go$r;
      while (go$c) {
        const v = go$a0;
        const $7 = Data$dMap$dInternal.findMin(v.roots);
        const v1 = (() => {
          if ($7.tag === "Just") { return Data$dMaybe.$Maybe("Just", $7._1.key); }
          return Data$dMaybe.Nothing;
        })();
        if (v1.tag === "Nothing") {
          if (all($9 => 0 === $9)(v.usages)) {
            go$c = false;
            go$r = Data$dEither.$Either("Right", {roots: v.roots, sorted: v.sorted, usages: v.usages});
            continue;
          }
          const detectCycles = Data$dSet.foldableSet.foldl(b => a => {
            if (
              (() => {
                if (b.tag === "Nothing") { return false; }
                if (b.tag === "Just") { return true; }
                $runtime.fail();
              })()
            ) {
              return b;
            }
            return depthFirst({path: Data$dList$dTypes.Nil, visited: Data$dMap$dInternal.Leaf, curr: a});
          })(Data$dMaybe.Nothing)(Data$dMap$dInternal.functorMap.map(v$1 => Data$dUnit.unit)(filterWithKey(a => count => {
            const $11 = Data$dMap$dInternal.lookup(dictOrd)(a)(graph);
            return count > 0 && (() => {
              if ($11.tag === "Nothing") { return false; }
              if ($11.tag === "Just") { return !($11._1.tag === "Leaf"); }
              $runtime.fail();
            })();
          })(v.usages)));
          if (detectCycles.tag === "Just") {
            go$c = false;
            go$r = Data$dEither.$Either("Left", detectCycles._1);
            continue;
          }
          if (detectCycles.tag === "Nothing") {
            go$c = false;
            go$r = Data$dEither.$Either("Left", Data$dList$dTypes.Nil);
            continue;
          }
          $runtime.fail();
        }
        if (v1.tag === "Just") {
          const $9 = Data$dMap$dInternal.lookup(dictOrd)(v1._1)(graph);
          const reachable = (() => {
            if ($9.tag === "Nothing") { return Data$dMap$dInternal.Leaf; }
            if ($9.tag === "Just") { return $9._1; }
            $runtime.fail();
          })();
          const usages$p = Data$dSet.foldableSet.foldl(usages => k => Data$dMap$dInternal.insertWith(dictOrd)(Data$dSemiring.intAdd)(k)(-1)(usages))(v.usages)(reachable);
          go$a0 = {
            roots: Data$dSet.foldableSet.foldl(roots => curr => {
              const $14 = Data$dMap$dInternal.lookup(dictOrd)(curr)(usages$p);
              if ($14.tag === "Just") {
                if ($14._1 === 0) { return Data$dMap$dInternal.insert(dictOrd)(curr)(Data$dUnit.unit)(roots); }
                return roots;
              }
              if ($14.tag === "Nothing") { return roots; }
              $runtime.fail();
            })(Data$dMap$dInternal.delete(dictOrd)(v1._1)(v.roots))(reachable),
            sorted: Data$dList$dTypes.$List("Cons", v1._1, v.sorted),
            usages: usages$p
          };
          continue;
        }
        $runtime.fail();
      };
      return go$r;
    };
    const $6 = go({
      roots: Data$dMap$dInternal.functorMap.map(v => Data$dUnit.unit)(filterWithKey(k => v => v === 0)(importCounts)),
      sorted: Data$dList$dTypes.Nil,
      usages: importCounts
    });
    if ($6.tag === "Left") { return Data$dEither.$Either("Left", $6._1); }
    if ($6.tag === "Right") { return Data$dEither.$Either("Right", $6._1.sorted); }
    $runtime.fail();
  };
};
const topoSort1 = /* #__PURE__ */ topoSort(Data$dOrd.ordString);
const moduleGraph = k => {
  const $1 = Data$dFunctor.arrayMap(x => {
    const $2 = k(x);
    return Data$dTuple.$Tuple($2.name.name, fromFoldable(Data$dFunctor.arrayMap(v => v.module.name)($2.imports)));
  });
  return x => fromFoldable1($1(x));
};
const sortModules = k => moduleHeaders => {
  const knownModuleHeaders = fromFoldable1(Data$dFunctor.arrayMap(a => Data$dTuple.$Tuple(k(a).name.name, a))(moduleHeaders));
  const v = topoSort1(moduleGraph(k)(moduleHeaders));
  if (v.tag === "Left") {
    return $ModuleSort("CycleDetected", Data$dArray.mapMaybe(a => Data$dMap$dInternal.lookup(Data$dOrd.ordString)(a)(knownModuleHeaders))(toUnfoldable2(v._1)));
  }
  if (v.tag === "Right") { return $ModuleSort("Sorted", Data$dArray.mapMaybe(a => Data$dMap$dInternal.lookup(Data$dOrd.ordString)(a)(knownModuleHeaders))(toUnfoldable2(v._1))); }
  $runtime.fail();
};
export {$ModuleSort, CycleDetected, Sorted, all, fromFoldable, fromFoldable1, moduleGraph, sortModules, toUnfoldable1, toUnfoldable2, topoSort, topoSort1};
