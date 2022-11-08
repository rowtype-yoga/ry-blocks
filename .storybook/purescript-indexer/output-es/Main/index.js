import * as $runtime from "../runtime.js";
import * as Control$dPromise from "../Control.Promise/index.js";
import * as PureScriptCSFIndexer from "../PureScriptCSFIndexer/index.js";
const indexer = (fn, opts) => Control$dPromise.fromAff(PureScriptCSFIndexer.indexer(fn)(opts))();
export {indexer};
