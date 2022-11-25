// | This module defines the `Traced` comonad.
import * as $runtime from "../runtime.js";
const traced = x => x;
const runTraced = v => v;
export {runTraced, traced};
