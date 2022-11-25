import * as $runtime from "../runtime.js";
import * as Data$dUnit from "../Data.Unit/index.js";
import * as Record$dUnsafe from "../Record.Unsafe/index.js";
import * as Type$dProxy from "../Type.Proxy/index.js";
import {boolConj, boolDisj, boolNot} from "./foreign.js";
const ttRecord = dict => dict.ttRecord;
const tt = dict => dict.tt;
const notRecord = dict => dict.notRecord;
const not = dict => dict.not;
const impliesRecord = dict => dict.impliesRecord;
const implies = dict => dict.implies;
const heytingAlgebraUnit = {
  ff: Data$dUnit.unit,
  tt: Data$dUnit.unit,
  implies: v => v1 => Data$dUnit.unit,
  conj: v => v1 => Data$dUnit.unit,
  disj: v => v1 => Data$dUnit.unit,
  not: v => Data$dUnit.unit
};
const heytingAlgebraRecordNil = {
  conjRecord: v => v1 => v2 => ({}),
  disjRecord: v => v1 => v2 => ({}),
  ffRecord: v => v1 => ({}),
  impliesRecord: v => v1 => v2 => ({}),
  notRecord: v => v1 => ({}),
  ttRecord: v => v1 => ({})
};
const heytingAlgebraProxy = {
  conj: v => v1 => Type$dProxy.Proxy,
  disj: v => v1 => Type$dProxy.Proxy,
  implies: v => v1 => Type$dProxy.Proxy,
  ff: Type$dProxy.Proxy,
  not: v => Type$dProxy.Proxy,
  tt: Type$dProxy.Proxy
};
const ffRecord = dict => dict.ffRecord;
const ff = dict => dict.ff;
const disjRecord = dict => dict.disjRecord;
const disj = dict => dict.disj;
const heytingAlgebraBoolean = {ff: false, tt: true, implies: a => b => heytingAlgebraBoolean.disj(heytingAlgebraBoolean.not(a))(b), conj: boolConj, disj: boolDisj, not: boolNot};
const conjRecord = dict => dict.conjRecord;
const heytingAlgebraRecord = () => dictHeytingAlgebraRecord => (
  {
    ff: dictHeytingAlgebraRecord.ffRecord(Type$dProxy.Proxy)(Type$dProxy.Proxy),
    tt: dictHeytingAlgebraRecord.ttRecord(Type$dProxy.Proxy)(Type$dProxy.Proxy),
    conj: dictHeytingAlgebraRecord.conjRecord(Type$dProxy.Proxy),
    disj: dictHeytingAlgebraRecord.disjRecord(Type$dProxy.Proxy),
    implies: dictHeytingAlgebraRecord.impliesRecord(Type$dProxy.Proxy),
    not: dictHeytingAlgebraRecord.notRecord(Type$dProxy.Proxy)
  }
);
const conj = dict => dict.conj;
const heytingAlgebraFunction = dictHeytingAlgebra => (
  {
    ff: v => dictHeytingAlgebra.ff,
    tt: v => dictHeytingAlgebra.tt,
    implies: f => g => a => dictHeytingAlgebra.implies(f(a))(g(a)),
    conj: f => g => a => dictHeytingAlgebra.conj(f(a))(g(a)),
    disj: f => g => a => dictHeytingAlgebra.disj(f(a))(g(a)),
    not: f => a => dictHeytingAlgebra.not(f(a))
  }
);
const heytingAlgebraRecordCons = dictIsSymbol => () => dictHeytingAlgebraRecord => dictHeytingAlgebra => (
  {
    conjRecord: v => ra => rb => {
      const key = dictIsSymbol.reflectSymbol(Type$dProxy.Proxy);
      const $$get = Record$dUnsafe.unsafeGet(key);
      return Record$dUnsafe.unsafeSet(key)(dictHeytingAlgebra.conj($$get(ra))($$get(rb)))(dictHeytingAlgebraRecord.conjRecord(Type$dProxy.Proxy)(ra)(rb));
    },
    disjRecord: v => ra => rb => {
      const key = dictIsSymbol.reflectSymbol(Type$dProxy.Proxy);
      const $$get = Record$dUnsafe.unsafeGet(key);
      return Record$dUnsafe.unsafeSet(key)(dictHeytingAlgebra.disj($$get(ra))($$get(rb)))(dictHeytingAlgebraRecord.disjRecord(Type$dProxy.Proxy)(ra)(rb));
    },
    impliesRecord: v => ra => rb => {
      const key = dictIsSymbol.reflectSymbol(Type$dProxy.Proxy);
      const $$get = Record$dUnsafe.unsafeGet(key);
      return Record$dUnsafe.unsafeSet(key)(dictHeytingAlgebra.implies($$get(ra))($$get(rb)))(dictHeytingAlgebraRecord.impliesRecord(Type$dProxy.Proxy)(ra)(rb));
    },
    ffRecord: v => row => Record$dUnsafe.unsafeSet(dictIsSymbol.reflectSymbol(Type$dProxy.Proxy))(dictHeytingAlgebra.ff)(dictHeytingAlgebraRecord.ffRecord(Type$dProxy.Proxy)(row)),
    notRecord: v => row => {
      const key = dictIsSymbol.reflectSymbol(Type$dProxy.Proxy);
      return Record$dUnsafe.unsafeSet(key)(dictHeytingAlgebra.not(Record$dUnsafe.unsafeGet(key)(row)))(dictHeytingAlgebraRecord.notRecord(Type$dProxy.Proxy)(row));
    },
    ttRecord: v => row => Record$dUnsafe.unsafeSet(dictIsSymbol.reflectSymbol(Type$dProxy.Proxy))(dictHeytingAlgebra.tt)(dictHeytingAlgebraRecord.ttRecord(Type$dProxy.Proxy)(row))
  }
);
export {
  conj,
  conjRecord,
  disj,
  disjRecord,
  ff,
  ffRecord,
  heytingAlgebraBoolean,
  heytingAlgebraFunction,
  heytingAlgebraProxy,
  heytingAlgebraRecord,
  heytingAlgebraRecordCons,
  heytingAlgebraRecordNil,
  heytingAlgebraUnit,
  implies,
  impliesRecord,
  not,
  notRecord,
  tt,
  ttRecord
};
export * from "./foreign.js";
