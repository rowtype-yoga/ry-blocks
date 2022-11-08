import * as $runtime from "../runtime.js";
import * as Control$dPromise from "../Control.Promise/index.js";
import * as Data$dFunctor from "../Data.Functor/index.js";
import * as Effect$dAff from "../Effect.Aff/index.js";
import * as Type$dProxy from "../Type.Proxy/index.js";
import * as Unsafe$dCoerce from "../Unsafe.Coerce/index.js";
import * as Yoga$dJSON from "../Yoga.JSON/index.js";
import {withSourceMapConsumerImpl} from "./foreign.js";
const writeForeignArray = {writeImpl: xs => Data$dFunctor.arrayMap(Unsafe$dCoerce.unsafeCoerce)(xs)};
const write = /* #__PURE__ */ (() => {
  const $0 = Yoga$dJSON.writeForeignFieldsCons({reflectSymbol: () => "file"})(Yoga$dJSON.writeForeignString)(Yoga$dJSON.writeForeignFieldsCons({reflectSymbol: () => "mappings"})(Yoga$dJSON.writeForeignString)(Yoga$dJSON.writeForeignFieldsCons({
    reflectSymbol: () => "names"
  })(writeForeignArray)(Yoga$dJSON.writeForeignFieldsCons({reflectSymbol: () => "sourceRoot"})({
    writeImpl: v2 => {
      if (v2.tag === "Nothing") { return Yoga$dJSON._undefined; }
      if (v2.tag === "Just") { return v2._1; }
      $runtime.fail();
    }
  })(Yoga$dJSON.writeForeignFieldsCons({reflectSymbol: () => "sources"})(writeForeignArray)(Yoga$dJSON.writeForeignFieldsCons({reflectSymbol: () => "version"})(Yoga$dJSON.writeForeignInt)(Yoga$dJSON.writeForeignFieldsNilRowR)()()())()()())()()())()()())()()())()()();
  return rec => $0.writeImplFields(Type$dProxy.Proxy)(rec)({});
})();
const withSourceMapConsumer = handler => map => Effect$dAff._bind(Effect$dAff._liftEffect((() => {
  const $2 = write(map);
  return () => withSourceMapConsumerImpl(x => Control$dPromise.fromAff(handler(x))(), $2);
})()))(Control$dPromise.toAff$p(Control$dPromise.coerce));
export {withSourceMapConsumer, write, writeForeignArray};
export * from "./foreign.js";
