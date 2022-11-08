import * as $runtime from "../runtime.js";
import * as Data$dSemiring from "../Data.Semiring/index.js";
import * as Data$dUnit from "../Data.Unit/index.js";
import * as Record$dUnsafe from "../Record.Unsafe/index.js";
import * as Type$dProxy from "../Type.Proxy/index.js";
import {intSub, numSub} from "./foreign.js";
const subRecord = dict => dict.subRecord;
const sub = dict => dict.sub;
const ringUnit = {sub: v => v1 => Data$dUnit.unit, Semiring0: () => Data$dSemiring.semiringUnit};
const ringRecordNil = {subRecord: v => v1 => v2 => ({}), SemiringRecord0: () => Data$dSemiring.semiringRecordNil};
const ringRecordCons = dictIsSymbol => () => dictRingRecord => {
  const semiringRecordCons1 = Data$dSemiring.semiringRecordCons(dictIsSymbol)()(dictRingRecord.SemiringRecord0());
  return dictRing => {
    const semiringRecordCons2 = semiringRecordCons1(dictRing.Semiring0());
    return {
      subRecord: v => ra => rb => {
        const key = dictIsSymbol.reflectSymbol(Type$dProxy.Proxy);
        const $$get = Record$dUnsafe.unsafeGet(key);
        return Record$dUnsafe.unsafeSet(key)(dictRing.sub($$get(ra))($$get(rb)))(dictRingRecord.subRecord(Type$dProxy.Proxy)(ra)(rb));
      },
      SemiringRecord0: () => semiringRecordCons2
    };
  };
};
const ringRecord = () => dictRingRecord => {
  const semiringRecord1 = Data$dSemiring.semiringRecord()(dictRingRecord.SemiringRecord0());
  return {sub: dictRingRecord.subRecord(Type$dProxy.Proxy), Semiring0: () => semiringRecord1};
};
const ringProxy = {sub: v => v1 => Type$dProxy.Proxy, Semiring0: () => Data$dSemiring.semiringProxy};
const ringNumber = {sub: numSub, Semiring0: () => Data$dSemiring.semiringNumber};
const ringInt = {sub: intSub, Semiring0: () => Data$dSemiring.semiringInt};
const ringFn = dictRing => {
  const $1 = dictRing.Semiring0();
  const semiringFn = {add: f => g => x => $1.add(f(x))(g(x)), zero: v => $1.zero, mul: f => g => x => $1.mul(f(x))(g(x)), one: v => $1.one};
  return {sub: f => g => x => dictRing.sub(f(x))(g(x)), Semiring0: () => semiringFn};
};
const negate = dictRing => {
  const zero = dictRing.Semiring0().zero;
  return a => dictRing.sub(zero)(a);
};
export {negate, ringFn, ringInt, ringNumber, ringProxy, ringRecord, ringRecordCons, ringRecordNil, ringUnit, sub, subRecord};
export * from "./foreign.js";
