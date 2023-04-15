const countdown = require('@fedeghe/countdown');

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
                height: '20px',
            },
            label: { color: 'red' },
            progress: { accentColor: 'green', height: '20px' },
            progressG: {
                accentColor: '#afa',
                height: '20px',
                position: 'absolute',
                top: 0,
                left: 0,
                fontWeight:'bold',
                fontSize:'0.7em',
                margin:'5px'
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
                textAlign:'center'
            },

            complete: {
                fontWeight: 'bold',
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
                fontSize: '0.8em',
            }
        },
        auxActive = true,
        target = document.body,
        create = function (tag, { attrs = null, style = null }) {
            var t = document.createElement(tag);
            if (attrs) for (a in attrs) t.setAttribute(a, attrs[a]);
            if (style) for (s in style) t.style[s] = style[s];
            return t;
        },
        auxTitles = ['turn beeps on', 'turn beeps off'],
        aux = create('div', { style: styles.aux }),
        auxTitle = create('div', { style: styles.auxTitle }),
        container = create('div', { style: styles.container }),
        fileInput = create('input', { attrs: { type: 'file', name: 'file', accept: 'application/json' } }),
        label = create('div', { style: styles.label }),
        progress = create('progress', { style: styles.progress, attrs: { value: 100, max: 100 } }),
        progressG = create('div', { style: styles.progressG}),
        remaining = create('div', { style: styles.remaining }),

        end = create('div', { style: styles.complete });
        newrun = create('div', { style: styles.newrun });
        rerun = create('div', { style: styles.rerun }),
        memRun = function () { },
        total = 0,

        sec2time = function (sec) {
            var h = ~~(sec / 3600),
                m = ~~((sec % 3600) / 60),
                s = ~~(sec % 60);
            return `${h}h ${m}m ${s}s`;
        },
        makeFlat = function (j, key) {
            key = key || '';
            const isObject = obj => obj != null && obj.constructor.name === "Object";
            return Object.entries(j).reduce((acc, [k, v]) => {
                const deep = isObject(v),
                    innerK = (key ? key + ' - ' : '') + k;
                if (deep) {
                    acc = Object.assign({}, acc, makeFlat(v, innerK));
                } else {
                    total += v
                    acc[innerK] = v;
                }
                return acc;
            }, {});
        },
        remove = function (p, cs) {
            cs = cs || Array.from(p.children);
            cs.forEach(function (c) { p.removeChild(c) })
        },
        append = function (p, cs) { cs.forEach(function (c) { p.appendChild(c) }) },
        schedule = function (config, setters, show) {
            runSchedule(Object.entries(config), 0, setters);
            show();
        },
        beep = function (d, f) {
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
        },
        beepn = function (n) {
            for (var i = 0; i < n; i++) {
                setTimeout(beep, 100 * i + 10);
            }
        },

        runSchedule = function (schedules, index, setters) {
            setTimeout(beep, 100);
            // beepn(index + 1);

            var label = schedules[index][0],
                time = schedules[index][1];

            setters.label(label);
            setters.progress(1000);
            setters.remaining(sec2time(time * 60));
            countdown(() => {
                schedules.length > index + 1
                    ? runSchedule(schedules, index + 1, setters)
                    : complete()
            }, time * 60e3)
                .onTick(({ progress, remaining }) => {
                    setters.progress(100 - progress)
                    setters.remaining(sec2time(Math.ceil(remaining / 1000)))
                }, 1e3).run()
        },
        show = function (fi) {
            append(container, [label, progress, remaining, aux, auxTitle, progressG]);
            !fi && container.removeChild(fileInput);
        },
        complete = function () {
            beep(100, 800);
            setTimeout(beep, 100)
            render('end')
        },
        setLabel = function (l) { label.innerHTML = l; },
        setProgress = function (p) { progress.setAttribute('value', p) },
        setProgressG = function (p) { progressG.innerHTML = `${p.toFixed(1)}%` },
        setRemaining = function (r) { remaining.innerHTML = r },
        startGlobal = function () {
            progressG.innerHTML = '100.0%';
            countdown(() => {}, total * 60e3)
            .onTick(({ progress }) => {
                setProgressG(100 - progress)
            }, 1e3).run()
        },
        views = {
            start: [fileInput],
            running: [label, progress, remaining, aux, auxTitle, progressG],
            end: [end, rerun, newrun]
        },
        render = function (name){
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
        render('running')
        memRun(true);
        startGlobal();
    });

    newrun.addEventListener('click', function _() {render('start');});

    aux.addEventListener('click', function _() {
        auxTitle.style.display = 'none'
        auxActive = !auxActive;
        aux.style.color = auxActive ? styles.aux.color : '#aaa';
        auxTitle.innerHTML = auxTitles[~~auxActive];
    });
    aux.addEventListener('mouseover', function _() { auxTitle.style.display = 'block'; });
    aux.addEventListener('mouseleave', function _() { auxTitle.style.display = 'none'; });

    fileInput.addEventListener('change', function (e) {
        var files = this.files,
            file, reader;
        if (files.length) {
            file = files[0];
            reader = new FileReader();
            reader.addEventListener("load", function () {
                try {
                    var j = JSON.parse(reader.result),
                        flatted = makeFlat(j);
                    memRun = function (again) {
                        schedule(
                            flatted, {
                                label: setLabel,
                                progress: setProgress,
                                remaining: setRemaining
                            },
                            function () { show(again); }
                        );
                    };
                    memRun();
                    startGlobal();
                } catch (e) {
                    console.log('ERROR: ', e)
                }
            }, false);
            reader.readAsText(file, "UTF-8");
            e.target.value = '';
        }
    });
    container.appendChild(fileInput);
    target.appendChild(container);
})();
