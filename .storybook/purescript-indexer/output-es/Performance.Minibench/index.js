// | This module provides the `bench` function, which prints a short summary
// | of the running times of a synchronous function to the console.
// |
// | For benchmarking tasks which require finer accuracy, or graphs as output,
// | consider using `purescript-benchotron` instead.
import * as $runtime from "../runtime.js";
import * as Data$dInt from "../Data.Int/index.js";
import * as Data$dNumber from "../Data.Number/index.js";
import * as Data$dUnit from "../Data.Unit/index.js";
import * as Effect from "../Effect/index.js";
import * as Effect$dConsole from "../Effect.Console/index.js";
import {gc, timeNs, toFixed} from "./foreign.js";
const withUnits = t => {
  if (t < 1000.0) { return toFixed(t) + " ns"; }
  if (t < 1000000.0) { return toFixed(t / 1000.0) + " μs"; }
  if (t < 1000000000.0) { return toFixed(t / 1000000.0) + " ms"; }
  return toFixed(t / 1000000000.0) + " s";
};
const benchWith$p = n => f => () => {
  const sumRef = {value: 0.0};
  const sum2Ref = {value: 0.0};
  const minRef = {value: Data$dNumber.infinity};
  const maxRef = {value: 0.0};
  gc();
  Effect.forE(0)(n)(v => () => {
    const ns = timeNs(f);
    const $9 = sumRef.value;
    sumRef.value = $9 + ns;
    const $11 = sum2Ref.value;
    sum2Ref.value = $11 + ns * ns;
    const $13 = minRef.value;
    minRef.value = Data$dNumber.min($13)(ns);
    const $15 = maxRef.value;
    maxRef.value = Data$dNumber.max($15)(ns);
    return Data$dUnit.unit;
  })();
  const sum = sumRef.value;
  const sum2 = sum2Ref.value;
  const min$p = minRef.value;
  const max$p = maxRef.value;
  const n$p = Data$dInt.toNumber(n);
  const mean = sum / n$p;
  return {mean: mean, stdDev: Data$dNumber.sqrt((sum2 - n$p * mean * mean) / (n$p - 1.0)), min: min$p, max: max$p};
};
const benchWith = n => f => {
  const $2 = benchWith$p(n)(f);
  return () => {
    const res = $2();
    Effect$dConsole.log("mean   = " + withUnits(res.mean))();
    Effect$dConsole.log("stddev = " + withUnits(res.stdDev))();
    Effect$dConsole.log("min    = " + withUnits(res.min))();
    return Effect$dConsole.log("max    = " + withUnits(res.max))();
  };
};
const bench = /* #__PURE__ */ benchWith(1000);
export {bench, benchWith, benchWith$p, withUnits};
export * from "./foreign.js";
