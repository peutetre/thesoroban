function $(id) { return document.getElementById(id); }
function px(val) { return val+"px"; }
function prevent(evt) { evt.preventDefault(); evt.stopPropagation(); }
function bind(func, ctx) { return function (arg){return func.call(ctx,arg);};}
function on(event, elt, handler) {elt.addEventListener(event, handler, false);}
function translate(pos) { return "translate3d(0," + pos + "px,0)"; }
