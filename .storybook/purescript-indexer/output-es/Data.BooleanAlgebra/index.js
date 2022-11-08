import * as $runtime from "../runtime.js";
import * as Data$dHeytingAlgebra from "../Data.HeytingAlgebra/index.js";
import * as Type$dProxy from "../Type.Proxy/index.js";
const booleanAlgebraUnit = {HeytingAlgebra0: () => Data$dHeytingAlgebra.heytingAlgebraUnit};
const booleanAlgebraRecordNil = {HeytingAlgebraRecord0: () => Data$dHeytingAlgebra.heytingAlgebraRecordNil};
const booleanAlgebraRecordCons = dictIsSymbol => () => dictBooleanAlgebraRecord => {
  const heytingAlgebraRecordCons1 = Data$dHeytingAlgebra.heytingAlgebraRecordCons(dictIsSymbol)()(dictBooleanAlgebraRecord.HeytingAlgebraRecord0());
  return dictBooleanAlgebra => {
    const heytingAlgebraRecordCons2 = heytingAlgebraRecordCons1(dictBooleanAlgebra.HeytingAlgebra0());
    return {HeytingAlgebraRecord0: () => heytingAlgebraRecordCons2};
  };
};
const booleanAlgebraRecord = () => dictBooleanAlgebraRecord => {
  const $2 = dictBooleanAlgebraRecord.HeytingAlgebraRecord0();
  const heytingAlgebraRecord1 = {
    ff: $2.ffRecord(Type$dProxy.Proxy)(Type$dProxy.Proxy),
    tt: $2.ttRecord(Type$dProxy.Proxy)(Type$dProxy.Proxy),
    conj: $2.conjRecord(Type$dProxy.Proxy),
    disj: $2.disjRecord(Type$dProxy.Proxy),
    implies: $2.impliesRecord(Type$dProxy.Proxy),
    not: $2.notRecord(Type$dProxy.Proxy)
  };
  return {HeytingAlgebra0: () => heytingAlgebraRecord1};
};
const booleanAlgebraProxy = {HeytingAlgebra0: () => Data$dHeytingAlgebra.heytingAlgebraProxy};
const booleanAlgebraFn = dictBooleanAlgebra => {
  const $1 = dictBooleanAlgebra.HeytingAlgebra0();
  const heytingAlgebraFunction = {
    ff: v => $1.ff,
    tt: v => $1.tt,
    implies: f => g => a => $1.implies(f(a))(g(a)),
    conj: f => g => a => $1.conj(f(a))(g(a)),
    disj: f => g => a => $1.disj(f(a))(g(a)),
    not: f => a => $1.not(f(a))
  };
  return {HeytingAlgebra0: () => heytingAlgebraFunction};
};
const booleanAlgebraBoolean = {HeytingAlgebra0: () => Data$dHeytingAlgebra.heytingAlgebraBoolean};
export {booleanAlgebraBoolean, booleanAlgebraFn, booleanAlgebraProxy, booleanAlgebraRecord, booleanAlgebraRecordCons, booleanAlgebraRecordNil, booleanAlgebraUnit};
