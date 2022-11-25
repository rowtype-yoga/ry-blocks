import * as $runtime from "../runtime.js";
import * as Data$dRing from "../Data.Ring/index.js";
const commutativeRingUnit = {Ring0: () => Data$dRing.ringUnit};
const commutativeRingRecordNil = {RingRecord0: () => Data$dRing.ringRecordNil};
const commutativeRingRecordCons = dictIsSymbol => () => dictCommutativeRingRecord => {
  const ringRecordCons1 = Data$dRing.ringRecordCons(dictIsSymbol)()(dictCommutativeRingRecord.RingRecord0());
  return dictCommutativeRing => {
    const ringRecordCons2 = ringRecordCons1(dictCommutativeRing.Ring0());
    return {RingRecord0: () => ringRecordCons2};
  };
};
const commutativeRingRecord = () => dictCommutativeRingRecord => {
  const ringRecord1 = Data$dRing.ringRecord()(dictCommutativeRingRecord.RingRecord0());
  return {Ring0: () => ringRecord1};
};
const commutativeRingProxy = {Ring0: () => Data$dRing.ringProxy};
const commutativeRingNumber = {Ring0: () => Data$dRing.ringNumber};
const commutativeRingInt = {Ring0: () => Data$dRing.ringInt};
const commutativeRingFn = dictCommutativeRing => {
  const $1 = dictCommutativeRing.Ring0();
  const $2 = $1.Semiring0();
  const semiringFn = {add: f => g => x => $2.add(f(x))(g(x)), zero: v => $2.zero, mul: f => g => x => $2.mul(f(x))(g(x)), one: v => $2.one};
  const ringFn = {sub: f => g => x => $1.sub(f(x))(g(x)), Semiring0: () => semiringFn};
  return {Ring0: () => ringFn};
};
export {
  commutativeRingFn,
  commutativeRingInt,
  commutativeRingNumber,
  commutativeRingProxy,
  commutativeRingRecord,
  commutativeRingRecordCons,
  commutativeRingRecordNil,
  commutativeRingUnit
};
