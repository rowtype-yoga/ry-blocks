import * as $runtime from "../runtime.js";
import * as Control$dMonad$dCont$dTrans from "../Control.Monad.Cont.Trans/index.js";
import * as Control$dMonad$dExcept$dTrans from "../Control.Monad.Except.Trans/index.js";
import * as Control$dMonad$dList$dTrans from "../Control.Monad.List.Trans/index.js";
import * as Control$dMonad$dMaybe$dTrans from "../Control.Monad.Maybe.Trans/index.js";
import * as Control$dMonad$dRWS$dTrans from "../Control.Monad.RWS.Trans/index.js";
import * as Control$dMonad$dReader$dTrans from "../Control.Monad.Reader.Trans/index.js";
import * as Control$dMonad$dState$dTrans from "../Control.Monad.State.Trans/index.js";
import * as Control$dMonad$dWriter$dTrans from "../Control.Monad.Writer.Trans/index.js";
import * as Effect$dAff from "../Effect.Aff/index.js";
const monadAffAff = {liftAff: x => x, MonadEffect0: () => Effect$dAff.monadEffectAff};
const liftAff = dict => dict.liftAff;
const monadAffContT = dictMonadAff => {
  const MonadEffect0 = dictMonadAff.MonadEffect0();
  const monadEffectContT = Control$dMonad$dCont$dTrans.monadEffectContT(MonadEffect0);
  return {
    liftAff: (() => {
      const $3 = MonadEffect0.Monad0().Bind1().bind;
      return x => $3(dictMonadAff.liftAff(x));
    })(),
    MonadEffect0: () => monadEffectContT
  };
};
const monadAffExceptT = dictMonadAff => {
  const MonadEffect0 = dictMonadAff.MonadEffect0();
  const monadEffectExceptT = Control$dMonad$dExcept$dTrans.monadEffectExceptT(MonadEffect0);
  return {
    liftAff: (() => {
      const $3 = Control$dMonad$dExcept$dTrans.monadTransExceptT.lift(MonadEffect0.Monad0());
      return x => $3(dictMonadAff.liftAff(x));
    })(),
    MonadEffect0: () => monadEffectExceptT
  };
};
const monadAffListT = dictMonadAff => {
  const MonadEffect0 = dictMonadAff.MonadEffect0();
  const monadEffectListT = Control$dMonad$dList$dTrans.monadEffectListT(MonadEffect0);
  return {
    liftAff: (() => {
      const $3 = Control$dMonad$dList$dTrans.fromEffect(MonadEffect0.Monad0().Applicative0());
      return x => $3(dictMonadAff.liftAff(x));
    })(),
    MonadEffect0: () => monadEffectListT
  };
};
const monadAffMaybe = dictMonadAff => {
  const MonadEffect0 = dictMonadAff.MonadEffect0();
  const monadEffectMaybe = Control$dMonad$dMaybe$dTrans.monadEffectMaybe(MonadEffect0);
  return {
    liftAff: (() => {
      const $3 = Control$dMonad$dMaybe$dTrans.monadTransMaybeT.lift(MonadEffect0.Monad0());
      return x => $3(dictMonadAff.liftAff(x));
    })(),
    MonadEffect0: () => monadEffectMaybe
  };
};
const monadAffRWS = dictMonadAff => {
  const MonadEffect0 = dictMonadAff.MonadEffect0();
  const Monad0 = MonadEffect0.Monad0();
  return dictMonoid => {
    const monadEffectRWS = Control$dMonad$dRWS$dTrans.monadEffectRWS(dictMonoid)(MonadEffect0);
    return {
      liftAff: (() => {
        const $5 = Control$dMonad$dRWS$dTrans.monadTransRWST(dictMonoid).lift(Monad0);
        return x => $5(dictMonadAff.liftAff(x));
      })(),
      MonadEffect0: () => monadEffectRWS
    };
  };
};
const monadAffReader = dictMonadAff => {
  const monadEffectReader = Control$dMonad$dReader$dTrans.monadEffectReader(dictMonadAff.MonadEffect0());
  return {
    liftAff: x => {
      const $3 = dictMonadAff.liftAff(x);
      return v => $3;
    },
    MonadEffect0: () => monadEffectReader
  };
};
const monadAffState = dictMonadAff => {
  const MonadEffect0 = dictMonadAff.MonadEffect0();
  const monadEffectState = Control$dMonad$dState$dTrans.monadEffectState(MonadEffect0);
  return {
    liftAff: (() => {
      const $3 = Control$dMonad$dState$dTrans.monadTransStateT.lift(MonadEffect0.Monad0());
      return x => $3(dictMonadAff.liftAff(x));
    })(),
    MonadEffect0: () => monadEffectState
  };
};
const monadAffWriter = dictMonadAff => {
  const MonadEffect0 = dictMonadAff.MonadEffect0();
  const Monad0 = MonadEffect0.Monad0();
  return dictMonoid => {
    const monadEffectWriter = Control$dMonad$dWriter$dTrans.monadEffectWriter(dictMonoid)(MonadEffect0);
    return {
      liftAff: (() => {
        const $5 = Control$dMonad$dWriter$dTrans.monadTransWriterT(dictMonoid).lift(Monad0);
        return x => $5(dictMonadAff.liftAff(x));
      })(),
      MonadEffect0: () => monadEffectWriter
    };
  };
};
export {liftAff, monadAffAff, monadAffContT, monadAffExceptT, monadAffListT, monadAffMaybe, monadAffRWS, monadAffReader, monadAffState, monadAffWriter};
