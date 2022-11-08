// | Partial helper functions for working with immutable arrays.
import * as $runtime from "../runtime.js";
import * as Data$dArray from "../Data.Array/index.js";
const tail = () => xs => Data$dArray.slice(1)(xs.length)(xs);
const last = () => xs => xs[(xs.length - 1 | 0)];
const init = () => xs => Data$dArray.slice(0)(xs.length - 1 | 0)(xs);
const head = () => xs => xs[0];
export {head, init, last, tail};
