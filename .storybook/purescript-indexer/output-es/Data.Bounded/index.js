import * as $runtime from "../runtime.js";
import * as Data$dOrd from "../Data.Ord/index.js";
import * as Data$dOrdering from "../Data.Ordering/index.js";
import * as Data$dUnit from "../Data.Unit/index.js";
import * as Record$dUnsafe from "../Record.Unsafe/index.js";
import * as Type$dProxy from "../Type.Proxy/index.js";
import {bottomChar, bottomInt, bottomNumber, topChar, topInt, topNumber} from "./foreign.js";
const topRecord = dict => dict.topRecord;
const top = dict => dict.top;
const boundedUnit = {top: Data$dUnit.unit, bottom: Data$dUnit.unit, Ord0: () => Data$dOrd.ordUnit};
const boundedRecordNil = {topRecord: v => v1 => ({}), bottomRecord: v => v1 => ({}), OrdRecord0: () => Data$dOrd.ordRecordNil};
const boundedProxy = {bottom: Type$dProxy.Proxy, top: Type$dProxy.Proxy, Ord0: () => Data$dOrd.ordProxy};
const boundedOrdering = {top: Data$dOrdering.GT, bottom: Data$dOrdering.LT, Ord0: () => Data$dOrd.ordOrdering};
const boundedNumber = {top: topNumber, bottom: bottomNumber, Ord0: () => Data$dOrd.ordNumber};
const boundedInt = {top: 2147483647, bottom: -2147483648, Ord0: () => Data$dOrd.ordInt};
const boundedChar = {top: "￿", bottom: "\u0000", Ord0: () => Data$dOrd.ordChar};
const boundedBoolean = {top: true, bottom: false, Ord0: () => Data$dOrd.ordBoolean};
const bottomRecord = dict => dict.bottomRecord;
const boundedRecord = () => dictBoundedRecord => {
  const ordRecord1 = Data$dOrd.ordRecord()(dictBoundedRecord.OrdRecord0());
  return {
    top: dictBoundedRecord.topRecord(Type$dProxy.Proxy)(Type$dProxy.Proxy),
    bottom: dictBoundedRecord.bottomRecord(Type$dProxy.Proxy)(Type$dProxy.Proxy),
    Ord0: () => ordRecord1
  };
};
const bottom = dict => dict.bottom;
const boundedRecordCons = dictIsSymbol => dictBounded => {
  const Ord0 = dictBounded.Ord0();
  return () => () => dictBoundedRecord => {
    const $6 = dictBoundedRecord.OrdRecord0();
    const $7 = $6.EqRecord0();
    const $8 = Ord0.Eq0();
    const eqRowCons2 = {
      eqRecord: v => ra => rb => {
        const $$get = Record$dUnsafe.unsafeGet(dictIsSymbol.reflectSymbol(Type$dProxy.Proxy));
        return $8.eq($$get(ra))($$get(rb)) && $7.eqRecord(Type$dProxy.Proxy)(ra)(rb);
      }
    };
    const ordRecordCons = {
      compareRecord: v => ra => rb => {
        const key = dictIsSymbol.reflectSymbol(Type$dProxy.Proxy);
        const left = Ord0.compare(Record$dUnsafe.unsafeGet(key)(ra))(Record$dUnsafe.unsafeGet(key)(rb));
        if (left.tag === "LT" || (left.tag === "GT" || !(left.tag === "EQ"))) { return left; }
        return $6.compareRecord(Type$dProxy.Proxy)(ra)(rb);
      },
      EqRecord0: () => eqRowCons2
    };
    return {
      topRecord: v => rowProxy => Record$dUnsafe.unsafeSet(dictIsSymbol.reflectSymbol(Type$dProxy.Proxy))(dictBounded.top)(dictBoundedRecord.topRecord(Type$dProxy.Proxy)(rowProxy)),
      bottomRecord: v => rowProxy => Record$dUnsafe.unsafeSet(dictIsSymbol.reflectSymbol(Type$dProxy.Proxy))(dictBounded.bottom)(dictBoundedRecord.bottomRecord(Type$dProxy.Proxy)(rowProxy)),
      OrdRecord0: () => ordRecordCons
    };
  };
};
export {
  bottom,
  bottomRecord,
  boundedBoolean,
  boundedChar,
  boundedInt,
  boundedNumber,
  boundedOrdering,
  boundedProxy,
  boundedRecord,
  boundedRecordCons,
  boundedRecordNil,
  boundedUnit,
  top,
  topRecord
};
export * from "./foreign.js";
