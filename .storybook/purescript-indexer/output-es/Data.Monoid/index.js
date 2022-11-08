import * as $runtime from "../runtime.js";
import * as Data$dEuclideanRing from "../Data.EuclideanRing/index.js";
import * as Data$dOrdering from "../Data.Ordering/index.js";
import * as Data$dSemigroup from "../Data.Semigroup/index.js";
import * as Data$dUnit from "../Data.Unit/index.js";
import * as Record$dUnsafe from "../Record.Unsafe/index.js";
import * as Type$dProxy from "../Type.Proxy/index.js";
const monoidUnit = {mempty: Data$dUnit.unit, Semigroup0: () => Data$dSemigroup.semigroupUnit};
const monoidString = {mempty: "", Semigroup0: () => Data$dSemigroup.semigroupString};
const monoidRecordNil = {memptyRecord: v => ({}), SemigroupRecord0: () => Data$dSemigroup.semigroupRecordNil};
const monoidOrdering = {mempty: Data$dOrdering.EQ, Semigroup0: () => Data$dOrdering.semigroupOrdering};
const monoidArray = {mempty: [], Semigroup0: () => Data$dSemigroup.semigroupArray};
const memptyRecord = dict => dict.memptyRecord;
const monoidRecord = () => dictMonoidRecord => {
  const semigroupRecord1 = {append: dictMonoidRecord.SemigroupRecord0().appendRecord(Type$dProxy.Proxy)};
  return {mempty: dictMonoidRecord.memptyRecord(Type$dProxy.Proxy), Semigroup0: () => semigroupRecord1};
};
const mempty = dict => dict.mempty;
const monoidFn = dictMonoid => {
  const $1 = dictMonoid.Semigroup0();
  const semigroupFn = {append: f => g => x => $1.append(f(x))(g(x))};
  return {mempty: v => dictMonoid.mempty, Semigroup0: () => semigroupFn};
};
const monoidRecordCons = dictIsSymbol => dictMonoid => {
  const Semigroup0 = dictMonoid.Semigroup0();
  return () => dictMonoidRecord => {
    const $5 = dictMonoidRecord.SemigroupRecord0();
    const semigroupRecordCons1 = {
      appendRecord: v => ra => rb => {
        const key = dictIsSymbol.reflectSymbol(Type$dProxy.Proxy);
        const $$get = Record$dUnsafe.unsafeGet(key);
        return Record$dUnsafe.unsafeSet(key)(Semigroup0.append($$get(ra))($$get(rb)))($5.appendRecord(Type$dProxy.Proxy)(ra)(rb));
      }
    };
    return {
      memptyRecord: v => Record$dUnsafe.unsafeSet(dictIsSymbol.reflectSymbol(Type$dProxy.Proxy))(dictMonoid.mempty)(dictMonoidRecord.memptyRecord(Type$dProxy.Proxy)),
      SemigroupRecord0: () => semigroupRecordCons1
    };
  };
};
const power = dictMonoid => {
  const append = dictMonoid.Semigroup0().append;
  return x => {
    const go = p => {
      if (p <= 0) { return dictMonoid.mempty; }
      if (p === 1) { return x; }
      if (Data$dEuclideanRing.intMod(p)(2) === 0) {
        const x$p = go(Data$dEuclideanRing.intDiv(p)(2));
        return append(x$p)(x$p);
      }
      const x$p = go(Data$dEuclideanRing.intDiv(p)(2));
      return append(x$p)(append(x$p)(x));
    };
    return go;
  };
};
const guard = dictMonoid => v => v1 => {
  if (v) { return v1; }
  return dictMonoid.mempty;
};
export {guard, mempty, memptyRecord, monoidArray, monoidFn, monoidOrdering, monoidRecord, monoidRecordCons, monoidRecordNil, monoidString, monoidUnit, power};
