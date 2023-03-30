// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/@fedeghe/interval/dist/index.js":[function(require,module,exports) {
'use strict';
/*
Interval v1.0.19
fedeghe <fedeghe@gmail.com>
A really simple function to provide a better timing to replace the setInterval
*/
const interval=function(t,n,i){function e(t,n){this.fn=t,this.interval=n,this.int=0,this.counter=0,this.initDate=+new Date,this.active=!1,this.paused=!1,this._onErr=null,this._onEnd=null,this._onPause=null,this._onResume=null,this._pause=null,this._resume=null}var s=function(t){return"function"==typeof t};return e.prototype.onEnd=function(t){return s(t)&&(this._onEnd=t),this},e.prototype.onErr=function(t){return s(t)&&(this._onErr=t),this},e.prototype.onPause=function(t){return s(t)&&(this._onPause=t),this},e.prototype.onResume=function(t){return s(t)&&(this._onResume=t),this},e.prototype.end=function(){return this.active=!1,this._onEnd&&this._onEnd(this),this},e.prototype.endsIn=function(t){var n=this;return setTimeout(function(){n.end()},t),this},e.prototype.pause=function(){return this.paused=!0,this._onPause&&this._onPause(this),this},e.prototype.resume=function(){return this.paused=!1,this._onResume&&this._onResume(this),this},e.prototype.runIfActive=function(){return this.active&&this.run(),this},e.prototype.run=function(t){this.active=!0;var n=this;return this.int=this.interval+(this.initDate+this.counter++*this.interval-new Date),t&&t(n),setTimeout(function(){if(!n.paused&&n.active)try{n.fn(n.counter-1)}catch(t){n._onErr&&n._onErr(t,n),n.active=!1}n.runIfActive()},n.int),this},function(t,n){return new e(t,n)}}();"object"==typeof exports&&(module.exports=interval);
},{}],"../node_modules/@fedeghe/countdown/dist/index.js":[function(require,module,exports) {
'use strict';
/*
Countdown v0.0.11
fedeghe <fedeghe@gmail.com>
$description$
*/
const interval=require("@fedeghe/interval"),countdown=function(){function t(t,i){this.fn=t,this.horizont=i,this.baseHorizont=i,this.to=null,this.active=!1,this.paused=!1,this._onErr=null,this._onEnd=null,this._onTick=null,this.tick=null,this.ticker=null,this.startPause=0,this.pauseSpan=0,this.updates=0,this._onUpdate=null,this._update=null,this._onPause=null,this._pause=null,this._onResume=null,this._resume=null}var i=function(t){return"function"==typeof t};return t.prototype.end=function(){return this.active=!1,this._onEnd&&this._onEnd(),this.ticker&&this.ticker.end(),clearTimeout(this.to),this},t.prototype.onEnd=function(t){return i(t)&&(this._onEnd=t),this},t.prototype.onErr=function(t){return i(t)&&(this._onErr=t),this},t.prototype.onPause=function(t){return i(t)&&(this._onPause=t),this},t.prototype.onResume=function(t){return i(t)&&(this._onResume=t),this},t.prototype.onUpdate=function(t){return i(t)&&(this._onUpdate=t),this},t.prototype.pause=function(){return this.paused=!0,this._onPause&&this._onPause(this),this.to&&clearTimeout(this.to),this.startPause=+new Date,this.ticker&&this.ticker.pause(),this},t.prototype.resume=function(){return this.paused=!1,this._onResume&&this._onResume(this),this.pauseSpan=+new Date-this.startPause,this.horizont-=this.pauseSpan,this.run(!1,!0),this.ticker&&this.ticker.resume(),this},t.prototype.getStatus=function(){var t=+new Date,i=t-this.startTime-this.pauseSpan;return{elapsed:i,remaining:this.horizont-i+this.updates,progress:100*i/this.horizont}},t.prototype.run=function(t,i){var e=this;return this.startTime=this.startTime||+new Date,this.active=!0,t&&t(e),this.to=setTimeout(function(){try{e.fn(),e.end(),e.ticker&&e.ticker.end()}catch(t){e._onErr&&e._onErr(t,e),e.active=!1}},this.horizont),!i&&this.ticker&&this.ticker.run(),this},t.prototype.update=function(t){var i=parseInt(t);this.updates=i;var e=+new Date,s=e-this.startTime-this.pauseSpan,n=this.baseHorizont-s,o=i+n;return this.baseHorizont=s+o,o&&o>0&&(this._onUpdate&&this._onUpdate(this),this.horizont=o,this.to&&clearTimeout(this.to),this.run()),this},t.prototype.onTick=function(t,i){var e=this;return this.ticker=interval(function(i){var s=+new Date,n=s-e.startTime-e.pauseSpan,o=e.baseHorizont-n,r=parseFloat((100*n/e.baseHorizont).toFixed(3),10);t({cycle:i,elapsed:n,remaining:o,progress:r})},i),this},function(i,e){return new t(i,e)}}();"object"==typeof exports&&(module.exports=countdown);
},{"@fedeghe/interval":"../node_modules/@fedeghe/interval/dist/index.js"}],"index.js":[function(require,module,exports) {
var countdown = require('@fedeghe/countdown');
(function () {
  var styles = {
      container: {
        fontFamily: 'verdana',
        padding: '5px',
        backgroundColor: 'white',
        position: 'fixed',
        // top:'-5px',
        // right:'-5px',
        top: 0,
        right: 0,
        width: '300px',
        height: '50px',
        border: '1px solid black',
        borderRadius: '5px',
        opacity: '0.7'
      },
      close: {
        position: 'absolute',
        right: 0,
        top: 0,
        width: '10px',
        height: '10px',
        cursor: 'pointer'
      },
      plus: {
        width: '20px',
        height: '20px'
      },
      label: {
        color: 'red'
      },
      progress: {
        accentColor: 'green'
      },
      remaining: {}
    },
    target = document.body;
  function sec2time(sec) {
    var h = ~~(sec / 3600),
      m = ~~(sec % 3600 / 60),
      s = ~~(sec % 60);
    return "".concat(h, "h ").concat(m, "m ").concat(s, "s");
  }
  function create(tag, _ref) {
    var _ref$attrs = _ref.attrs,
      attrs = _ref$attrs === void 0 ? null : _ref$attrs,
      _ref$style = _ref.style,
      style = _ref$style === void 0 ? null : _ref$style;
    var t = document.createElement(tag);
    if (attrs) for (a in attrs) t.setAttribute(a, attrs[a]);
    if (style) for (s in style) t.style[s] = style[s];
    return t;
  }
  function schedule(config, setters, show, complete) {
    console.log(JSON.stringify(config, null, 2));
    runSchedule(Object.entries(config), 0, setters, complete);
    show();
  }
  function runSchedule(schedules, index, setters, complete) {
    var label = schedules[index][0],
      time = schedules[index][1];
    setters.label(label);
    setters.progress(0);
    setters.remaining(sec2time(time * 60));
    countdown(function () {
      console.log(schedules.length, index + 1, schedules.length > index + 1);
      if (schedules.length > index + 1) {
        runSchedule(schedules, index + 1, setters, complete);
      } else {
        console.log('complete');
        complete();
      }
    }, time * 60e3).onTick(function (_ref2) {
      var progress = _ref2.progress,
        remaining = _ref2.remaining;
      // console.log({progress, remaining})
      setters.progress(progress);
      setters.remaining(sec2time(remaining / 1000));
    }, 1e3).run();
  }

  //
  (function () {
    var container = create('div', {
        style: styles.container
      }),
      fileInput = create('input', {
        attrs: {
          type: 'file',
          name: 'file',
          accept: 'application/json'
        }
      }),
      close = create('div', {
        style: styles.close
      }),
      label = create('div', {
        style: styles.label
      }),
      progress = create('progress', {
        style: styles.progress,
        attrs: {
          value: 0,
          max: 100
        }
      }),
      remaining = create('div', {
        style: styles.remaining
      });
    end = create('div', {
      style: styles.complete
    });
    rerun = create('div', {
      style: styles.rerun
    });
    function show() {
      container.appendChild(label);
      container.appendChild(progress);
      container.appendChild(remaining);
      container.removeChild(fileInput);
    }
    function complete() {
      container.removeChild(label);
      container.removeChild(progress);
      container.removeChild(remaining);
      container.appendChild(end);
      container.appendChild(rerun);
    }
    function setLabel(l) {
      label.innerHTML = l;
    }
    function setProgress(p) {
      progress.setAttribute('value', p);
    }
    function setRemaining(r) {
      remaining.innerHTML = r;
    }
    close.innerHTML = '&times;';
    end.innerHTML = 'TIME OVER';
    rerun.innerHTML = 'run a new schedule';
    close.addEventListener('click', function () {
      target.removeChild(container);
    });
    rerun.addEventListener('click', function _() {
      rerun.removeEventListener('click', _);
      container.removeChild(end);
      container.removeChild(rerun);
      container.appendChild(fileInput);
    });
    fileInput.addEventListener('change', function (e) {
      var files = this.files;
      if (files.length) {
        var file = files[0],
          reader = new FileReader(); // Creating reader instance from FileReader() API

        reader.addEventListener("load", function () {
          var j = JSON.parse(reader.result);
          schedule(j, {
            label: setLabel,
            progress: setProgress,
            remaining: setRemaining
          }, show, complete);
        }, false);
        reader.readAsText(file, "UTF-8");
      }
    });
    container.appendChild(fileInput);
    container.appendChild(close);
    target.appendChild(container);
  })();
})();
},{"@fedeghe/countdown":"../node_modules/@fedeghe/countdown/dist/index.js"}]},{},["index.js"], null)
//# sourceMappingURL=/index.js.map