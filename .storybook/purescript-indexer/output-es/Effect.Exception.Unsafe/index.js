import * as $runtime from "../runtime.js";
import * as Effect$dException from "../Effect.Exception/index.js";
import * as Effect$dUnsafe from "../Effect.Unsafe/index.js";
const unsafeThrowException = x => Effect$dUnsafe.unsafePerformEffect(Effect$dException.throwException(x));
const unsafeThrow = x => Effect$dUnsafe.unsafePerformEffect(Effect$dException.throwException(Effect$dException.error(x)));
export {unsafeThrow, unsafeThrowException};
