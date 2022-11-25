import * as $runtime from "../runtime.js";
import {clear, debug, error, info, log, time, timeEnd, timeLog, warn} from "./foreign.js";
const warnShow = dictShow => a => warn(dictShow.show(a));
const logShow = dictShow => a => log(dictShow.show(a));
const infoShow = dictShow => a => info(dictShow.show(a));
const errorShow = dictShow => a => error(dictShow.show(a));
const debugShow = dictShow => a => debug(dictShow.show(a));
export {debugShow, errorShow, infoShow, logShow, warnShow};
export * from "./foreign.js";
