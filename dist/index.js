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
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var countdown = require('@fedeghe/countdown');
(function () {
  var styles = {
      container: {
        fontFamily: 'verdana',
        padding: '5px',
        backgroundColor: 'white',
        paddingTop: '10px',
        paddingRight: '20px',
        borderRadius: '5px',
        opacity: '0.7',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center'
      },
      plus: {
        width: '20px',
        height: '20px'
      },
      label: {
        color: 'red'
      },
      progress: {
        accentColor: 'green',
        height: '20px'
      },
      progressG: {
        accentColor: '#afa',
        height: '20px',
        position: 'absolute',
        top: 0,
        left: 0,
        fontWeight: 'bold',
        fontSize: '0.7em',
        margin: '5px'
      },
      remaining: {
        fontSize: '1em',
        fontWeight: 'bold'
      },
      aux: {
        position: 'absolute',
        right: 0,
        top: 0,
        height: '20px',
        width: '20px',
        cursor: 'pointer',
        color: 'black',
        textAlign: 'center'
      },
      complete: {
        fontWeight: 'bold'
      },
      newrun: {
        fontSize: '0.8em',
        color: 'green',
        cursor: 'pointer'
      },
      rerun: {
        fontSize: '1.4em',
        lineHeight: '0.8em',
        color: 'green',
        cursor: 'pointer'
      },
      auxTitle: {
        display: 'none',
        position: 'absolute',
        right: '30px',
        top: '3px',
        fontSize: '0.8em'
      }
    },
    auxActive = true,
    target = document.body,
    create = function create(tag, _ref) {
      var _ref$attrs = _ref.attrs,
        attrs = _ref$attrs === void 0 ? null : _ref$attrs,
        _ref$style = _ref.style,
        style = _ref$style === void 0 ? null : _ref$style;
      var t = document.createElement(tag);
      if (attrs) for (a in attrs) t.setAttribute(a, attrs[a]);
      if (style) for (s in style) t.style[s] = style[s];
      return t;
    },
    auxTitles = ['turn beeps on', 'turn beeps off'],
    aux = create('div', {
      style: styles.aux
    }),
    auxTitle = create('div', {
      style: styles.auxTitle
    }),
    container = create('div', {
      style: styles.container
    }),
    fileInput = create('input', {
      attrs: {
        type: 'file',
        name: 'file',
        accept: 'application/json'
      }
    }),
    label = create('div', {
      style: styles.label
    }),
    progress = create('progress', {
      style: styles.progress,
      attrs: {
        value: 100,
        max: 100
      }
    }),
    progressG = create('div', {
      style: styles.progressG
    }),
    remaining = create('div', {
      style: styles.remaining
    }),
    end = create('div', {
      style: styles.complete
    });
  newrun = create('div', {
    style: styles.newrun
  });
  rerun = create('div', {
    style: styles.rerun
  }), memRun = function memRun() {}, total = 0, sec2time = function sec2time(sec) {
    var h = ~~(sec / 3600),
      m = ~~(sec % 3600 / 60),
      s = ~~(sec % 60);
    return "".concat(h, "h ").concat(m, "m ").concat(s, "s");
  }, makeFlat = function (_makeFlat) {
    function makeFlat(_x2, _x3) {
      return _makeFlat.apply(this, arguments);
    }
    makeFlat.toString = function () {
      return _makeFlat.toString();
    };
    return makeFlat;
  }(function (j, key) {
    key = key || '';
    var isObject = function isObject(obj) {
      return obj != null && obj.constructor.name === "Object";
    };
    return Object.entries(j).reduce(function (acc, _ref2) {
      var _ref3 = _slicedToArray(_ref2, 2),
        k = _ref3[0],
        v = _ref3[1];
      var deep = isObject(v),
        innerK = (key ? key + ' - ' : '') + k;
      if (deep) {
        acc = Object.assign({}, acc, makeFlat(v, innerK));
      } else {
        total += v;
        acc[innerK] = v;
      }
      return acc;
    }, {});
  }), remove = function remove(p, cs) {
    cs = cs || Array.from(p.children);
    cs.forEach(function (c) {
      p.removeChild(c);
    });
  }, append = function append(p, cs) {
    cs.forEach(function (c) {
      p.appendChild(c);
    });
  }, schedule = function schedule(config, setters, show) {
    runSchedule(Object.entries(config), 0, setters);
    show();
  }, beep = function beep(d, f) {
    if (!auxActive) return;
    d = d || 100;
    f = f || 400;
    var context = new AudioContext(),
      oscillator = context.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.value = f;
    oscillator.connect(context.destination);
    oscillator.start();
    setTimeout(function () {
      oscillator.stop();
    }, d);
  }, beepn = function beepn(n) {
    for (var i = 0; i < n; i++) {
      setTimeout(beep, 100 * i + 10);
    }
  }, runSchedule = function (_runSchedule) {
    function runSchedule(_x4, _x5, _x6) {
      return _runSchedule.apply(this, arguments);
    }
    runSchedule.toString = function () {
      return _runSchedule.toString();
    };
    return runSchedule;
  }(function (schedules, index, setters) {
    setTimeout(beep, 100);
    // beepn(index + 1);

    var label = schedules[index][0],
      time = schedules[index][1];
    setters.label(label);
    setters.progress(1000);
    setters.remaining(sec2time(time * 60));
    countdown(function () {
      schedules.length > index + 1 ? runSchedule(schedules, index + 1, setters) : complete();
    }, time * 60e3).onTick(function (_ref4) {
      var progress = _ref4.progress,
        remaining = _ref4.remaining;
      setters.progress(100 - progress);
      setters.remaining(sec2time(Math.ceil(remaining / 1000)));
    }, 1e3).run();
  }), show = function show(fi) {
    append(container, [label, progress, remaining, aux, auxTitle, progressG]);
    !fi && container.removeChild(fileInput);
  }, complete = function complete() {
    beep(100, 800);
    setTimeout(beep, 100);
    render('end');
  }, setLabel = function setLabel(l) {
    label.innerHTML = l;
  }, setProgress = function setProgress(p) {
    progress.setAttribute('value', p);
  }, setProgressG = function setProgressG(p) {
    progressG.innerHTML = "".concat(p.toFixed(1), "%");
  }, setRemaining = function setRemaining(r) {
    remaining.innerHTML = r;
  }, startGlobal = function startGlobal() {
    progressG.innerHTML = '100.0%';
    countdown(function () {}, total * 60e3).onTick(function (_ref5) {
      var progress = _ref5.progress;
      setProgressG(100 - progress);
    }, 1e3).run();
  }, views = {
    start: [fileInput],
    running: [label, progress, remaining, aux, auxTitle, progressG],
    end: [end, rerun, newrun]
  }, render = function render(name) {
    if (name in views) {
      remove(container);
      append(container, views[name]);
    }
  };
  end.innerHTML = 'TIME OVER';
  rerun.innerHTML = '↺';
  newrun.innerHTML = 'new';
  aux.innerHTML = '♪';
  auxTitle.innerHTML = auxTitles[1];
  rerun.addEventListener('click', function _() {
    render('running');
    memRun(true);
    startGlobal();
  });
  newrun.addEventListener('click', function _() {
    render('start');
  });
  aux.addEventListener('click', function _() {
    auxTitle.style.display = 'none';
    auxActive = !auxActive;
    aux.style.color = auxActive ? styles.aux.color : '#aaa';
    auxTitle.innerHTML = auxTitles[~~auxActive];
  });
  aux.addEventListener('mouseover', function _() {
    auxTitle.style.display = 'block';
  });
  aux.addEventListener('mouseleave', function _() {
    auxTitle.style.display = 'none';
  });
  fileInput.addEventListener('change', function (e) {
    var files = this.files,
      file,
      reader;
    if (files.length) {
      file = files[0];
      reader = new FileReader();
      reader.addEventListener("load", function () {
        try {
          var j = JSON.parse(reader.result),
            flatted = makeFlat(j);
          memRun = function memRun(again) {
            schedule(flatted, {
              label: setLabel,
              progress: setProgress,
              remaining: setRemaining
            }, function () {
              show(again);
            });
          };
          memRun();
          startGlobal();
        } catch (e) {
          console.log('ERROR: ', e);
        }
      }, false);
      reader.readAsText(file, "UTF-8");
      e.target.value = '';
    }
  });
  container.appendChild(fileInput);
  target.appendChild(container);
})();
},{"@fedeghe/countdown":"../node_modules/@fedeghe/countdown/dist/index.js"}]},{},["index.js"], null)
//# sourceMappingURL=/index.js.map