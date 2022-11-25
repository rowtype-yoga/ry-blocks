import * as $runtime from "../runtime.js";
import * as Data$dList$dTypes from "../Data.List.Types/index.js";
import * as Data$dShow from "../Data.Show/index.js";
import * as Data$dTraversable from "../Data.Traversable/index.js";
import * as Data$dVariant$dInternal from "../Data.Variant.Internal/index.js";
import * as Partial from "../Partial/index.js";
import * as Record$dUnsafe from "../Record.Unsafe/index.js";
import * as Type$dProxy from "../Type.Proxy/index.js";
import * as Unsafe$dCoerce from "../Unsafe.Coerce/index.js";
const UnvariantF = x => x;
const variantFShows = dict => dict.variantFShows;
const variantFMaps = dict => dict.variantFMaps;
const unvariantF = v => f => f({reflectSymbol: v$1 => v.type})()({map: v.map})(Type$dProxy.Proxy)(v.value);
const traverseVFRL = dict => dict.traverseVFRL;
const traverseSome = () => () => () => dictVariantTags => dictVariantFMaps => () => () => dictFunctor => r => k => v => {
  if (Record$dUnsafe.unsafeHas(v.type)(r)) {
    const map1 = Data$dVariant$dInternal.lookup("map")(v.type)(dictVariantTags.variantTags(Type$dProxy.Proxy))(dictVariantFMaps.variantFMaps(Type$dProxy.Proxy));
    return dictFunctor.map(value => ({type: v.type, map: map1, value: value}))(Record$dUnsafe.unsafeGet(v.type)(r)(v.value));
  }
  return k(v);
};
const traverse = () => () => () => dictVariantTags => dictVariantFMaps => () => () => dictApplicative => {
  const Functor0 = dictApplicative.Apply0().Functor0();
  return dictTraversable => {
    const traverse1 = dictTraversable.traverse(dictApplicative);
    return r => f => traverseSome()()()(dictVariantTags)(dictVariantFMaps)()()(Functor0)(r)((() => {
      const $13 = traverse1(f);
      const $14 = Functor0.map(Unsafe$dCoerce.unsafeCoerce);
      return x => $14($13(x));
    })());
  };
};
const showVariantFNil = {variantFShows: v => v1 => Data$dList$dTypes.Nil};
const showVariantFCons = dictVariantFShows => dictShow => dictShow1 => (
  {variantFShows: v => p => Data$dList$dTypes.$List("Cons", dictShow.show, dictVariantFShows.variantFShows(Type$dProxy.Proxy)(p))}
);
const showVariantF = () => dictVariantTags => dictVariantFShows => dictShow => (
  {
    show: v1 => "(inj @" + (
      Data$dShow.showStringImpl(v1.type) + (
        " " + (
          Data$dVariant$dInternal.lookup("show")(v1.type)(dictVariantTags.variantTags(Type$dProxy.Proxy))(dictVariantFShows.variantFShows(Type$dProxy.Proxy)(Type$dProxy.Proxy))(v1.value) + ")"
        )
      )
    )
  }
);
const overSome = () => () => () => dictVariantTags => dictVariantFMaps => () => () => r => k => v => {
  if (Record$dUnsafe.unsafeHas(v.type)(r)) {
    return {
      type: v.type,
      map: Data$dVariant$dInternal.lookup("map")(v.type)(dictVariantTags.variantTags(Type$dProxy.Proxy))(dictVariantFMaps.variantFMaps(Type$dProxy.Proxy)),
      value: Record$dUnsafe.unsafeGet(v.type)(r)(v.value)
    };
  }
  return k(v);
};
const onMatch = () => () => () => r => k => v => {
  if (Record$dUnsafe.unsafeHas(v.type)(r)) { return Record$dUnsafe.unsafeGet(v.type)(r)(v.value); }
  return k(v);
};
const on = () => dictIsSymbol => p => f => g => r => {
  if (r.type === dictIsSymbol.reflectSymbol(p)) { return f(r.value); }
  return g(r);
};
const prj = () => dictAlternative => {
  const pure = dictAlternative.Applicative0().pure;
  const empty = dictAlternative.Plus1().empty;
  return dictIsSymbol => p => r => {
    if (r.type === dictIsSymbol.reflectSymbol(p)) { return pure(r.value); }
    return empty;
  };
};
const mapVariantFNil = {variantFMaps: v => Data$dList$dTypes.Nil};
const mapVariantFCons = dictVariantFMaps => dictFunctor => ({variantFMaps: v => Data$dList$dTypes.$List("Cons", dictFunctor.map, dictVariantFMaps.variantFMaps(Type$dProxy.Proxy))});
const inj = () => dictIsSymbol => dictFunctor => p => value => ({type: dictIsSymbol.reflectSymbol(p), value: value, map: dictFunctor.map});
const overOne = () => () => dictIsSymbol => dictFunctor => p => f => g => r => {
  if (r.type === dictIsSymbol.reflectSymbol(p)) { return {type: dictIsSymbol.reflectSymbol(p), value: f(r.value), map: dictFunctor.map}; }
  return g(r);
};
const revariantF = v => v(dictIsSymbol => () => dictFunctor => p => value => ({type: dictIsSymbol.reflectSymbol(p), value: value, map: dictFunctor.map}));
const traverseOne = () => () => dictIsSymbol => dictFunctor => dictFunctor1 => p => f => {
  const $7 = dictFunctor1.map(value => ({type: dictIsSymbol.reflectSymbol(p), value: value, map: dictFunctor.map}));
  return g => r => {
    if (r.type === dictIsSymbol.reflectSymbol(p)) { return $7(f(r.value)); }
    return g(r);
  };
};
const functorVariantF = {map: f => a => ({type: a.type, value: a.map(f)(a.value), map: a.map})};
const over = () => () => () => dictVariantTags => dictVariantFMaps => () => () => r => f => overSome()()()(dictVariantTags)(dictVariantFMaps)()()(r)(x => (
  {type: x.type, value: x.map(f)(x.value), map: x.map}
));
const foldrVFRL = dict => dict.foldrVFRL;
const foldlVFRL = dict => dict.foldlVFRL;
const foldMapVFRL = dict => dict.foldMapVFRL;
const foldableCons = dictIsSymbol => dictFoldable => dictFoldableVFRL => () => (
  {
    foldrVFRL: v => f => b => {
      const $7 = dictFoldable.foldr(f)(b);
      const $8 = dictFoldableVFRL.foldrVFRL(Type$dProxy.Proxy)(f)(b);
      return r => {
        if (r.type === dictIsSymbol.reflectSymbol(Type$dProxy.Proxy)) { return $7(r.value); }
        return $8(r);
      };
    },
    foldlVFRL: v => f => b => {
      const $7 = dictFoldable.foldl(f)(b);
      const $8 = dictFoldableVFRL.foldlVFRL(Type$dProxy.Proxy)(f)(b);
      return r => {
        if (r.type === dictIsSymbol.reflectSymbol(Type$dProxy.Proxy)) { return $7(r.value); }
        return $8(r);
      };
    },
    foldMapVFRL: dictMonoid => {
      const foldMap1 = dictFoldable.foldMap(dictMonoid);
      const foldMapVFRL2 = dictFoldableVFRL.foldMapVFRL(dictMonoid);
      return v => f => {
        const $9 = foldMap1(f);
        const $10 = foldMapVFRL2(Type$dProxy.Proxy)(f);
        return r => {
          if (r.type === dictIsSymbol.reflectSymbol(Type$dProxy.Proxy)) { return $9(r.value); }
          return $10(r);
        };
      };
    }
  }
);
const foldableVariantF = () => dictFoldableVFRL => (
  {
    foldr: dictFoldableVFRL.foldrVFRL(Type$dProxy.Proxy),
    foldl: dictFoldableVFRL.foldlVFRL(Type$dProxy.Proxy),
    foldMap: dictMonoid => dictFoldableVFRL.foldMapVFRL(dictMonoid)(Type$dProxy.Proxy)
  }
);
const traversableVariantF = () => dictTraversableVFRL => {
  const foldableVariantF2 = foldableVariantF()(dictTraversableVFRL.FoldableVFRL0());
  return {
    traverse: dictApplicative => dictTraversableVFRL.traverseVFRL(dictApplicative)(Type$dProxy.Proxy),
    sequence: dictApplicative => traversableVariantF()(dictTraversableVFRL).traverse(dictApplicative)(Data$dTraversable.identity),
    Functor0: () => functorVariantF,
    Foldable1: () => foldableVariantF2
  };
};
const expand = () => Unsafe$dCoerce.unsafeCoerce;
const traversableCons = dictIsSymbol => dictTraversable => {
  const $2 = dictTraversable.Functor0();
  const foldableCons2 = foldableCons(dictIsSymbol)(dictTraversable.Foldable1());
  return dictTraversableVFRL => {
    const foldableCons3 = foldableCons2(dictTraversableVFRL.FoldableVFRL0())();
    return () => () => (
      {
        traverseVFRL: dictApplicative => {
          const traverse2 = dictTraversable.traverse(dictApplicative);
          const map1 = dictApplicative.Apply0().Functor0().map;
          const traverseVFRL2 = dictTraversableVFRL.traverseVFRL(dictApplicative);
          return v => f => {
            const $14 = traverse2(f);
            const $15 = map1(value => ({type: dictIsSymbol.reflectSymbol(Type$dProxy.Proxy), value: value, map: $2.map}));
            const $16 = traverseVFRL2(Type$dProxy.Proxy)(f);
            const $17 = map1(Unsafe$dCoerce.unsafeCoerce);
            return r => {
              if (r.type === dictIsSymbol.reflectSymbol(Type$dProxy.Proxy)) { return $15($14(r.value)); }
              return $17($16(r));
            };
          };
        },
        FoldableVFRL0: () => foldableCons3
      }
    );
  };
};
const $$default = a => v => a;
const contract = dictAlternative => dictContractable => {
  const contractWith = dictContractable.contractWith(dictAlternative);
  return v => contractWith(Type$dProxy.Proxy)(Type$dProxy.Proxy)(v.type)(v);
};
const case_ = r => Partial._crashWith("Data.Functor.Variant: pattern match failure [" + (r.type + "]"));
const foldableNil = {foldrVFRL: v => v1 => v2 => case_, foldlVFRL: v => v1 => v2 => case_, foldMapVFRL: dictMonoid => v => v1 => case_};
const match = () => () => () => r => onMatch()()()(r)(case_);
const traversableNil = {traverseVFRL: dictApplicative => v => v1 => case_, FoldableVFRL0: () => foldableNil};
export {
  UnvariantF,
  case_,
  contract,
  $$default as default,
  expand,
  foldMapVFRL,
  foldableCons,
  foldableNil,
  foldableVariantF,
  foldlVFRL,
  foldrVFRL,
  functorVariantF,
  inj,
  mapVariantFCons,
  mapVariantFNil,
  match,
  on,
  onMatch,
  over,
  overOne,
  overSome,
  prj,
  revariantF,
  showVariantF,
  showVariantFCons,
  showVariantFNil,
  traversableCons,
  traversableNil,
  traversableVariantF,
  traverse,
  traverseOne,
  traverseSome,
  traverseVFRL,
  unvariantF,
  variantFMaps,
  variantFShows
};
