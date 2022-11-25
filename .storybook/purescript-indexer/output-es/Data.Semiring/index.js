import * as $runtime from "../runtime.js";
import * as Data$dUnit from "../Data.Unit/index.js";
import * as Record$dUnsafe from "../Record.Unsafe/index.js";
import * as Type$dProxy from "../Type.Proxy/index.js";
import {intAdd, intMul, numAdd, numMul} from "./foreign.js";
const zeroRecord = dict => dict.zeroRecord;
const zero = dict => dict.zero;
const semiringUnit = {add: v => v1 => Data$dUnit.unit, zero: Data$dUnit.unit, mul: v => v1 => Data$dUnit.unit, one: Data$dUnit.unit};
const semiringRecordNil = {addRecord: v => v1 => v2 => ({}), mulRecord: v => v1 => v2 => ({}), oneRecord: v => v1 => ({}), zeroRecord: v => v1 => ({})};
const semiringProxy = {add: v => v1 => Type$dProxy.Proxy, mul: v => v1 => Type$dProxy.Proxy, one: Type$dProxy.Proxy, zero: Type$dProxy.Proxy};
const semiringNumber = {add: numAdd, zero: 0.0, mul: numMul, one: 1.0};
const semiringInt = {add: intAdd, zero: 0, mul: intMul, one: 1};
const oneRecord = dict => dict.oneRecord;
const one = dict => dict.one;
const mulRecord = dict => dict.mulRecord;
const mul = dict => dict.mul;
const addRecord = dict => dict.addRecord;
const semiringRecord = () => dictSemiringRecord => (
  {
    add: dictSemiringRecord.addRecord(Type$dProxy.Proxy),
    mul: dictSemiringRecord.mulRecord(Type$dProxy.Proxy),
    one: dictSemiringRecord.oneRecord(Type$dProxy.Proxy)(Type$dProxy.Proxy),
    zero: dictSemiringRecord.zeroRecord(Type$dProxy.Proxy)(Type$dProxy.Proxy)
  }
);
const add = dict => dict.add;
const semiringFn = dictSemiring => (
  {add: f => g => x => dictSemiring.add(f(x))(g(x)), zero: v => dictSemiring.zero, mul: f => g => x => dictSemiring.mul(f(x))(g(x)), one: v => dictSemiring.one}
);
const semiringRecordCons = dictIsSymbol => () => dictSemiringRecord => dictSemiring => (
  {
    addRecord: v => ra => rb => {
      const key = dictIsSymbol.reflectSymbol(Type$dProxy.Proxy);
      const $$get = Record$dUnsafe.unsafeGet(key);
      return Record$dUnsafe.unsafeSet(key)(dictSemiring.add($$get(ra))($$get(rb)))(dictSemiringRecord.addRecord(Type$dProxy.Proxy)(ra)(rb));
    },
    mulRecord: v => ra => rb => {
      const key = dictIsSymbol.reflectSymbol(Type$dProxy.Proxy);
      const $$get = Record$dUnsafe.unsafeGet(key);
      return Record$dUnsafe.unsafeSet(key)(dictSemiring.mul($$get(ra))($$get(rb)))(dictSemiringRecord.mulRecord(Type$dProxy.Proxy)(ra)(rb));
    },
    oneRecord: v => v1 => Record$dUnsafe.unsafeSet(dictIsSymbol.reflectSymbol(Type$dProxy.Proxy))(dictSemiring.one)(dictSemiringRecord.oneRecord(Type$dProxy.Proxy)(Type$dProxy.Proxy)),
    zeroRecord: v => v1 => Record$dUnsafe.unsafeSet(dictIsSymbol.reflectSymbol(Type$dProxy.Proxy))(dictSemiring.zero)(dictSemiringRecord.zeroRecord(Type$dProxy.Proxy)(Type$dProxy.Proxy))
  }
);
export {
  add,
  addRecord,
  mul,
  mulRecord,
  one,
  oneRecord,
  semiringFn,
  semiringInt,
  semiringNumber,
  semiringProxy,
  semiringRecord,
  semiringRecordCons,
  semiringRecordNil,
  semiringUnit,
  zero,
  zeroRecord
};
export * from "./foreign.js";
