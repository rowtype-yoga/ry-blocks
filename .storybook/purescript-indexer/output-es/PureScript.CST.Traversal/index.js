import * as $runtime from "../runtime.js";
import * as Control$dMonad$dFree from "../Control.Monad.Free/index.js";
import * as Data$dBitraversable from "../Data.Bitraversable/index.js";
import * as Data$dCatList from "../Data.CatList/index.js";
import * as Data$dCatQueue from "../Data.CatQueue/index.js";
import * as Data$dConst from "../Data.Const/index.js";
import * as Data$dFunctor$dCompose from "../Data.Functor.Compose/index.js";
import * as Data$dIdentity from "../Data.Identity/index.js";
import * as Data$dList$dTypes from "../Data.List.Types/index.js";
import * as Data$dTraversable from "../Data.Traversable/index.js";
import * as Data$dTuple from "../Data.Tuple/index.js";
import * as Data$dUnit from "../Data.Unit/index.js";
import * as PureScript$dCST$dTypes from "../PureScript.CST.Types/index.js";
import * as Unsafe$dCoerce from "../Unsafe.Coerce/index.js";
const applicativeReaderT = /* #__PURE__ */ (() => {
  const functorReaderT1 = {map: x => v => x$1 => x(v(x$1))};
  const applyReaderT1 = {apply: v => v1 => r => v(r)(v1(r)), Functor0: () => functorReaderT1};
  return {pure: x => v => x, Apply0: () => applyReaderT1};
})();
const applyCompose = dictApply1 => {
  const $1 = dictApply1.Functor0();
  const functorCompose2 = {
    map: f => v => {
      const $4 = $1.map(f);
      return Control$dMonad$dFree.$Free(
        v._1,
        Data$dCatList.link(v._2)(Data$dCatList.$CatList(
          "CatCons",
          x => Control$dMonad$dFree.$Free(Control$dMonad$dFree.$FreeView("Return", $4(x)), Data$dCatList.CatNil),
          Data$dCatQueue.$CatQueue(Data$dList$dTypes.Nil, Data$dList$dTypes.Nil)
        ))
      );
    }
  };
  return {
    apply: v => v1 => Control$dMonad$dFree.freeApply.apply(Control$dMonad$dFree.$Free(
      v._1,
      Data$dCatList.link(v._2)(Data$dCatList.$CatList(
        "CatCons",
        x => Control$dMonad$dFree.$Free(Control$dMonad$dFree.$FreeView("Return", dictApply1.apply(x)), Data$dCatList.CatNil),
        Data$dCatQueue.$CatQueue(Data$dList$dTypes.Nil, Data$dList$dTypes.Nil)
      ))
    ))(v1),
    Functor0: () => functorCompose2
  };
};
const applicativeCompose = /* #__PURE__ */ Data$dFunctor$dCompose.applicativeCompose(Control$dMonad$dFree.freeApplicative);
const identity = x => x;
const traverseWrapped = dictApplicative => {
  const map = dictApplicative.Apply0().Functor0().map;
  return k => v => map(value => ({open: v.open, value: value, close: v.close}))(k(v.value));
};
const traverseSeparated = dictApplicative => {
  const Apply0 = dictApplicative.Apply0();
  const map = Apply0.Functor0().map;
  const traverse4 = Data$dTraversable.traversableArray.traverse(dictApplicative);
  const traverse5 = Data$dTraversable.traversableTuple.traverse(dictApplicative);
  return k => v => Apply0.apply(map(v1 => v2 => ({head: v1, tail: v2}))(k(v.head)))(traverse4(traverse5(k))(v.tail));
};
const traverseRecordUpdate = dictApplicative => {
  const map = dictApplicative.Apply0().Functor0().map;
  const map$1 = dictApplicative.Apply0().Functor0().map;
  const traverseSeparated1 = traverseSeparated(dictApplicative);
  return k => v => {
    if (v.tag === "RecordUpdateLeaf") { return map(PureScript$dCST$dTypes.RecordUpdateLeaf(v._1)(v._2))(k.onExpr(v._3)); }
    if (v.tag === "RecordUpdateBranch") {
      return map(PureScript$dCST$dTypes.RecordUpdateBranch(v._1))(map$1(value => ({open: v._2.open, value: value, close: v._2.close}))(traverseSeparated1(traverseRecordUpdate(dictApplicative)(k))(v._2.value)));
    }
    $runtime.fail();
  };
};
const traverseRecordLabeled = dictApplicative => {
  const map = dictApplicative.Apply0().Functor0().map;
  return k => v => {
    if (v.tag === "RecordPun") { return dictApplicative.pure(PureScript$dCST$dTypes.$RecordLabeled("RecordPun", v._1)); }
    if (v.tag === "RecordField") { return map(PureScript$dCST$dTypes.RecordField(v._1)(v._2))(k(v._3)); }
    $runtime.fail();
  };
};
const traverseRecordAccessor = dictApplicative => {
  const map = dictApplicative.Apply0().Functor0().map;
  return k => r => map(v => ({expr: v, dot: r.dot, path: r.path}))(k.onExpr(r.expr));
};
const traversePatternGuard = dictApplicative => {
  const Apply0 = dictApplicative.Apply0();
  const map = Apply0.Functor0().map;
  const traverse4 = Data$dTraversable.traversableMaybe.traverse(dictApplicative);
  const bitraverse2 = Data$dBitraversable.bitraversableTuple.bitraverse(dictApplicative);
  return k => v => Apply0.apply(map(binder => expr => ({binder: binder, expr: expr}))(traverse4(bitraverse2(k.onBinder)(dictApplicative.pure))(v.binder)))(k.onExpr(v.expr));
};
const traverseModuleBody = dictApplicative => {
  const map = dictApplicative.Apply0().Functor0().map;
  const traverse4 = Data$dTraversable.traversableArray.traverse(dictApplicative);
  return k => v => map(decls => ({decls: decls, trailingComments: v.trailingComments, end: v.end}))(traverse4(k.onDecl)(v.decls));
};
const traverseModule = dictApplicative => {
  const map = dictApplicative.Apply0().Functor0().map;
  const traverseModuleBody1 = traverseModuleBody(dictApplicative);
  return k => v => map(body => ({header: v.header, body: body}))(traverseModuleBody1(k)(v.body));
};
const traverseModule1 = /* #__PURE__ */ traverseModule(Control$dMonad$dFree.freeApplicative);
const traverseLambda = dictApplicative => {
  const Apply0 = dictApplicative.Apply0();
  const map = Apply0.Functor0().map;
  const traverse4 = Data$dTraversable.traversableArray.traverse(dictApplicative);
  return k => l => Apply0.apply(map(v => v1 => ({binders: v, body: v1, arrow: l.arrow, symbol: l.symbol}))(traverse4(k.onBinder)(l.binders)))(k.onExpr(l.body));
};
const traverseLabeled = dictApplicative => {
  const map = dictApplicative.Apply0().Functor0().map;
  return k => v => map(value => ({label: v.label, separator: v.separator, value: value}))(k(v.value));
};
const traverseRow = dictApplicative => {
  const Apply0 = dictApplicative.Apply0();
  const map = Apply0.Functor0().map;
  const traverse4 = Data$dTraversable.traversableMaybe.traverse(dictApplicative);
  const traverseSeparated1 = traverseSeparated(dictApplicative);
  const map$1 = dictApplicative.Apply0().Functor0().map;
  const traverse5 = Data$dTraversable.traversableTuple.traverse(dictApplicative);
  return k => v => Apply0.apply(map(labels => tail => ({labels: labels, tail: tail}))(traverse4(traverseSeparated1(v$1 => map$1(value => (
    {label: v$1.label, separator: v$1.separator, value: value}
  ))(k.onType(v$1.value))))(v.labels)))(traverse4(traverse5(k.onType))(v.tail));
};
const traverseTypeVarBinding = dictApplicative => {
  const map = dictApplicative.Apply0().Functor0().map;
  const map$1 = dictApplicative.Apply0().Functor0().map;
  const map$2 = dictApplicative.Apply0().Functor0().map;
  return k => v => {
    if (v.tag === "TypeVarKinded") {
      return map(PureScript$dCST$dTypes.TypeVarKinded)(map$1(value => ({open: v._1.open, value: value, close: v._1.close}))(map$2(value => (
        {label: v._1.value.label, separator: v._1.value.separator, value: value}
      ))(k.onType(v._1.value.value))));
    }
    if (v.tag === "TypeVarName") { return dictApplicative.pure(PureScript$dCST$dTypes.$TypeVarBinding("TypeVarName", v._1)); }
    $runtime.fail();
  };
};
const traverseType = dictApplicative => {
  const Apply0 = dictApplicative.Apply0();
  const Functor0 = Apply0.Functor0();
  const map = dictApplicative.Apply0().Functor0().map;
  const traverseWrapped1 = (k, v) => map(value => ({open: v.open, value: value, close: v.close}))(k(v.value));
  const traverseRow1 = traverseRow(dictApplicative);
  const traverse4 = Data$dTraversable.traversableArray.traverse(dictApplicative);
  const traverseTypeVarBinding1 = traverseTypeVarBinding(dictApplicative);
  const traverse5 = Data$dTraversable.traversableTuple.traverse(dictApplicative);
  return k => v => {
    if (v.tag === "TypeRow") { return Functor0.map(PureScript$dCST$dTypes.TypeRow)(traverseWrapped1(traverseRow1(k), v._1)); }
    if (v.tag === "TypeRecord") { return Functor0.map(PureScript$dCST$dTypes.TypeRecord)(traverseWrapped1(traverseRow1(k), v._1)); }
    if (v.tag === "TypeForall") {
      return Apply0.apply(Functor0.map(f => f(v._3))(Functor0.map(PureScript$dCST$dTypes.TypeForall(v._1))(traverse4(traverseTypeVarBinding1(k))(v._2))))(k.onType(v._4));
    }
    if (v.tag === "TypeKinded") { return Apply0.apply(Functor0.map(f => f(v._2))(Functor0.map(PureScript$dCST$dTypes.TypeKinded)(k.onType(v._1))))(k.onType(v._3)); }
    if (v.tag === "TypeApp") { return Apply0.apply(Functor0.map(PureScript$dCST$dTypes.TypeApp)(k.onType(v._1)))(traverse4(k.onType)(v._2)); }
    if (v.tag === "TypeOp") { return Apply0.apply(Functor0.map(PureScript$dCST$dTypes.TypeOp)(k.onType(v._1)))(traverse4(traverse5(k.onType))(v._2)); }
    if (v.tag === "TypeArrow") { return Apply0.apply(Functor0.map(f => f(v._2))(Functor0.map(PureScript$dCST$dTypes.TypeArrow)(k.onType(v._1))))(k.onType(v._3)); }
    if (v.tag === "TypeConstrained") { return Apply0.apply(Functor0.map(f => f(v._2))(Functor0.map(PureScript$dCST$dTypes.TypeConstrained)(k.onType(v._1))))(k.onType(v._3)); }
    if (v.tag === "TypeParens") { return Functor0.map(PureScript$dCST$dTypes.TypeParens)(traverseWrapped1(k.onType, v._1)); }
    return dictApplicative.pure(v);
  };
};
const traverseType1 = /* #__PURE__ */ traverseType(applicativeReaderT);
const traverseType2 = /* #__PURE__ */ traverseType(Control$dMonad$dFree.freeApplicative);
const traverseIfThenElse = dictApplicative => {
  const Apply0 = dictApplicative.Apply0();
  const map = Apply0.Functor0().map;
  return k => r => Apply0.apply(Apply0.apply(map(v => v1 => v2 => ({cond: v, true: v1, false: v2, else: r.else, keyword: r.keyword, then: r.then}))(k.onExpr(r.cond)))(k.onExpr(r.true)))(k.onExpr(r.false));
};
const traverseWhere = dictApplicative => {
  const Apply0 = dictApplicative.Apply0();
  const map = Apply0.Functor0().map;
  const traverse4 = Data$dTraversable.traversableMaybe.traverse(dictApplicative);
  const traverse5 = Data$dTraversable.traversableTuple.traverse(dictApplicative);
  const traverse6 = Data$dTraversable.traversableArray.traverse(dictApplicative);
  return k => v => Apply0.apply(map(expr => bindings => ({expr: expr, bindings: bindings}))(k.onExpr(v.expr)))(traverse4(traverse5(traverse6(traverseLetBinding(dictApplicative)(k))))(v.bindings));
};
const traverseValueBindingFields = dictApplicative => {
  const Apply0 = dictApplicative.Apply0();
  const map = Apply0.Functor0().map;
  const traverse4 = Data$dTraversable.traversableArray.traverse(dictApplicative);
  return k => v => Apply0.apply(map(v1 => v2 => ({binders: v1, guarded: v2, name: v.name}))(traverse4(k.onBinder)(v.binders)))(traverseGuarded(dictApplicative)(k)(v.guarded));
};
const traverseLetBinding = dictApplicative => {
  const Apply0 = dictApplicative.Apply0();
  const Functor0 = Apply0.Functor0();
  const map = dictApplicative.Apply0().Functor0().map;
  return k => v => {
    if (v.tag === "LetBindingSignature") {
      return Functor0.map(PureScript$dCST$dTypes.LetBindingSignature)(map(value => ({label: v._1.label, separator: v._1.separator, value: value}))(k.onType(v._1.value)));
    }
    if (v.tag === "LetBindingName") { return Functor0.map(PureScript$dCST$dTypes.LetBindingName)(traverseValueBindingFields(dictApplicative)(k)(v._1)); }
    if (v.tag === "LetBindingPattern") {
      return Apply0.apply(Functor0.map(f => f(v._2))(Functor0.map(PureScript$dCST$dTypes.LetBindingPattern)(k.onBinder(v._1))))(traverseWhere(dictApplicative)(k)(v._3));
    }
    if (v.tag === "LetBindingError") { return dictApplicative.pure(PureScript$dCST$dTypes.$LetBinding("LetBindingError", v._1)); }
    $runtime.fail();
  };
};
const traverseGuardedExpr = dictApplicative => {
  const Apply0 = dictApplicative.Apply0();
  const map = Apply0.Functor0().map;
  const traverseSeparated1 = traverseSeparated(dictApplicative);
  const traversePatternGuard1 = traversePatternGuard(dictApplicative);
  return k => v => Apply0.apply(map(ps => wh => ({bar: v.bar, patterns: ps, separator: v.separator, where: wh}))(traverseSeparated1(traversePatternGuard1(k))(v.patterns)))(traverseWhere(dictApplicative)(k)(v.where));
};
const traverseGuarded = dictApplicative => {
  const map = dictApplicative.Apply0().Functor0().map;
  const traverse4 = Data$dTraversable.traversableArray.traverse(dictApplicative);
  return k => v => {
    if (v.tag === "Unconditional") { return map(PureScript$dCST$dTypes.Unconditional(v._1))(traverseWhere(dictApplicative)(k)(v._2)); }
    if (v.tag === "Guarded") { return map(PureScript$dCST$dTypes.Guarded)(traverse4(traverseGuardedExpr(dictApplicative)(k))(v._1)); }
    $runtime.fail();
  };
};
const traverseInstanceBinding = dictApplicative => {
  const map = dictApplicative.Apply0().Functor0().map;
  const map$1 = dictApplicative.Apply0().Functor0().map;
  const traverseValueBindingFields1 = traverseValueBindingFields(dictApplicative);
  return k => v => {
    if (v.tag === "InstanceBindingSignature") {
      return map(PureScript$dCST$dTypes.InstanceBindingSignature)(map$1(value => ({label: v._1.label, separator: v._1.separator, value: value}))(k.onType(v._1.value)));
    }
    if (v.tag === "InstanceBindingName") { return map(PureScript$dCST$dTypes.InstanceBindingName)(traverseValueBindingFields1(k)(v._1)); }
    $runtime.fail();
  };
};
const traverseLetIn = dictApplicative => {
  const Apply0 = dictApplicative.Apply0();
  const map = Apply0.Functor0().map;
  const traverse4 = Data$dTraversable.traversableArray.traverse(dictApplicative);
  const traverseLetBinding1 = traverseLetBinding(dictApplicative);
  return k => l => Apply0.apply(map(v => v1 => ({bindings: v, body: v1, in: l.in, keyword: l.keyword}))(traverse4(traverseLetBinding1(k))(l.bindings)))(k.onExpr(l.body));
};
const traverseForeign = dictApplicative => {
  const map = dictApplicative.Apply0().Functor0().map;
  const map$1 = dictApplicative.Apply0().Functor0().map;
  const traverseLabeled1 = (k, v) => map$1(value => ({label: v.label, separator: v.separator, value: value}))(k(v.value));
  return k => v => {
    if (v.tag === "ForeignValue") { return map(PureScript$dCST$dTypes.ForeignValue)(traverseLabeled1(k.onType, v._1)); }
    if (v.tag === "ForeignData") { return map(PureScript$dCST$dTypes.ForeignData(v._1))(traverseLabeled1(k.onType, v._2)); }
    if (v.tag === "ForeignKind") { return dictApplicative.pure(v); }
    $runtime.fail();
  };
};
const traverseDoStatement = dictApplicative => {
  const Apply0 = dictApplicative.Apply0();
  const Functor0 = Apply0.Functor0();
  const traverse4 = Data$dTraversable.traversableArray.traverse(dictApplicative);
  const traverseLetBinding1 = traverseLetBinding(dictApplicative);
  return k => v => {
    if (v.tag === "DoLet") { return Functor0.map(PureScript$dCST$dTypes.DoLet(v._1))(traverse4(traverseLetBinding1(k))(v._2)); }
    if (v.tag === "DoDiscard") { return Functor0.map(PureScript$dCST$dTypes.DoDiscard)(k.onExpr(v._1)); }
    if (v.tag === "DoBind") { return Apply0.apply(Functor0.map(f => f(v._2))(Functor0.map(PureScript$dCST$dTypes.DoBind)(k.onBinder(v._1))))(k.onExpr(v._3)); }
    if (v.tag === "DoError") { return dictApplicative.pure(PureScript$dCST$dTypes.$DoStatement("DoError", v._1)); }
    $runtime.fail();
  };
};
const traverseDoBlock = dictApplicative => {
  const map = dictApplicative.Apply0().Functor0().map;
  const traverse4 = Data$dTraversable.traversableArray.traverse(dictApplicative);
  const traverseDoStatement1 = traverseDoStatement(dictApplicative);
  return k => d => map(v => ({statements: v, keyword: d.keyword}))(traverse4(traverseDoStatement1(k))(d.statements));
};
const traverseDelimitedNonEmpty = dictApplicative => {
  const map = dictApplicative.Apply0().Functor0().map;
  const traverseSeparated1 = traverseSeparated(dictApplicative);
  return k => {
    const $4 = traverseSeparated1(k);
    return v => map(value => ({open: v.open, value: value, close: v.close}))($4(v.value));
  };
};
const traverseOneOrDelimited = dictApplicative => {
  const map = dictApplicative.Apply0().Functor0().map;
  const traverseDelimitedNonEmpty1 = traverseDelimitedNonEmpty(dictApplicative);
  return k => v => {
    if (v.tag === "One") { return map(PureScript$dCST$dTypes.One)(k(v._1)); }
    if (v.tag === "Many") { return map(PureScript$dCST$dTypes.Many)(traverseDelimitedNonEmpty1(k)(v._1)); }
    $runtime.fail();
  };
};
const traverseInstanceHead = dictApplicative => {
  const Apply0 = dictApplicative.Apply0();
  const map = Apply0.Functor0().map;
  const traverse4 = Data$dTraversable.traversableMaybe.traverse(dictApplicative);
  const bitraverse2 = Data$dBitraversable.bitraversableTuple.bitraverse(dictApplicative);
  const traverseOneOrDelimited1 = traverseOneOrDelimited(dictApplicative);
  const traverse5 = Data$dTraversable.traversableArray.traverse(dictApplicative);
  return k => head => Apply0.apply(map(v => v1 => ({constraints: v, types: v1, className: head.className, keyword: head.keyword, name: head.name}))(traverse4(bitraverse2(traverseOneOrDelimited1(k.onType))(dictApplicative.pure))(head.constraints)))(traverse5(k.onType)(head.types));
};
const traverseInstance = dictApplicative => {
  const Apply0 = dictApplicative.Apply0();
  const map = Apply0.Functor0().map;
  const traverseInstanceHead1 = traverseInstanceHead(dictApplicative);
  const traverse4 = Data$dTraversable.traversableMaybe.traverse(dictApplicative);
  const traverse5 = Data$dTraversable.traversableTuple.traverse(dictApplicative);
  const traverse6 = Data$dTraversable.traversableArray.traverse(dictApplicative);
  const traverseInstanceBinding1 = traverseInstanceBinding(dictApplicative);
  return k => v => Apply0.apply(map(head => body => ({head: head, body: body}))(traverseInstanceHead1(k)(v.head)))(traverse4(traverse5(traverse6(traverseInstanceBinding1(k))))(v.body));
};
const traverseDelimited = dictApplicative => {
  const map = dictApplicative.Apply0().Functor0().map;
  const traverse4 = Data$dTraversable.traversableMaybe.traverse(dictApplicative);
  const traverseSeparated1 = traverseSeparated(dictApplicative);
  return k => {
    const $5 = traverse4(traverseSeparated1(k));
    return v => map(value => ({open: v.open, value: value, close: v.close}))($5(v.value));
  };
};
const traverseDataHead = dictApplicative => {
  const map = dictApplicative.Apply0().Functor0().map;
  const traverse4 = Data$dTraversable.traversableArray.traverse(dictApplicative);
  const traverseTypeVarBinding1 = traverseTypeVarBinding(dictApplicative);
  return k => head => map(v => ({vars: v, keyword: head.keyword, name: head.name}))(traverse4(traverseTypeVarBinding1(k))(head.vars));
};
const traverseDataCtor = dictApplicative => {
  const map = dictApplicative.Apply0().Functor0().map;
  const traverse4 = Data$dTraversable.traversableArray.traverse(dictApplicative);
  return k => v => map(fields => ({name: v.name, fields: fields}))(traverse4(k.onType)(v.fields));
};
const traverseClassHead = dictApplicative => {
  const Apply0 = dictApplicative.Apply0();
  const map = Apply0.Functor0().map;
  const traverse4 = Data$dTraversable.traversableMaybe.traverse(dictApplicative);
  const bitraverse2 = Data$dBitraversable.bitraversableTuple.bitraverse(dictApplicative);
  const traverseOneOrDelimited1 = traverseOneOrDelimited(dictApplicative);
  const traverse5 = Data$dTraversable.traversableArray.traverse(dictApplicative);
  const traverseTypeVarBinding1 = traverseTypeVarBinding(dictApplicative);
  return k => head => Apply0.apply(map(v => v1 => ({super: v, vars: v1, fundeps: head.fundeps, keyword: head.keyword, name: head.name}))(traverse4(bitraverse2(traverseOneOrDelimited1(k.onType))(dictApplicative.pure))(head.super)))(traverse5(traverseTypeVarBinding1(k))(head.vars));
};
const traverseDecl = dictApplicative => {
  const Apply0 = dictApplicative.Apply0();
  const Functor0 = Apply0.Functor0();
  const traverseDataHead1 = traverseDataHead(dictApplicative);
  const traverse4 = Data$dTraversable.traversableMaybe.traverse(dictApplicative);
  const traverse5 = Data$dTraversable.traversableTuple.traverse(dictApplicative);
  const traverseSeparated1 = traverseSeparated(dictApplicative);
  const traverseDataCtor1 = traverseDataCtor(dictApplicative);
  const traverseClassHead1 = traverseClassHead(dictApplicative);
  const traverse6 = Data$dTraversable.traversableArray.traverse(dictApplicative);
  const map = dictApplicative.Apply0().Functor0().map;
  const traverseLabeled1 = k => v => map(value => ({label: v.label, separator: v.separator, value: value}))(k(v.value));
  const traverseInstance1 = traverseInstance(dictApplicative);
  const traverseInstanceHead1 = traverseInstanceHead(dictApplicative);
  const traverseValueBindingFields1 = traverseValueBindingFields(dictApplicative);
  const traverseForeign1 = traverseForeign(dictApplicative);
  return k => v => {
    if (v.tag === "DeclData") {
      return Apply0.apply(Functor0.map(PureScript$dCST$dTypes.DeclData)(traverseDataHead1(k)(v._1)))(traverse4(traverse5(traverseSeparated1(traverseDataCtor1(k))))(v._2));
    }
    if (v.tag === "DeclType") { return Apply0.apply(Functor0.map(f => f(v._2))(Functor0.map(PureScript$dCST$dTypes.DeclType)(traverseDataHead1(k)(v._1))))(k.onType(v._3)); }
    if (v.tag === "DeclNewtype") {
      return Apply0.apply(Functor0.map(f => f(v._3))(Functor0.map(f => f(v._2))(Functor0.map(PureScript$dCST$dTypes.DeclNewtype)(traverseDataHead1(k)(v._1)))))(k.onType(v._4));
    }
    if (v.tag === "DeclClass") {
      return Apply0.apply(Functor0.map(PureScript$dCST$dTypes.DeclClass)(traverseClassHead1(k)(v._1)))(traverse4(traverse5(traverse6(traverseLabeled1(k.onType))))(v._2));
    }
    if (v.tag === "DeclInstanceChain") { return Functor0.map(PureScript$dCST$dTypes.DeclInstanceChain)(traverseSeparated1(traverseInstance1(k))(v._1)); }
    if (v.tag === "DeclDerive") { return Functor0.map(PureScript$dCST$dTypes.DeclDerive(v._1)(v._2))(traverseInstanceHead1(k)(v._3)); }
    if (v.tag === "DeclKindSignature") { return Functor0.map(PureScript$dCST$dTypes.DeclKindSignature(v._1))(traverseLabeled1(k.onType)(v._2)); }
    if (v.tag === "DeclSignature") { return Functor0.map(PureScript$dCST$dTypes.DeclSignature)(traverseLabeled1(k.onType)(v._1)); }
    if (v.tag === "DeclValue") { return Functor0.map(PureScript$dCST$dTypes.DeclValue)(traverseValueBindingFields1(k)(v._1)); }
    if (v.tag === "DeclForeign") { return Functor0.map(PureScript$dCST$dTypes.DeclForeign(v._1)(v._2))(traverseForeign1(k)(v._3)); }
    return dictApplicative.pure(v);
  };
};
const traverseDecl1 = /* #__PURE__ */ traverseDecl(applicativeReaderT);
const traverseDecl2 = /* #__PURE__ */ traverseDecl(Control$dMonad$dFree.freeApplicative);
const traverseCaseOf = dictApplicative => {
  const Apply0 = dictApplicative.Apply0();
  const map = Apply0.Functor0().map;
  const traverseSeparated1 = traverseSeparated(dictApplicative);
  const traverse4 = Data$dTraversable.traversableArray.traverse(dictApplicative);
  const bitraverse1 = Data$dBitraversable.bitraversableTuple.bitraverse(dictApplicative);
  const traverseGuarded1 = traverseGuarded(dictApplicative);
  return k => r => Apply0.apply(map(v => v1 => ({head: v, branches: v1, keyword: r.keyword, of: r.of}))(traverseSeparated1(k.onExpr)(r.head)))(traverse4(bitraverse1(traverseSeparated1(k.onBinder))(traverseGuarded1(k)))(r.branches));
};
const traverseBinder = dictApplicative => {
  const Apply0 = dictApplicative.Apply0();
  const Functor0 = Apply0.Functor0();
  const traverse4 = Data$dTraversable.traversableArray.traverse(dictApplicative);
  const traverseDelimited1 = traverseDelimited(dictApplicative);
  const traverseRecordLabeled1 = traverseRecordLabeled(dictApplicative);
  const map = dictApplicative.Apply0().Functor0().map;
  const traverse5 = Data$dTraversable.traversableArray.traverse(dictApplicative);
  const traverse6 = Data$dTraversable.traversableTuple.traverse(dictApplicative);
  return k => v => {
    if (v.tag === "BinderNamed") { return Functor0.map(PureScript$dCST$dTypes.BinderNamed(v._1)(v._2))(k.onBinder(v._3)); }
    if (v.tag === "BinderConstructor") { return Functor0.map(PureScript$dCST$dTypes.BinderConstructor(v._1))(traverse4(k.onBinder)(v._2)); }
    if (v.tag === "BinderArray") { return Functor0.map(PureScript$dCST$dTypes.BinderArray)(traverseDelimited1(k.onBinder)(v._1)); }
    if (v.tag === "BinderRecord") { return Functor0.map(PureScript$dCST$dTypes.BinderRecord)(traverseDelimited1(traverseRecordLabeled1(k.onBinder))(v._1)); }
    if (v.tag === "BinderParens") {
      return Functor0.map(PureScript$dCST$dTypes.BinderParens)(map(value => ({open: v._1.open, value: value, close: v._1.close}))(k.onBinder(v._1.value)));
    }
    if (v.tag === "BinderTyped") { return Apply0.apply(Functor0.map(f => f(v._2))(Functor0.map(PureScript$dCST$dTypes.BinderTyped)(k.onBinder(v._1))))(k.onType(v._3)); }
    if (v.tag === "BinderOp") { return Apply0.apply(Functor0.map(PureScript$dCST$dTypes.BinderOp)(k.onBinder(v._1)))(traverse5(traverse6(k.onBinder))(v._2)); }
    return dictApplicative.pure(v);
  };
};
const traverseBinder1 = /* #__PURE__ */ traverseBinder(applicativeReaderT);
const traverseBinder2 = /* #__PURE__ */ traverseBinder(Control$dMonad$dFree.freeApplicative);
const traverseAdoBlock = dictApplicative => {
  const Apply0 = dictApplicative.Apply0();
  const map = Apply0.Functor0().map;
  const traverse4 = Data$dTraversable.traversableArray.traverse(dictApplicative);
  const traverseDoStatement1 = traverseDoStatement(dictApplicative);
  return k => a => Apply0.apply(map(v => v1 => ({statements: v, result: v1, in: a.in, keyword: a.keyword}))(traverse4(traverseDoStatement1(k))(a.statements)))(k.onExpr(a.result));
};
const traverseExpr = dictApplicative => {
  const Apply0 = dictApplicative.Apply0();
  const Functor0 = Apply0.Functor0();
  const traverseDelimited1 = traverseDelimited(dictApplicative);
  const traverseRecordLabeled1 = traverseRecordLabeled(dictApplicative);
  const map = dictApplicative.Apply0().Functor0().map;
  const traverseWrapped1 = k => v => map(value => ({open: v.open, value: value, close: v.close}))(k(v.value));
  const traverse4 = Data$dTraversable.traversableArray.traverse(dictApplicative);
  const bitraverse1 = Data$dBitraversable.bitraversableTuple.bitraverse(dictApplicative);
  const traverse5 = Data$dTraversable.traversableTuple.traverse(dictApplicative);
  const map$1 = dictApplicative.Apply0().Functor0().map;
  const traverseSeparated1 = traverseSeparated(dictApplicative);
  const traverseRecordUpdate1 = traverseRecordUpdate(dictApplicative);
  const traverseLambda1 = traverseLambda(dictApplicative);
  const Apply0$1 = dictApplicative.Apply0();
  const map$2 = Apply0$1.Functor0().map;
  const traverseCaseOf1 = traverseCaseOf(dictApplicative);
  const traverseLetIn1 = traverseLetIn(dictApplicative);
  const traverseDoBlock1 = traverseDoBlock(dictApplicative);
  const traverseAdoBlock1 = traverseAdoBlock(dictApplicative);
  return k => v => {
    if (v.tag === "ExprArray") { return Functor0.map(PureScript$dCST$dTypes.ExprArray)(traverseDelimited1(k.onExpr)(v._1)); }
    if (v.tag === "ExprRecord") { return Functor0.map(PureScript$dCST$dTypes.ExprRecord)(traverseDelimited1(traverseRecordLabeled1(k.onExpr))(v._1)); }
    if (v.tag === "ExprParens") { return Functor0.map(PureScript$dCST$dTypes.ExprParens)(traverseWrapped1(k.onExpr)(v._1)); }
    if (v.tag === "ExprTyped") { return Apply0.apply(Functor0.map(f => f(v._2))(Functor0.map(PureScript$dCST$dTypes.ExprTyped)(k.onExpr(v._1))))(k.onType(v._3)); }
    if (v.tag === "ExprInfix") {
      return Apply0.apply(Functor0.map(PureScript$dCST$dTypes.ExprInfix)(k.onExpr(v._1)))(traverse4(bitraverse1(traverseWrapped1(k.onExpr))(k.onExpr))(v._2));
    }
    if (v.tag === "ExprOp") { return Apply0.apply(Functor0.map(PureScript$dCST$dTypes.ExprOp)(k.onExpr(v._1)))(traverse4(traverse5(k.onExpr))(v._2)); }
    if (v.tag === "ExprNegate") { return Functor0.map(PureScript$dCST$dTypes.ExprNegate(v._1))(k.onExpr(v._2)); }
    if (v.tag === "ExprRecordAccessor") {
      return Functor0.map(PureScript$dCST$dTypes.ExprRecordAccessor)(map$1(v$1 => ({expr: v$1, dot: v._1.dot, path: v._1.path}))(k.onExpr(v._1.expr)));
    }
    if (v.tag === "ExprRecordUpdate") {
      return Apply0.apply(Functor0.map(PureScript$dCST$dTypes.ExprRecordUpdate)(k.onExpr(v._1)))(traverseWrapped1(traverseSeparated1(traverseRecordUpdate1(k)))(v._2));
    }
    if (v.tag === "ExprApp") { return Apply0.apply(Functor0.map(PureScript$dCST$dTypes.ExprApp)(k.onExpr(v._1)))(traverse4(k.onExpr)(v._2)); }
    if (v.tag === "ExprLambda") { return Functor0.map(PureScript$dCST$dTypes.ExprLambda)(traverseLambda1(k)(v._1)); }
    if (v.tag === "ExprIf") {
      return Functor0.map(PureScript$dCST$dTypes.ExprIf)(Apply0$1.apply(Apply0$1.apply(map$2(v$1 => v1 => v2 => (
        {cond: v$1, true: v1, false: v2, else: v._1.else, keyword: v._1.keyword, then: v._1.then}
      ))(k.onExpr(v._1.cond)))(k.onExpr(v._1.true)))(k.onExpr(v._1.false)));
    }
    if (v.tag === "ExprCase") { return Functor0.map(PureScript$dCST$dTypes.ExprCase)(traverseCaseOf1(k)(v._1)); }
    if (v.tag === "ExprLet") { return Functor0.map(PureScript$dCST$dTypes.ExprLet)(traverseLetIn1(k)(v._1)); }
    if (v.tag === "ExprDo") { return Functor0.map(PureScript$dCST$dTypes.ExprDo)(traverseDoBlock1(k)(v._1)); }
    if (v.tag === "ExprAdo") { return Functor0.map(PureScript$dCST$dTypes.ExprAdo)(traverseAdoBlock1(k)(v._1)); }
    return dictApplicative.pure(v);
  };
};
const traverseExpr1 = /* #__PURE__ */ traverseExpr(applicativeReaderT);
const traverseExpr2 = /* #__PURE__ */ traverseExpr(Control$dMonad$dFree.freeApplicative);
const topDownTraversalWithContextM = dictMonad => {
  const bind2 = dictMonad.Bind1().bind;
  const $2 = dictMonad.Applicative0();
  const $3 = $2.Apply0();
  const $4 = $3.Functor0();
  const functorReaderT1 = {
    map: x => {
      const $6 = $4.map(x);
      return v => x$1 => $6(v(x$1));
    }
  };
  const applyReaderT1 = {apply: v => v1 => r => $3.apply(v(r))(v1(r)), Functor0: () => functorReaderT1};
  const applicativeReaderT1 = {
    pure: x => {
      const $8 = $2.pure(x);
      return v => $8;
    },
    Apply0: () => applyReaderT1
  };
  const traverseBinder3 = traverseBinder(applicativeReaderT1);
  const traverseExpr3 = traverseExpr(applicativeReaderT1);
  const traverseDecl3 = traverseDecl(applicativeReaderT1);
  const traverseType3 = traverseType(applicativeReaderT1);
  return visitor => {
    const visitor$p = {
      onBinder: a => ctx => bind2(visitor.onBinder(ctx)(a))((() => {
        const $16 = traverseBinder3(visitor$p);
        return v => $16(v._2)(v._1);
      })()),
      onExpr: a => ctx => bind2(visitor.onExpr(ctx)(a))((() => {
        const $16 = traverseExpr3(visitor$p);
        return v => $16(v._2)(v._1);
      })()),
      onDecl: a => ctx => bind2(visitor.onDecl(ctx)(a))((() => {
        const $16 = traverseDecl3(visitor$p);
        return v => $16(v._2)(v._1);
      })()),
      onType: a => ctx => bind2(visitor.onType(ctx)(a))((() => {
        const $16 = traverseType3(visitor$p);
        return v => $16(v._2)(v._1);
      })())
    };
    return visitor$p;
  };
};
const topDownTraversalWithContext = visitor => {
  const visitor$p = {
    onBinder: a => ctx => {
      const $4 = visitor.onBinder(ctx)(a);
      return traverseBinder1(visitor$p)($4._2)($4._1);
    },
    onExpr: a => ctx => {
      const $4 = visitor.onExpr(ctx)(a);
      return traverseExpr1(visitor$p)($4._2)($4._1);
    },
    onDecl: a => ctx => {
      const $4 = visitor.onDecl(ctx)(a);
      return traverseDecl1(visitor$p)($4._2)($4._1);
    },
    onType: a => ctx => {
      const $4 = visitor.onType(ctx)(a);
      return traverseType1(visitor$p)($4._2)($4._1);
    }
  };
  return visitor$p;
};
const topDownTraversal = dictMonad => {
  const bind2 = dictMonad.Bind1().bind;
  const Applicative0 = dictMonad.Applicative0();
  const traverseBinder3 = traverseBinder(Applicative0);
  const traverseExpr3 = traverseExpr(Applicative0);
  const traverseType3 = traverseType(Applicative0);
  const traverseDecl3 = traverseDecl(Applicative0);
  return visitor => {
    const visitor$p = {
      onBinder: a => bind2(visitor.onBinder(a))(traverseBinder3(visitor$p)),
      onExpr: a => bind2(visitor.onExpr(a))(traverseExpr3(visitor$p)),
      onType: a => bind2(visitor.onType(a))(traverseType3(visitor$p)),
      onDecl: a => bind2(visitor.onDecl(a))(traverseDecl3(visitor$p))
    };
    return visitor$p;
  };
};
const topDownPureTraversal = visitor => {
  const visitor$p = {
    onBinder: a => Control$dMonad$dFree.$Free(
      Control$dMonad$dFree.$FreeView("Return", visitor.onBinder(a)),
      Data$dCatList.link(Data$dCatList.CatNil)(Data$dCatList.$CatList("CatCons", traverseBinder2(visitor$p), Data$dCatQueue.$CatQueue(Data$dList$dTypes.Nil, Data$dList$dTypes.Nil)))
    ),
    onExpr: a => Control$dMonad$dFree.$Free(
      Control$dMonad$dFree.$FreeView("Return", visitor.onExpr(a)),
      Data$dCatList.link(Data$dCatList.CatNil)(Data$dCatList.$CatList("CatCons", traverseExpr2(visitor$p), Data$dCatQueue.$CatQueue(Data$dList$dTypes.Nil, Data$dList$dTypes.Nil)))
    ),
    onType: a => Control$dMonad$dFree.$Free(
      Control$dMonad$dFree.$FreeView("Return", visitor.onType(a)),
      Data$dCatList.link(Data$dCatList.CatNil)(Data$dCatList.$CatList("CatCons", traverseType2(visitor$p), Data$dCatQueue.$CatQueue(Data$dList$dTypes.Nil, Data$dList$dTypes.Nil)))
    ),
    onDecl: a => Control$dMonad$dFree.$Free(
      Control$dMonad$dFree.$FreeView("Return", visitor.onDecl(a)),
      Data$dCatList.link(Data$dCatList.CatNil)(Data$dCatList.$CatList("CatCons", traverseDecl2(visitor$p), Data$dCatQueue.$CatQueue(Data$dList$dTypes.Nil, Data$dList$dTypes.Nil)))
    )
  };
  return visitor$p;
};
const rewriteWithContextM = dictMonad => {
  const topDownTraversalWithContextM1 = topDownTraversalWithContextM(dictMonad);
  const map = dictMonad.Bind1().Apply0().Functor0().map;
  return traversal => visitor => ctx => g => map(Data$dTuple.Tuple(ctx))(traversal(topDownTraversalWithContextM1(visitor))(g)(ctx));
};
const rewriteWithContext = traversal => visitor => ctx => g => Data$dTuple.$Tuple(ctx, traversal(topDownTraversalWithContext(visitor))(g)(ctx));
const rewriteTypeWithContextM = dictMonad => rewriteWithContextM(dictMonad)(v => v.onType);
const rewriteTypeWithContext = visitor => ctx => g => Data$dTuple.$Tuple(ctx, topDownTraversalWithContext(visitor).onType(g)(ctx));
const rewriteTopDownM = dictMonad => {
  const topDownTraversal1 = topDownTraversal(dictMonad);
  return traversal => visitor => traversal(topDownTraversal1(visitor));
};
const rewriteTypeTopDownM = dictMonad => {
  const topDownTraversal1 = topDownTraversal(dictMonad);
  return visitor => topDownTraversal1(visitor).onType;
};
const rewriteTopDown = traversal => visitor => {
  const $2 = Control$dMonad$dFree.runFree(Data$dIdentity.functorIdentity)(Unsafe$dCoerce.unsafeCoerce);
  const $3 = traversal(topDownPureTraversal(visitor));
  return x => $2($3(x));
};
const rewriteTypeTopDown = /* #__PURE__ */ rewriteTopDown(v => v.onType);
const rewriteModuleWithContextM = dictMonad => rewriteWithContextM(dictMonad)(traverseModule((() => {
  const $1 = dictMonad.Applicative0();
  const $2 = $1.Apply0();
  const $3 = $2.Functor0();
  const functorReaderT1 = {
    map: x => {
      const $5 = $3.map(x);
      return v => x$1 => $5(v(x$1));
    }
  };
  const applyReaderT1 = {apply: v => v1 => r => $2.apply(v(r))(v1(r)), Functor0: () => functorReaderT1};
  return {
    pure: x => {
      const $7 = $1.pure(x);
      return v => $7;
    },
    Apply0: () => applyReaderT1
  };
})()));
const rewriteModuleWithContext = /* #__PURE__ */ rewriteWithContext(/* #__PURE__ */ traverseModule(applicativeReaderT));
const rewriteModuleTopDownM = dictMonad => {
  const topDownTraversal1 = topDownTraversal(dictMonad);
  const $2 = traverseModule(dictMonad.Applicative0());
  return visitor => $2(topDownTraversal1(visitor));
};
const rewriteModuleTopDown = /* #__PURE__ */ rewriteTopDown(traverseModule1);
const rewriteExprWithContextM = dictMonad => rewriteWithContextM(dictMonad)(v => v.onExpr);
const rewriteExprWithContext = visitor => ctx => g => Data$dTuple.$Tuple(ctx, topDownTraversalWithContext(visitor).onExpr(g)(ctx));
const rewriteExprTopDownM = dictMonad => {
  const topDownTraversal1 = topDownTraversal(dictMonad);
  return visitor => topDownTraversal1(visitor).onExpr;
};
const rewriteExprTopDown = /* #__PURE__ */ rewriteTopDown(v => v.onExpr);
const rewriteDeclWithContextM = dictMonad => rewriteWithContextM(dictMonad)(v => v.onDecl);
const rewriteDeclWithContext = visitor => ctx => g => Data$dTuple.$Tuple(ctx, topDownTraversalWithContext(visitor).onDecl(g)(ctx));
const rewriteDeclTopDownM = dictMonad => {
  const topDownTraversal1 = topDownTraversal(dictMonad);
  return visitor => topDownTraversal1(visitor).onDecl;
};
const rewriteDeclTopDown = /* #__PURE__ */ rewriteTopDown(v => v.onDecl);
const rewriteBinderWithContextM = dictMonad => rewriteWithContextM(dictMonad)(v => v.onBinder);
const rewriteBinderWithContext = visitor => ctx => g => Data$dTuple.$Tuple(ctx, topDownTraversalWithContext(visitor).onBinder(g)(ctx));
const rewriteBinderTopDownM = dictMonad => {
  const topDownTraversal1 = topDownTraversal(dictMonad);
  return visitor => topDownTraversal1(visitor).onBinder;
};
const rewriteBinderTopDown = /* #__PURE__ */ rewriteTopDown(v => v.onBinder);
const defer = dictMonad => {
  const bind2 = dictMonad.Bind1().bind;
  const pure2 = dictMonad.Applicative0().pure;
  return v => bind2(pure2(Data$dUnit.unit))(v);
};
const defer1 = /* #__PURE__ */ defer(Control$dMonad$dFree.freeMonad);
const topDownMonoidalTraversal = dictMonoid => {
  const apply = applyCompose((() => {
    const $1 = dictMonoid.Semigroup0();
    return {apply: v => v1 => $1.append(v)(v1), Functor0: () => Data$dConst.functorConst};
  })()).apply;
  const applicativeCompose1 = applicativeCompose(Data$dConst.applicativeConst(dictMonoid));
  const traverseBinder3 = traverseBinder(applicativeCompose1);
  const traverseExpr3 = traverseExpr(applicativeCompose1);
  const traverseDecl3 = traverseDecl(applicativeCompose1);
  const traverseType3 = traverseType(applicativeCompose1);
  return visitor => {
    const visitor$p = {
      onBinder: a => apply(Control$dMonad$dFree.$Free(Control$dMonad$dFree.$FreeView("Return", visitor.onBinder(a)), Data$dCatList.CatNil))(defer1(v => traverseBinder3(visitor$p)(a))),
      onExpr: a => apply(Control$dMonad$dFree.$Free(Control$dMonad$dFree.$FreeView("Return", visitor.onExpr(a)), Data$dCatList.CatNil))(defer1(v => traverseExpr3(visitor$p)(a))),
      onDecl: a => apply(Control$dMonad$dFree.$Free(Control$dMonad$dFree.$FreeView("Return", visitor.onDecl(a)), Data$dCatList.CatNil))(defer1(v => traverseDecl3(visitor$p)(a))),
      onType: a => apply(Control$dMonad$dFree.$Free(Control$dMonad$dFree.$FreeView("Return", visitor.onType(a)), Data$dCatList.CatNil))(defer1(v => traverseType3(visitor$p)(a)))
    };
    return visitor$p;
  };
};
const monoidalRewrite = dictMonoid => {
  const topDownMonoidalTraversal1 = topDownMonoidalTraversal(dictMonoid);
  return traversal => visitor => g => Control$dMonad$dFree.runFree(Data$dIdentity.functorIdentity)(Unsafe$dCoerce.unsafeCoerce)(traversal(topDownMonoidalTraversal1(visitor))(g));
};
const foldMapBinder = dictMonoid => monoidalRewrite(dictMonoid)(v => v.onBinder);
const foldMapDecl = dictMonoid => monoidalRewrite(dictMonoid)(v => v.onDecl);
const foldMapExpr = dictMonoid => monoidalRewrite(dictMonoid)(v => v.onExpr);
const foldMapModule = dictMonoid => monoidalRewrite(dictMonoid)(traverseModule(applicativeCompose(Data$dConst.applicativeConst(dictMonoid))));
const foldMapType = dictMonoid => monoidalRewrite(dictMonoid)(v => v.onType);
const defaultVisitorWithContextM = dictMonad => {
  const pure2 = dictMonad.Applicative0().pure;
  return {onBinder: Data$dTuple.curry(pure2), onDecl: Data$dTuple.curry(pure2), onExpr: Data$dTuple.curry(pure2), onType: Data$dTuple.curry(pure2)};
};
const defaultVisitorWithContext = {
  onBinder: /* #__PURE__ */ Data$dTuple.curry(identity),
  onDecl: /* #__PURE__ */ Data$dTuple.curry(identity),
  onExpr: /* #__PURE__ */ Data$dTuple.curry(identity),
  onType: /* #__PURE__ */ Data$dTuple.curry(identity)
};
const defaultVisitorM = dictApplicative => ({onBinder: dictApplicative.pure, onDecl: dictApplicative.pure, onExpr: dictApplicative.pure, onType: dictApplicative.pure});
const defaultVisitor = {onBinder: identity, onDecl: identity, onExpr: identity, onType: identity};
const defaultMonoidalVisitor = dictMonoid => ({onBinder: v => dictMonoid.mempty, onDecl: v => dictMonoid.mempty, onExpr: v => dictMonoid.mempty, onType: v => dictMonoid.mempty});
const bottomUpTraversal = dictMonad => {
  const $1 = dictMonad.Bind1();
  const defer2 = defer(dictMonad);
  const Applicative0 = dictMonad.Applicative0();
  const traverseBinder3 = traverseBinder(Applicative0);
  const traverseExpr3 = traverseExpr(Applicative0);
  const traverseType3 = traverseType(Applicative0);
  const traverseDecl3 = traverseDecl(Applicative0);
  return visitor => {
    const visitor$p = {
      onBinder: a => $1.bind(defer2(v => traverseBinder3(visitor$p)(a)))(visitor.onBinder),
      onExpr: a => $1.bind(defer2(v => traverseExpr3(visitor$p)(a)))(visitor.onExpr),
      onType: a => $1.bind(defer2(v => traverseType3(visitor$p)(a)))(visitor.onType),
      onDecl: a => $1.bind(defer2(v => traverseDecl3(visitor$p)(a)))(visitor.onDecl)
    };
    return visitor$p;
  };
};
const rewriteBottomUpM = dictMonad => {
  const bottomUpTraversal1 = bottomUpTraversal(dictMonad);
  return traversal => visitor => traversal(bottomUpTraversal1(visitor));
};
const rewriteBinderBottomUpM = dictMonad => {
  const bottomUpTraversal1 = bottomUpTraversal(dictMonad);
  return visitor => bottomUpTraversal1(visitor).onBinder;
};
const rewriteDeclBottomUpM = dictMonad => {
  const bottomUpTraversal1 = bottomUpTraversal(dictMonad);
  return visitor => bottomUpTraversal1(visitor).onDecl;
};
const rewriteExprBottomUpM = dictMonad => {
  const bottomUpTraversal1 = bottomUpTraversal(dictMonad);
  return visitor => bottomUpTraversal1(visitor).onExpr;
};
const rewriteModuleBottomUpM = dictMonad => {
  const bottomUpTraversal1 = bottomUpTraversal(dictMonad);
  const $2 = traverseModule(dictMonad.Applicative0());
  return visitor => $2(bottomUpTraversal1(visitor));
};
const rewriteTypeBottomUpM = dictMonad => {
  const bottomUpTraversal1 = bottomUpTraversal(dictMonad);
  return visitor => bottomUpTraversal1(visitor).onType;
};
const bottomUpPureTraversal = visitor => {
  const visitor$p = {
    onBinder: a => {
      const $3 = traverseBinder2(visitor$p)(a);
      return Control$dMonad$dFree.$Free(
        $3._1,
        Data$dCatList.link($3._2)(Data$dCatList.$CatList(
          "CatCons",
          x => Control$dMonad$dFree.$Free(Control$dMonad$dFree.$FreeView("Return", visitor.onBinder(x)), Data$dCatList.CatNil),
          Data$dCatQueue.$CatQueue(Data$dList$dTypes.Nil, Data$dList$dTypes.Nil)
        ))
      );
    },
    onExpr: a => {
      const $3 = traverseExpr2(visitor$p)(a);
      return Control$dMonad$dFree.$Free(
        $3._1,
        Data$dCatList.link($3._2)(Data$dCatList.$CatList(
          "CatCons",
          x => Control$dMonad$dFree.$Free(Control$dMonad$dFree.$FreeView("Return", visitor.onExpr(x)), Data$dCatList.CatNil),
          Data$dCatQueue.$CatQueue(Data$dList$dTypes.Nil, Data$dList$dTypes.Nil)
        ))
      );
    },
    onType: a => {
      const $3 = traverseType2(visitor$p)(a);
      return Control$dMonad$dFree.$Free(
        $3._1,
        Data$dCatList.link($3._2)(Data$dCatList.$CatList(
          "CatCons",
          x => Control$dMonad$dFree.$Free(Control$dMonad$dFree.$FreeView("Return", visitor.onType(x)), Data$dCatList.CatNil),
          Data$dCatQueue.$CatQueue(Data$dList$dTypes.Nil, Data$dList$dTypes.Nil)
        ))
      );
    },
    onDecl: a => {
      const $3 = traverseDecl2(visitor$p)(a);
      return Control$dMonad$dFree.$Free(
        $3._1,
        Data$dCatList.link($3._2)(Data$dCatList.$CatList(
          "CatCons",
          x => Control$dMonad$dFree.$Free(Control$dMonad$dFree.$FreeView("Return", visitor.onDecl(x)), Data$dCatList.CatNil),
          Data$dCatQueue.$CatQueue(Data$dList$dTypes.Nil, Data$dList$dTypes.Nil)
        ))
      );
    }
  };
  return visitor$p;
};
const rewriteBottomUp = traversal => visitor => {
  const $2 = Control$dMonad$dFree.runFree(Data$dIdentity.functorIdentity)(Unsafe$dCoerce.unsafeCoerce);
  const $3 = traversal(bottomUpPureTraversal(visitor));
  return x => $2($3(x));
};
const rewriteBinderBottomUp = /* #__PURE__ */ rewriteBottomUp(v => v.onBinder);
const rewriteDeclBottomUp = /* #__PURE__ */ rewriteBottomUp(v => v.onDecl);
const rewriteExprBottomUp = /* #__PURE__ */ rewriteBottomUp(v => v.onExpr);
const rewriteModuleBottomUp = /* #__PURE__ */ rewriteBottomUp(traverseModule1);
const rewriteTypeBottomUp = /* #__PURE__ */ rewriteBottomUp(v => v.onType);
export {
  applicativeCompose,
  applicativeReaderT,
  applyCompose,
  bottomUpPureTraversal,
  bottomUpTraversal,
  defaultMonoidalVisitor,
  defaultVisitor,
  defaultVisitorM,
  defaultVisitorWithContext,
  defaultVisitorWithContextM,
  defer,
  defer1,
  foldMapBinder,
  foldMapDecl,
  foldMapExpr,
  foldMapModule,
  foldMapType,
  identity,
  monoidalRewrite,
  rewriteBinderBottomUp,
  rewriteBinderBottomUpM,
  rewriteBinderTopDown,
  rewriteBinderTopDownM,
  rewriteBinderWithContext,
  rewriteBinderWithContextM,
  rewriteBottomUp,
  rewriteBottomUpM,
  rewriteDeclBottomUp,
  rewriteDeclBottomUpM,
  rewriteDeclTopDown,
  rewriteDeclTopDownM,
  rewriteDeclWithContext,
  rewriteDeclWithContextM,
  rewriteExprBottomUp,
  rewriteExprBottomUpM,
  rewriteExprTopDown,
  rewriteExprTopDownM,
  rewriteExprWithContext,
  rewriteExprWithContextM,
  rewriteModuleBottomUp,
  rewriteModuleBottomUpM,
  rewriteModuleTopDown,
  rewriteModuleTopDownM,
  rewriteModuleWithContext,
  rewriteModuleWithContextM,
  rewriteTopDown,
  rewriteTopDownM,
  rewriteTypeBottomUp,
  rewriteTypeBottomUpM,
  rewriteTypeTopDown,
  rewriteTypeTopDownM,
  rewriteTypeWithContext,
  rewriteTypeWithContextM,
  rewriteWithContext,
  rewriteWithContextM,
  topDownMonoidalTraversal,
  topDownPureTraversal,
  topDownTraversal,
  topDownTraversalWithContext,
  topDownTraversalWithContextM,
  traverseAdoBlock,
  traverseBinder,
  traverseBinder1,
  traverseBinder2,
  traverseCaseOf,
  traverseClassHead,
  traverseDataCtor,
  traverseDataHead,
  traverseDecl,
  traverseDecl1,
  traverseDecl2,
  traverseDelimited,
  traverseDelimitedNonEmpty,
  traverseDoBlock,
  traverseDoStatement,
  traverseExpr,
  traverseExpr1,
  traverseExpr2,
  traverseForeign,
  traverseGuarded,
  traverseGuardedExpr,
  traverseIfThenElse,
  traverseInstance,
  traverseInstanceBinding,
  traverseInstanceHead,
  traverseLabeled,
  traverseLambda,
  traverseLetBinding,
  traverseLetIn,
  traverseModule,
  traverseModule1,
  traverseModuleBody,
  traverseOneOrDelimited,
  traversePatternGuard,
  traverseRecordAccessor,
  traverseRecordLabeled,
  traverseRecordUpdate,
  traverseRow,
  traverseSeparated,
  traverseType,
  traverseType1,
  traverseType2,
  traverseTypeVarBinding,
  traverseValueBindingFields,
  traverseWhere,
  traverseWrapped
};
