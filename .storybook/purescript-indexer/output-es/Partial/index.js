// | Some partial helper functions. See the README for more documentation.
import * as $runtime from "../runtime.js";
import {_crashWith} from "./foreign.js";
const crashWith = () => _crashWith;
const crash = () => _crashWith("Partial.crash: partial function");
export {crash, crashWith};
export * from "./foreign.js";
