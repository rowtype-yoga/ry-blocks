import * as $runtime from "../runtime.js";
import * as Effect$dConsole from "../Effect.Console/index.js";
const main = /* #__PURE__ */ (() => {
  const $0 = Effect$dConsole.log("🍝");
  return () => {
    $0();
    return Effect$dConsole.log("You should add some tests.")();
  };
})();
export {main};
