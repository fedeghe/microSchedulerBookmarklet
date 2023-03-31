parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"yU5q":[function(require,module,exports) {
"use strict";const t=function(t,n,i){function e(t,n){this.fn=t,this.interval=n,this.int=0,this.counter=0,this.initDate=+new Date,this.active=!1,this.paused=!1,this._onErr=null,this._onEnd=null,this._onPause=null,this._onResume=null,this._pause=null,this._resume=null}var s=function(t){return"function"==typeof t};return e.prototype.onEnd=function(t){return s(t)&&(this._onEnd=t),this},e.prototype.onErr=function(t){return s(t)&&(this._onErr=t),this},e.prototype.onPause=function(t){return s(t)&&(this._onPause=t),this},e.prototype.onResume=function(t){return s(t)&&(this._onResume=t),this},e.prototype.end=function(){return this.active=!1,this._onEnd&&this._onEnd(this),this},e.prototype.endsIn=function(t){var n=this;return setTimeout(function(){n.end()},t),this},e.prototype.pause=function(){return this.paused=!0,this._onPause&&this._onPause(this),this},e.prototype.resume=function(){return this.paused=!1,this._onResume&&this._onResume(this),this},e.prototype.runIfActive=function(){return this.active&&this.run(),this},e.prototype.run=function(t){this.active=!0;var n=this;return this.int=this.interval+(this.initDate+this.counter++*this.interval-new Date),t&&t(n),setTimeout(function(){if(!n.paused&&n.active)try{n.fn(n.counter-1)}catch(t){n._onErr&&n._onErr(t,n),n.active=!1}n.runIfActive()},n.int),this},function(t,n){return new e(t,n)}}();"object"==typeof exports&&(module.exports=t);
},{}],"R8tU":[function(require,module,exports) {
"use strict";const t=require("@fedeghe/interval"),i=function(){function i(t,i){this.fn=t,this.horizont=i,this.baseHorizont=i,this.to=null,this.active=!1,this.paused=!1,this._onErr=null,this._onEnd=null,this._onTick=null,this.tick=null,this.ticker=null,this.startPause=0,this.pauseSpan=0,this.updates=0,this._onUpdate=null,this._update=null,this._onPause=null,this._pause=null,this._onResume=null,this._resume=null}var e=function(t){return"function"==typeof t};return i.prototype.end=function(){return this.active=!1,this._onEnd&&this._onEnd(),this.ticker&&this.ticker.end(),clearTimeout(this.to),this},i.prototype.onEnd=function(t){return e(t)&&(this._onEnd=t),this},i.prototype.onErr=function(t){return e(t)&&(this._onErr=t),this},i.prototype.onPause=function(t){return e(t)&&(this._onPause=t),this},i.prototype.onResume=function(t){return e(t)&&(this._onResume=t),this},i.prototype.onUpdate=function(t){return e(t)&&(this._onUpdate=t),this},i.prototype.pause=function(){return this.paused=!0,this._onPause&&this._onPause(this),this.to&&clearTimeout(this.to),this.startPause=+new Date,this.ticker&&this.ticker.pause(),this},i.prototype.resume=function(){return this.paused=!1,this._onResume&&this._onResume(this),this.pauseSpan=+new Date-this.startPause,this.horizont-=this.pauseSpan,this.run(!1,!0),this.ticker&&this.ticker.resume(),this},i.prototype.getStatus=function(){var t=+new Date-this.startTime-this.pauseSpan;return{elapsed:t,remaining:this.horizont-t+this.updates,progress:100*t/this.horizont}},i.prototype.run=function(t,i){var e=this;return this.startTime=this.startTime||+new Date,this.active=!0,t&&t(e),this.to=setTimeout(function(){try{e.fn(),e.end(),e.ticker&&e.ticker.end()}catch(t){e._onErr&&e._onErr(t,e),e.active=!1}},this.horizont),!i&&this.ticker&&this.ticker.run(),this},i.prototype.update=function(t){var i=parseInt(t);this.updates=i;var e=+new Date-this.startTime-this.pauseSpan,s=i+(this.baseHorizont-e);return this.baseHorizont=e+s,s&&s>0&&(this._onUpdate&&this._onUpdate(this),this.horizont=s,this.to&&clearTimeout(this.to),this.run()),this},i.prototype.onTick=function(i,e){var s=this;return this.ticker=t(function(t){var e=+new Date-s.startTime-s.pauseSpan,n=s.baseHorizont-e,r=parseFloat((100*e/s.baseHorizont).toFixed(3),10);i({cycle:t,elapsed:e,remaining:n,progress:r})},e),this},function(t,e){return new i(t,e)}}();"object"==typeof exports&&(module.exports=i);
},{"@fedeghe/interval":"yU5q"}],"Focm":[function(require,module,exports) {
var e=require("@fedeghe/countdown");!function(){var n={container:{fontFamily:"verdana",padding:"5px",backgroundColor:"white",position:"fixed",top:"-5px",right:"-5px",paddingTop:"10px",paddingRight:"20px",border:"1px dashed #aaa",borderRadius:"5px",opacity:"0.7",display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center"},close:{position:"absolute",right:"10px",top:"5px",width:"10px",height:"10px",cursor:"pointer"},plus:{width:"20px",height:"20px"},label:{color:"red"},progress:{accentColor:"green",height:"20px"},remaining:{fontSize:"1em",fontWeight:"bold"},complete:{fontWeight:"bold"},newrun:{fontSize:"0.8em",color:"green",cursor:"pointer"},rerun:{fontSize:"1.4em",lineHeight:"0.8em",color:"green",cursor:"pointer"},flash:{filter:"invert(100%)",transition:"filter .3s ease-in-out"}},i=document.body;function r(e){var n=~~(e%3600/60),i=~~(e%60);return"".concat(~~(e/3600),"h ").concat(n,"m ").concat(i,"s")}function t(e,n){var i=n.attrs,r=void 0===i?null:i,t=n.style,o=void 0===t?null:t,l=document.createElement(e);if(r)for(a in r)l.setAttribute(a,r[a]);if(o)for(s in o)l.style[s]=o[s];return l}function o(n,i,t,o){console.log(JSON.stringify(n,null,2)),function n(i,t,o,l){var d=i[t][0],a=i[t][1];o.label(d);o.progress(1e3);o.remaining(r(60*a));e(function(){console.log(i.length,t+1,i.length>t+1),i.length>t+1?n(i,t+1,o,l):(console.log("complete"),l())},6e4*a).onTick(function(e){var n=e.progress,i=e.remaining;o.progress(100-n),o.remaining(r(Math.ceil(i/1e3)))},1e3).run()}(Object.entries(n),0,i,o),t()}!function(){var e=t("div",{style:n.container}),r=t("input",{attrs:{type:"file",name:"file",accept:"application/json"}}),l=t("div",{style:n.close}),d=t("div",{style:n.label}),a=t("progress",{style:n.progress,attrs:{value:0,max:100}}),p=t("div",{style:n.remaining});function s(){e.removeChild(d),e.removeChild(a),e.removeChild(p),e.appendChild(end),e.appendChild(rerun),e.appendChild(newrun)}function c(e){d.innerHTML=e}function u(e){a.setAttribute("value",e)}function h(e){p.innerHTML=e}end=t("div",{style:n.complete}),newrun=t("div",{style:n.newrun}),rerun=t("div",{style:n.rerun}),memRun=function(){},l.innerHTML="&times;",end.innerHTML="TIME OVER",rerun.innerHTML="↺",newrun.innerHTML="new",l.addEventListener("click",function(){i.removeChild(e)}),rerun.addEventListener("click",function(){e.appendChild(d),e.appendChild(a),e.appendChild(p),e.removeChild(end),e.removeChild(rerun),e.removeChild(newrun),memRun(!0)}),newrun.addEventListener("click",function(){e.removeChild(end),e.removeChild(rerun),e.removeChild(newrun),e.appendChild(r)}),r.addEventListener("change",function(n){var i=this.files;if(i.length){var t=i[0],l=new FileReader;l.addEventListener("load",function(){var n=JSON.parse(l.result);memRun=function(i){return o(n,{label:c,progress:u,remaining:h},function(){var n;n=i,console.log({fi:n}),e.appendChild(d),e.appendChild(a),e.appendChild(p),n||e.removeChild(r)},s)},memRun()},!1),l.readAsText(t,"UTF-8"),n.target.value=""}}),e.appendChild(r),e.appendChild(l),i.appendChild(e)}()}();
},{"@fedeghe/countdown":"R8tU"}]},{},["Focm"], null)
//# sourceMappingURL=/index.js.map