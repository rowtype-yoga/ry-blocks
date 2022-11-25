import * as $runtime from "../runtime.js";
import * as Control$dMonad$dST$dInternal from "../Control.Monad.ST.Internal/index.js";
import * as Data$dArray from "../Data.Array/index.js";
import * as Data$dArray$dST from "../Data.Array.ST/index.js";
import * as Data$dEither from "../Data.Either/index.js";
import * as Data$dLazy from "../Data.Lazy/index.js";
import * as Data$dList from "../Data.List/index.js";
import * as Data$dList$dTypes from "../Data.List.Types/index.js";
import * as Data$dMaybe from "../Data.Maybe/index.js";
import * as Data$dTuple from "../Data.Tuple/index.js";
import * as Data$dUnfoldable from "../Data.Unfoldable/index.js";
import * as Data$dUnit from "../Data.Unit/index.js";
import * as PureScript$dCST$dErrors from "../PureScript.CST.Errors/index.js";
const $ParserResult = (tag, _1, _2) => ({tag, _1, _2});
const $Trampoline = (tag, _1) => ({tag, _1});
const toUnfoldable = /* #__PURE__ */ Data$dList.toUnfoldable(Data$dUnfoldable.unfoldableArray);
const More = value0 => $Trampoline("More", value0);
const Done = value0 => $Trampoline("Done", value0);
const ParseFail = value0 => value1 => $ParserResult("ParseFail", value0, value1);
const ParseSucc = value0 => value1 => $ParserResult("ParseSucc", value0, value1);
const lazyParser = {
  defer: k => {
    const parser = Data$dLazy.defer(k);
    return (state, more, resume, done) => Data$dLazy.force(parser)(state, more, resume, done);
  }
};
const functorParser = {map: f => v => (state1, more, resume, done) => v(state1, more, resume, (state2, a) => done(state2, f(a)))};
const applyParser = {
  apply: v => v1 => (state1, more, resume, done) => v(state1, more, resume, (state2, f) => more(v2 => v1(state2, more, resume, (state3, a) => done(state3, f(a))))),
  Functor0: () => functorParser
};
const bindParser = {bind: v => k => (state1, more, resume, done) => v(state1, more, resume, (state2, a) => more(v1 => k(a)(state2, more, resume, done))), Apply0: () => applyParser};
const applicativeParser = {pure: a => (state1, v, v1, done) => done(state1, a), Apply0: () => applyParser};
const monadParser = {Applicative0: () => applicativeParser, Bind1: () => bindParser};
const altParser = {
  alt: v => v1 => (state1, more, resume, done) => v(
    (() => {
      if (state1.consumed) { return {consumed: false, errors: state1.errors, stream: state1.stream}; }
      return state1;
    })(),
    more,
    (state3, error) => {
      if (state3.consumed) { return resume(state3, error); }
      return v1(state1, more, resume, done);
    },
    done
  ),
  Functor0: () => functorParser
};
const $$try = v => (state1, more, resume, done) => v(
  state1,
  more,
  (state2, error) => resume({consumed: state1.consumed, errors: state2.errors, stream: state2.stream}, error),
  done
);
const take = k => (state, v, resume, done) => {
  const v1 = Data$dLazy.force(state.stream);
  if (v1.tag === "TokenError") { return resume(state, {error: v1._2, position: v1._1}); }
  if (v1.tag === "TokenEOF") { return resume(state, {error: PureScript$dCST$dErrors.UnexpectedEof, position: v1._1}); }
  if (v1.tag === "TokenCons") {
    const v2 = k(v1._1);
    if (v2.tag === "Left") { return resume(state, {error: v2._1, position: v1._1.range.start}); }
    if (v2.tag === "Right") { return done({consumed: true, stream: v1._3, errors: state.errors}, v2._1); }
    $runtime.fail();
  }
  $runtime.fail();
};
const runParser$p = state1 => v => {
  const run = run$a0$copy => {
    let run$a0 = run$a0$copy, run$c = true, run$r;
    while (run$c) {
      const v1 = run$a0;
      if (v1.tag === "More") {
        run$a0 = v1._1(Data$dUnit.unit);
        continue;
      }
      if (v1.tag === "Done") {
        run$c = false;
        run$r = v1._1;
        continue;
      }
      $runtime.fail();
    };
    return run$r;
  };
  return run(v(
    state1,
    More,
    (state2, error) => $Trampoline("Done", $ParserResult("ParseFail", error, state2)),
    (state2, value) => $Trampoline("Done", $ParserResult("ParseSucc", value, state2))
  ));
};
const recover = k => v => (state1, more, resume, done) => v(
  {consumed: false, errors: state1.errors, stream: state1.stream},
  more,
  (state2, error) => {
    const v1 = k(error)(state1.stream);
    if (v1.tag === "Nothing") { return resume({consumed: state1.consumed, errors: state2.errors, stream: state2.stream}, error); }
    if (v1.tag === "Just") {
      return done(
        {consumed: true, errors: Control$dMonad$dST$dInternal.run(Data$dArray$dST.withArray(Data$dArray$dST.pushAll([error]))(state2.errors)), stream: v1._1._2},
        v1._1._1
      );
    }
    $runtime.fail();
  },
  done
);
const optional = p => (state1, more, resume, done) => p(
  (() => {
    if (state1.consumed) { return {consumed: false, errors: state1.errors, stream: state1.stream}; }
    return state1;
  })(),
  more,
  (state3, error) => {
    if (state3.consumed) { return resume(state3, error); }
    return done(state1, Data$dMaybe.Nothing);
  },
  (state2, a) => done(state2, Data$dMaybe.$Maybe("Just", a))
);
const many = v => (state1, more, resume, done) => {
  const go = (acc, state2) => v(
    (() => {
      if (state2.consumed) { return {consumed: false, errors: state2.errors, stream: state2.stream}; }
      return state2;
    })(),
    more,
    (state3, error) => {
      if (state3.consumed) { return resume(state3, error); }
      return done(state2, Data$dArray.reverse(toUnfoldable(acc)));
    },
    (state3, value) => go(Data$dList$dTypes.$List("Cons", value, acc), state3)
  );
  return go(Data$dList$dTypes.Nil, state1);
};
const lookAhead = v => (state1, more, resume, done) => v(state1, more, (v1, error) => resume(state1, error), (v1, value) => done(state1, value));
const initialParserState = stream => ({consumed: false, errors: [], stream: stream});
const fromParserResult = v => {
  if (v.tag === "ParseFail") { return Data$dEither.$Either("Left", v._1); }
  if (v.tag === "ParseSucc") { return Data$dEither.$Either("Right", Data$dTuple.$Tuple(v._1, v._2.errors)); }
  $runtime.fail();
};
const runParser = stream => x => fromParserResult(runParser$p({consumed: false, errors: [], stream: stream})(x));
const fail = error => (state, v, resume, v1) => resume(state, error);
const eof = (state, v, resume, done) => {
  const v1 = Data$dLazy.force(state.stream);
  if (v1.tag === "TokenError") { return resume(state, {error: v1._2, position: v1._1}); }
  if (v1.tag === "TokenEOF") { return done({consumed: true, stream: state.stream, errors: state.errors}, Data$dTuple.$Tuple(v1._1, v1._2)); }
  if (v1.tag === "TokenCons") { return resume(state, {error: PureScript$dCST$dErrors.$ParseError("ExpectedEof", v1._1.value), position: v1._1.range.start}); }
  $runtime.fail();
};
export {
  $ParserResult,
  $Trampoline,
  Done,
  More,
  ParseFail,
  ParseSucc,
  altParser,
  applicativeParser,
  applyParser,
  bindParser,
  eof,
  fail,
  fromParserResult,
  functorParser,
  initialParserState,
  lazyParser,
  lookAhead,
  many,
  monadParser,
  optional,
  recover,
  runParser,
  runParser$p,
  take,
  toUnfoldable,
  $$try as try
};
