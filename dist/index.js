parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"HeEr":[function(require,module,exports) {
"use strict";var t=function(){function t(){return+new Date}function i(t){return"function"==typeof t}function s(t,i,s){i in t.subscribers&&t.subscribers[i].forEach(function(i){i(Object.assign({},s,{i:t}))}),"err"===i&&e(t)}function e(t){clearTimeout(t.tickerTo),clearTimeout(t.finalTo)}function n(i,s){var e,n=i.EndTime-i.StartTime,r=t()-i.StartTime,u=r-i.pauses,h=i.definite?n-r+i.pauses:void 0;return h=Math.max(0,h),e=i.definite?parseFloat((100-100*h/n).toFixed(3),10):void 0,s&&(h=0,e=100),{at:t(),i:i,cycle:i.cycle-i.addedCycles,elapsed:r,effective:u,remaining:h,progress:e,status:i.status}}function r(t,i){this.tick=i,this.StartTime=null,this.EndTime=null,this.status="init",this.pauses=0,this.cycle=0,this.endsAfter=0,this.addedCycles=0,this.finalTo=null,this.tickerTo=null,this.started=!1,this.sliding=!1,this.definite=!1,this.subscribers={start:[],pause:[],resume:[],end:[],tune:[],tick:[],err:[]},this.onTick(t)}return r.prototype.getStatus=function(){return n(this)},r.prototype.tune=function(i){if(!this.definite)return this;var e,r,u=t(),h=parseInt(i,10);return this.EndTime+=h,e=u-this.StartTime-this.pauses,r=this.EndTime-this.StartTime-e,h&&(clearTimeout(this.finalTo),r>0&&this.endsIn(r),s(this,"tune",Object.assign({},n(this),{ms:i}))),this},r.prototype.endsIn=function(t){return this.endsAfter=Math.abs(parseInt(t,10)),this.definite=!0,this.resetEnd(),this},r.prototype.resetEnd=function(){var t=this;this.finalTo&&clearTimeout(this.finalTo),this.finalTo=setTimeout(function(){t.end()},this.endsAfter)},r.prototype.run=function(i){if("error"===this.status)return this;this.StartTime=this.StartTime||t(),this.definite&&(this.EndTime=this.EndTime||this.StartTime+this.endsAfter);var e=this,r=function(i){var s=t(),e=i.StartTime+(i.cycle+1)*i.tick-(s+i.tick);return i.tick+e}(this);return this.started||(this.started=!0,this.status="running",i&&this.onStart(i,!0),s(this,"start",n(this)),this.definite&&this.resetEnd()),this.tickerTo=setTimeout(function(){var t=n(e);try{"running"===e.status&&s(e,"tick",t),e.cycle++}catch(i){e.status="error",s(e,"err",Object.assign(t,{error:i}))}e.run()},r),this},r.prototype.pause=function(i){return this.status="paused",s(this,"pause",n(this)),this.sliding=!!i,this.definite&&clearTimeout(this.finalTo),this.pauseStart=t(),this},r.prototype.resume=function(){this.status="running",s(this,"resume",n(this));var i,e,r=t(),u=r-this.pauseStart;return this.addedCycles+=~~(u/this.tick),this.pauses+=this.sliding&&u,this.definite&&(i=r-this.StartTime-this.pauses,e=this.EndTime-this.StartTime-i,this.endsAfter=e,this.resetEnd()),this.sliding=!1,this},r.prototype.end=function(){return this.status="ended",e(this),s(this,"end",n(this,!0)),this},r.prototype.onStart=function(t,i){return this.subscribers.start[i?"unshift":"push"](t),this},r.prototype.onPause=function(t){return i(t)&&this.subscribers.pause.push(t),this},r.prototype.onResume=function(t){return i(t)&&this.subscribers.resume.push(t),this},r.prototype.onTick=function(t){return i(t)&&this.subscribers.tick.push(t),this},r.prototype.onErr=function(t){return i(t)&&this.subscribers.err.push(t),this},r.prototype.onEnd=function(t){return i(t)&&this.subscribers.end.push(t),this},r.prototype.onTune=function(t){return i(t)&&this.subscribers.tune.push(t),this},r.prototype.at=function(t,i){var s=this;return setTimeout(function(){i({i:s})},t),this},function(t,i){return new r(t,i)}}();"object"==typeof exports&&(module.exports=t);
},{}],"UBC3":[function(require,module,exports) {
"use strict";function t(n){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(n)}var n=require("@fedeghe/interval"),e=function(){function t(t,e,r,o){r=r||function(){},o=o||1e3,this.Interval=n(r,o).endsIn(e).onEnd(t)}return t.prototype.at=function(t,n){return this.Interval.at(t,n),this},t.prototype.run=function(t){return this.Interval.run(t),this},t.prototype.pause=function(t){return this.Interval.pause(t),this},t.prototype.resume=function(){return this.Interval.resume(),this},t.prototype.tune=function(t){return this.Interval.tune(t),this},t.prototype.end=function(){return this.Interval.end(),this},t.prototype.onStart=function(t,n){return this.Interval.onStart(t,n),this},t.prototype.onEnd=function(t){return this.Interval.onEnd(t),this},t.prototype.onErr=function(t){return this.Interval.onErr(t),this},t.prototype.onPause=function(t){return this.Interval.onPause(t),this},t.prototype.onResume=function(t){return this.Interval.onResume(t),this},t.prototype.onTune=function(t){return this.Interval.onTune(t),this},t.prototype.getStatus=function(){var t=this.Interval.getStatus(),n=t.progress-100;return t.progress=n,t},function(n,e,r,o){return new t(n,e,r,o)}}();"object"==("undefined"==typeof exports?"undefined":t(exports))&&(module.exports=e);
},{"@fedeghe/interval":"HeEr"}],"Focm":[function(require,module,exports) {
function e(e,o){return r(e)||i(e,o)||n(e,o)||t()}function t(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function n(e,t){if(e){if("string"==typeof e)return o(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?o(e,t):void 0}}function o(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}function i(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var o,i,r,l,a=[],c=!0,s=!1;try{if(r=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;c=!1}else for(;!(c=(o=r.call(n)).done)&&(a.push(o.value),a.length!==t);c=!0);}catch(u){s=!0,i=u}finally{try{if(!c&&null!=n.return&&(l=n.return(),Object(l)!==l))return}finally{if(s)throw i}}return a}}function r(e){if(Array.isArray(e))return e}var l=require("./../../countdown/dist");!function(){var t={container:{fontFamily:"verdana",padding:"5px",paddingTop:"10px",paddingRight:"20px",borderRadius:"5px",display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center"},title:{fontWeight:"bold",textAlign:"center",paddingBottom:"10px"},file:{display:"none"},selectFileLabel:{cursor:"pointer",color:"blue",fontSize:"0.8em"},startButton:{color:"white",backgroundColor:"red",cursor:"pointer",fontSize:"1.2em",lineHeight:"1.1em",height:"1.2em",width:"1.2em",borderRadius:"0.6em",textAlign:"center"},plus:{width:"20px",height:"20px"},label:{color:"red"},progress:{accentColor:"green",height:"20px"},progressLabel:{accentColor:"#afa",height:"20px",position:"absolute",top:"5px",left:"5px",fontWeight:"bold",fontSize:"0.7em",margin:"5px",cursor:"pointer"},remaining:{fontSize:"1em",fontWeight:"bold"},complete:{fontWeight:"bold"},back:{cursor:"pointer"},newrun:{paddingTop:"5px",fontSize:"0.8em",color:"green",cursor:"pointer"},rerun:{fontSize:"1.4em",lineHeight:"0.8em",color:"green",cursor:"pointer"},higherTooltip:{display:"none",position:"absolute",right:"30px",top:"6px",fontSize:"0.6em"},aux:{position:"absolute",right:"5px",top:"5px",height:"20px",width:"20px",cursor:"pointer",color:"black",textAlign:"center"},lowerTooltip:{display:"none",position:"absolute",right:"50px",bottom:"6px",fontSize:"0.6em"},breakit:{position:"absolute",right:"5px",bottom:"5px",cursor:"pointer",width:"20px",height:"20px",lineHeight:"20px",textAlign:"center"},pauseResume:{position:"absolute",right:"25px",bottom:"5px",cursor:"pointer",width:"20px",height:"20px",lineHeight:"20px",textAlign:"center"}},n={startTitle:"Scheduler",startSelection:"selected file",full:"100.0%",end:"TIME OVER",chooseFile:"choose a configuration file",icons:{start:"⏵",stop:"⏹︎",pause:"⏸︎"},higherTooltip:{beepson:"turn beeps on",beepsoff:"turn beeps off"},lowerTooltip:{stop:"stop the countdown",pause:"pause the countdown",resume:"resume the countdown"}},o=!0,i=document.body,r=function(e,t){var n=t.attrs,o=void 0===n?null:n,i=t.style,r=void 0===i?null:i,l=document.createElement(e);if(o)for(a in o)l.setAttribute(a,o[a]);if(r)for(s in r)l.style[s]=r[s];return l},c=r("div",{style:t.container}),u=r("div",{style:t.title}),d=r("input",{style:t.file,attrs:{type:"file",name:"file",accept:".json"}}),p=r("div",{style:t.selectFileLabel}),f=r("div",{style:t.startButton}),g=r("div",{style:t.aux}),h=r("div",{style:t.breakit}),b=r("div",{style:t.pauseResume}),m=r("div",{style:t.higherTooltip}),v=r("div",{style:t.lowerTooltip}),y=r("div",{style:t.label}),x=r("progress",{style:t.progress,attrs:{value:100,max:100}}),T=r("div",{style:t.progressLabel}),L=r("div",{style:t.remaining}),w=r("div",{style:t.complete}),E=r("div",{style:t.newrun}),M=r("div",{style:t.back}),H=r("div",{style:t.rerun}),k={start:[u,d,p],ready:[u,f,M],running:[y,x,L,g,m,T,h,v,b],end:[w,H,E]},A={inner:null,global:null},S=function(){},C=0,O="perc",j="playing",R=function(e){var t=~~(e%3600/60),n=~~(e%60);return"".concat(~~(e/3600),"h ").concat(t,"m ").concat(n,"s")},z=function(e,t){if(o){e=e||100,t=t||400;var n=new AudioContext,i=n.createOscillator();i.type="sine",i.frequency.value=t,i.connect(n.destination),i.start(),setTimeout(function(){i.stop()},e)}},F=function e(t,n){setTimeout(z,100);var o=t[n][0],i=t[n][1];N(o),U(100),W(R(60*i)),A.inner=l(function(){("ended"===j?I:function(){t.length>n+1?e(t,n+1):I()})()},6e4*i,function(e){var t=e.progress,n=e.remaining;U(100-t),W(R(Math.ceil(n/1e3)))},1e3).run()},I=function(){z(100,800),setTimeout(z,100),J("end")},N=function(e){y.innerHTML=e},U=function(e){x.setAttribute("value",e)},W=function(e){L.innerHTML=e},B=function(){console.log({total:C}),T.innerHTML="perc"===O?n.full:R(Math.ceil(60*C)),A.global=l(function(){},6e4*C,function(e){var t,n=e.progress,o=e.remaining,i="perc"===O?"".concat((100-n).toFixed(1),"%"):R(Math.ceil(o/1e3));t=i,T.innerHTML=t},1e3).run()},q=function(e,t,n){void 0!==t&&(e.innerHTML=t),e.style.display=n?"block":"none"},D=function(e,t){q(e,t,!1)},G=function(e,t){q(e,t,!0)},J=function(e){var t,n;e in k&&(t=c,(n=n||Array.from(t.children)).forEach(function(e){t.removeChild(e)}),function(e,t){t.forEach(function(t){e.appendChild(t)})}(c,k[e]))},P=function(){document.body.style.backgroundColor="#fff",V(),j="playing",J("start")},V=function(){j="ended",A.inner&&A.inner.end(),A.global&&A.global.end()};u.innerHTML=n.startTitle,f.innerHTML=n.icons.start,p.innerHTML=n.chooseFile,w.innerHTML=n.end,h.innerHTML=n.icons.stop,H.innerHTML="↺",E.innerHTML="new",M.innerHTML="←",g.innerHTML="♪",b.innerHTML=n.icons.pause,m.innerHTML=n.higherTooltip.beepsoff,v.innerHTML=n.lowerTooltip.stop,T.addEventListener("click",function(){O="perc"===O?"rem":"perc"}),H.addEventListener("click",function(){B(),S()}),b.addEventListener("mouseover",function(){G(v,n.lowerTooltip["playing"===j?"pause":"resume"])}),b.addEventListener("mouseleave",function(){D(v)}),b.addEventListener("click",function(){switch(D(v,""),j){case"playing":A.inner&&A.inner.pause(!0),A.global&&A.global.pause(!0),j="paused",document.body.style.backgroundColor="#aaa",b.innerHTML=n.icons.start,document.title=n.startTitle+" PAUSED";break;case"paused":A.inner&&A.inner.resume(),A.global&&A.global.resume(),j="playing",document.body.style.backgroundColor="#fff",b.innerHTML=n.icons.pause,document.title=n.startTitle+" RUNNING"}}),h.addEventListener("click",function(){D(v),P()}),h.addEventListener("mouseover",function(){G(v,n.lowerTooltip.stop)}),h.addEventListener("mouseleave",function(){D(v)}),M.addEventListener("click",P),E.addEventListener("click",P),g.addEventListener("click",function(){D(m,n.higherTooltip[(o=!o)?"beepsoff":"beepson"]),g.style.color=o?t.aux.color:"#aaa"}),g.addEventListener("mouseover",function(){G(m)}),g.addEventListener("mouseleave",function(){D(m)}),f.addEventListener("click",function(){B(),S()}),p.addEventListener("click",function(){d.click()}),d.addEventListener("change",function(t){var n,o,i=this.files;i.length&&(n=i[0],o=new FileReader,n.name,o.addEventListener("load",function(){try{var n=function t(n,o){o=o||"",C=0;return Object.entries(n).reduce(function(n,i){var r,l=e(i,2),a=l[0],c=l[1],s=null!=(r=c)&&"Object"===r.constructor.name,u=(o?o+" - ":"")+a;return s?n=Object.assign({},n,t(c,u)):(C+=c,n[u]=c),n},{})}(JSON.parse(o.result));S=function(){J("running"),F(Object.entries(n),0)},J("ready")}catch(t){console.log("ERROR: ",t)}},!1),o.readAsText(n,"UTF-8"),t.target.value="")}),i.appendChild(c),J("start")}();
},{"./../../countdown/dist":"UBC3"}]},{},["Focm"], null)
//# sourceMappingURL=/index.js.map