// | This module defines the `MonadWriter` type class and its instances.
import * as $runtime from "../runtime.js";
import * as Data$dTuple from "../Data.Tuple/index.js";
const tell = dict => dict.tell;
const pass = dict => dict.pass;
const listen = dict => dict.listen;
const listens = dictMonadWriter => {
  const Monad1 = dictMonadWriter.MonadTell1().Monad1();
  const bind = Monad1.Bind1().bind;
  const pure = Monad1.Applicative0().pure;
  return f => m => bind(dictMonadWriter.listen(m))(v => pure(Data$dTuple.$Tuple(v._1, f(v._2))));
};
const censor = dictMonadWriter => {
  const Monad1 = dictMonadWriter.MonadTell1().Monad1();
  const bind = Monad1.Bind1().bind;
  const pure = Monad1.Applicative0().pure;
  return f => m => dictMonadWriter.pass(bind(m)(a => pure(Data$dTuple.$Tuple(a, f))));
};
export {censor, listen, listens, pass, tell};
