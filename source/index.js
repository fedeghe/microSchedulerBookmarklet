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
                // opacity: '0.7',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center'
            },
            title:{
                fontWeight: 'bold',
                textAlign: 'center',
                paddingBottom:'10px'
            },
            file: {display: 'none'},
            selectFileLabel: {
                cursor:'pointer',
                color:'blue',
                fontSize: '0.8em'
            },
            startButton: {
                color: 'white',
                backgroundColor: 'red',
                cursor: 'pointer',
                fontSize:'1.2em',
                lineHeight:'1.2em',
                height:'1.2em',
                width:'1.2em',
                borderRadius: '0.6em',
                textAlign:'center'
            },
            plus: {
                width: '20px',
                height: '20px',
            },
            label: { color: 'red' },
            progress: { accentColor: 'green', height: '20px' },
            progressLabel: {
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
            back: {
                cursor:'pointer'
            },
            newrun: {
                paddingTop:'5px',
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
            },
            breakit: {
                position: 'absolute',
                right: '0px',
                bottom: '0px',
                cursor:'pointer',
                width:'20px',
                height:'20px',
                lineHeight:'20px',
                textAlign:'center'
            }
        },
        labels = {
            startTitle: 'Scheduler',
            startButton: '⏵',
            startSelection: 'selected file',
            full: '100.0%',
            auxActivate: 'turn beeps on',
            auxDeactivate: 'turn beeps off',
            end: 'TIME OVER',
            stop: '⏹︎',
            chooseFile: 'choose a configuration file'
        },
        auxActive = true,
        configFileName = '',
        target = document.body,
        create = function (tag, { attrs = null, style = null }) {
            var t = document.createElement(tag);
            if (attrs) for (a in attrs) t.setAttribute(a, attrs[a]);
            if (style) for (s in style) t.style[s] = style[s];
            return t;
        },
    
        container = create('div', { style: styles.container }),
        
        title = create('div', { style: styles.title }),
        fileInput = create('input', { style: styles.file, attrs: { type: 'file', name: 'file', accept: '.json' } }),
        selectFileLabel = create('div', { style: styles.selectFileLabel }),

        start = create('div', { style: styles.startButton }),

        aux = create('div', { style: styles.aux }),
        auxTitle = create('div', { style: styles.auxTitle }),
        label = create('div', { style: styles.label }),
        progress = create('progress', { style: styles.progress, attrs: { value: 100, max: 100 } }),
        progressLabel = create('div', { style: styles.progressLabel}),
        remaining = create('div', { style: styles.remaining }),
        breakit = create('div', { style: styles.breakit }),

        end = create('div', { style: styles.complete }),
        newrun = create('div', { style: styles.newrun }),
        back = create('div', { style: styles.back }),
        rerun = create('div', { style: styles.rerun }),

        views = {
            start: [title, fileInput, selectFileLabel],
            ready: [title, start, back],
            running: [label, progress, remaining, aux, auxTitle, progressLabel, breakit],
            end: [end, rerun, newrun]
        },
        countdowns = {inner: null, global: null},

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
        runSchedule = function (schedules, index) {
            setTimeout(beep, 100);
            // beepn(index + 1);

            var label = schedules[index][0],
                time = schedules[index][1];

            setLabel(label);
            setProgress(1000);
            setRemaining(sec2time(time * 60));
            countdowns.inner = countdown(() => {
                schedules.length > index + 1
                    ? runSchedule(schedules, index + 1)
                    : complete()
            }, time * 60e3)
                .onTick(({ progress, remaining }) => {
                    setProgress(100 - progress)
                    setRemaining(sec2time(Math.ceil(remaining / 1000)))
                }, 1e3).run()
        },
        complete = function () {
            beep(100, 800);
            setTimeout(beep, 100)
            render('end')
        },
        setLabel = function (l) { label.innerHTML = l; },
        setProgress = function (p) { progress.setAttribute('value', p) },
        setProgressLabel = function (p) { progressLabel.innerHTML = `${p.toFixed(1)}%` },
        setRemaining = function (r) { remaining.innerHTML = r },
        noop = function (){},
        startGlobal = function () {
            progressLabel.innerHTML = labels.full;
            countdowns.global = countdown(noop, total * 60e3)
                .onTick(({ progress }) => {
                    setProgressLabel(100 - progress)
                }, 1e3)
                .run()
        },
        remove = function (p, cs) {
            cs = cs || Array.from(p.children);
            cs.forEach(function (c) { p.removeChild(c) })
        },
        append = function (p, cs) { cs.forEach(function (c) { p.appendChild(c) }) },
        render = function (name){
            if (name in views) {
                remove(container);
                append(container, views[name]);
            }
        },
        reset = function _() {total = 0; closeCountdowns(); render('start');},
        closeCountdowns = function () {
            countdowns.inner && countdowns.inner.end();
            countdowns.global && countdowns.global.end();
            delete countdowns.inner;
            delete countdowns.global;
        };

    title.innerHTML = labels.startTitle;
    start.innerHTML = labels.startButton;
    selectFileLabel.innerHTML = labels.chooseFile;
    end.innerHTML = labels.end;
    breakit.innerHTML = labels.stop;
    rerun.innerHTML = '↺';
    newrun.innerHTML = 'new';
    back.innerHTML = '←';
    aux.innerHTML = '♪';
    auxTitle.innerHTML = labels.auxDeactivate;

    rerun.addEventListener('click', function _() {
        render('running')
        startGlobal();
        memRun();
    });
    
    breakit.addEventListener('click', reset);
    back.addEventListener('click', reset);
    newrun.addEventListener('click', reset);

    aux.addEventListener('click', function _() {
        auxTitle.style.display = 'none'
        auxActive = !auxActive;
        aux.style.color = auxActive ? styles.aux.color : '#aaa';
        auxTitle.innerHTML = labels[auxActive ? 'auxDeactivate' : 'auxActivate'];
    });
    aux.addEventListener('mouseover', function _() { auxTitle.style.display = 'block'; });
    aux.addEventListener('mouseleave', function _() { auxTitle.style.display = 'none'; });
    start.addEventListener('click', function _() { 
        startGlobal();
        memRun();
    });

    selectFileLabel.addEventListener('click', function () {
        fileInput.click();
    })
    fileInput.addEventListener('change', function (e) {
        var files = this.files,
            file, reader;
        if (files.length) {
            file = files[0];
            reader = new FileReader();
            configFileName =  file.name;
            
            reader.addEventListener("load", function () {
                try {
                    var j = JSON.parse(reader.result),
                        flatted = makeFlat(j);
                    memRun = function () {
                        
                        render('running')
                        runSchedule(Object.entries(flatted), 0);
                    };
                    render('ready');
                } catch (e) {
                    console.log('ERROR: ', e)
                }
            }, false);
            reader.readAsText(file, "UTF-8");
            e.target.value = '';
        }
    });

    target.appendChild(container);
    render('start')
})();
