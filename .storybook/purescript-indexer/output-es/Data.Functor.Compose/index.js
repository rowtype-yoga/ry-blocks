import * as $runtime from "../runtime.js";
const Compose = x => x;
const showCompose = dictShow => ({show: v => "(Compose " + (dictShow.show(v) + ")")});
const newtypeCompose = {Coercible0: () => undefined};
const functorCompose = dictFunctor => dictFunctor1 => ({map: f => v => dictFunctor.map(dictFunctor1.map(f))(v)});
const eqCompose = dictEq1 => dictEq11 => dictEq => {
  const eq11 = dictEq1.eq1((() => {
    const eq11 = dictEq11.eq1(dictEq);
    return {eq: x => y => eq11(x)(y)};
  })());
  return {eq: v => v1 => eq11(v)(v1)};
};
const ordCompose = dictOrd1 => {
  const $1 = dictOrd1.Eq10();
  return dictOrd11 => {
    const $3 = dictOrd11.Eq10();
    const $4 = dictOrd11.Eq10();
    return dictOrd => {
      const compare11 = dictOrd1.compare1((() => {
        const compare11 = dictOrd11.compare1(dictOrd);
        const eq11 = $3.eq1(dictOrd.Eq0());
        const eqApp2 = {eq: x => y => eq11(x)(y)};
        return {compare: x => y => compare11(x)(y), Eq0: () => eqApp2};
      })());
      const eq11 = $1.eq1((() => {
        const eq11 = $4.eq1(dictOrd.Eq0());
        return {eq: x => y => eq11(x)(y)};
      })());
      const eqCompose3 = {eq: v => v1 => eq11(v)(v1)};
      return {compare: v => v1 => compare11(v)(v1), Eq0: () => eqCompose3};
    };
  };
};
const eq1Compose = dictEq1 => dictEq11 => (
  {
    eq1: dictEq => dictEq1.eq1((() => {
      const eq11 = dictEq11.eq1(dictEq);
      return {eq: x => y => eq11(x)(y)};
    })())
  }
);
const ord1Compose = dictOrd1 => {
  const ordCompose1 = ordCompose(dictOrd1);
  const $2 = dictOrd1.Eq10();
  return dictOrd11 => {
    const ordCompose2 = ordCompose1(dictOrd11);
    const $5 = dictOrd11.Eq10();
    const eq1Compose2 = {
      eq1: dictEq => $2.eq1((() => {
        const eq11 = $5.eq1(dictEq);
        return {eq: x => y => eq11(x)(y)};
      })())
    };
    return {compare1: dictOrd => ordCompose2(dictOrd).compare, Eq10: () => eq1Compose2};
  };
};
const bihoistCompose = dictFunctor => natF => natG => v => natF(dictFunctor.map(natG)(v));
const applyCompose = dictApply => {
  const Functor0 = dictApply.Functor0();
  return dictApply1 => {
    const $3 = dictApply1.Functor0();
    const functorCompose2 = {map: f => v => Functor0.map($3.map(f))(v)};
    return {apply: v => v1 => dictApply.apply(Functor0.map(dictApply1.apply)(v))(v1), Functor0: () => functorCompose2};
  };
};
const applicativeCompose = dictApplicative => {
  const $1 = dictApplicative.Apply0();
  const Functor0 = $1.Functor0();
  return dictApplicative1 => {
    const $4 = dictApplicative1.Apply0();
    const $5 = $4.Functor0();
    const functorCompose2 = {map: f => v => Functor0.map($5.map(f))(v)};
    const applyCompose2 = {apply: v => v1 => $1.apply(Functor0.map($4.apply)(v))(v1), Functor0: () => functorCompose2};
    return {pure: x => dictApplicative.pure(dictApplicative1.pure(x)), Apply0: () => applyCompose2};
  };
};
const altCompose = dictAlt => {
  const $1 = dictAlt.Functor0();
  return dictFunctor => {
    const functorCompose2 = {map: f => v => $1.map(dictFunctor.map(f))(v)};
    return {alt: v => v1 => dictAlt.alt(v)(v1), Functor0: () => functorCompose2};
  };
};
const plusCompose = dictPlus => {
  const $1 = dictPlus.Alt0();
  const $2 = $1.Functor0();
  return dictFunctor => {
    const functorCompose2 = {map: f => v => $2.map(dictFunctor.map(f))(v)};
    const altCompose2 = {alt: v => v1 => $1.alt(v)(v1), Functor0: () => functorCompose2};
    return {empty: dictPlus.empty, Alt0: () => altCompose2};
  };
};
const alternativeCompose = dictAlternative => {
  const applicativeCompose1 = applicativeCompose(dictAlternative.Applicative0());
  const $2 = dictAlternative.Plus1();
  const $3 = $2.Alt0();
  const $4 = $3.Functor0();
  return dictApplicative => {
    const applicativeCompose2 = applicativeCompose1(dictApplicative);
    const $7 = dictApplicative.Apply0().Functor0();
    const functorCompose2 = {map: f => v => $4.map($7.map(f))(v)};
    const altCompose2 = {alt: v => v1 => $3.alt(v)(v1), Functor0: () => functorCompose2};
    return {Applicative0: () => applicativeCompose2, Plus1: () => ({empty: $2.empty, Alt0: () => altCompose2})};
  };
};
export {
  Compose,
  altCompose,
  alternativeCompose,
  applicativeCompose,
  applyCompose,
  bihoistCompose,
  eq1Compose,
  eqCompose,
  functorCompose,
  newtypeCompose,
  ord1Compose,
  ordCompose,
  plusCompose,
  showCompose
};
