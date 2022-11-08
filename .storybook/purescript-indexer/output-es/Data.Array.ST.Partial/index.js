// | Partial functions for working with mutable arrays using the `ST` effect.
// |
// | This module is particularly helpful when performance is very important.
import * as $runtime from "../runtime.js";
import {peekImpl, pokeImpl} from "./foreign.js";
const poke = () => pokeImpl;
const peek = () => peekImpl;
export {peek, poke};
export * from "./foreign.js";
