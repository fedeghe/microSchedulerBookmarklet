const countdown = require('@fedeghe/countdown');

(function () {
    var styles = {
            body: {
                active: {},
                paused : {
                    backgroundColor: '#aaa'
                }
            },
            container: {
                fontFamily: 'verdana',
                padding: '5px',
                paddingTop: '10px',
                paddingRight: '20px',
                borderRadius: '5px',
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
                top: '5px',
                left: '5px',
                fontWeight:'bold',
                fontSize:'0.7em',
                margin:'5px'
            },
            remaining: {
                fontSize: '1em',
                fontWeight: 'bold'
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
            higherTooltip: {
                display: 'none',
                position: 'absolute',
                right: '30px',
                top: '6px',
                fontSize: '0.6em',
            },
            aux: {
                position: 'absolute',
                right: '5px',
                top: '5px',
                height: '20px',
                width: '20px',
                cursor: 'pointer',
                color: 'black',
                textAlign:'center'
            },
            lowerTooltip: {
                display: 'none',
                position: 'absolute',
                right: '50px',
                bottom: '6px',
                fontSize: '0.6em',
            },
            breakit: {
                position: 'absolute',
                right: '5px',
                bottom: '5px',
                cursor:'pointer',
                width:'20px',
                height:'20px',
                lineHeight:'20px',
                textAlign:'center'
            },
            pauseResume: {
                position: 'absolute',
                right: '25px',
                bottom: '5px',
                cursor:'pointer',
                width:'20px',
                height:'20px',
                lineHeight:'20px',
                textAlign:'center'
            }
        },
        labels = {
            startTitle: 'Scheduler',
            startSelection: 'selected file',
            full: '100.0%',
            end: 'TIME OVER',
            chooseFile: 'choose a configuration file',
            icons: {
                start: '⏵',
                stop: '⏹︎',
                pause: '⏸︎',
            },
            higherTooltip: {
                beepson: 'turn beeps on',
                beepsoff: 'turn beeps off',
            },
            lowerTooltip: {
                stop:'stop the countdown',
                pause:'pause the countdown',
                resume: 'resume the countdown',
            }
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
        breakit = create('div', { style: styles.breakit }),
        pauseResume = create('div', { style: styles.pauseResume }),
        higherTooltip = create('div', { style: styles.higherTooltip }),
        lowerTooltip = create('div', { style: styles.lowerTooltip }),
        label = create('div', { style: styles.label }),
        progress = create('progress', { style: styles.progress, attrs: { value: 100, max: 100 } }),
        progressLabel = create('div', { style: styles.progressLabel}),
        remaining = create('div', { style: styles.remaining }),
        

        end = create('div', { style: styles.complete }),
        newrun = create('div', { style: styles.newrun }),
        back = create('div', { style: styles.back }),
        rerun = create('div', { style: styles.rerun }),

        views = {
            start: [title, fileInput, selectFileLabel],
            ready: [title, start, back],
            running: [label, progress, remaining, aux, higherTooltip, progressLabel, breakit, lowerTooltip, pauseResume],
            end: [end, rerun, newrun]
        },
        countdowns = {inner: null, global: null},

        memRun = function () { },
        total = 0,
        status = 'playing',

        sec2time = function (sec) {
            var h = ~~(sec / 3600),
                m = ~~((sec % 3600) / 60),
                s = ~~(sec % 60);
            return `${h}h ${m}m ${s}s`;
        },
        
        makeFlat = function (j, key) {
            key = key || '';
            total = 0;
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
            setTimeout(beep, 100);
            render('end');
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
        hide = function (e, cnt) {
            if (typeof cnt !== 'undefined') e.innerHTML = cnt;
            e.style.display = 'none';
        },
        show = function (e, cnt) {
            if (typeof cnt !== 'undefined') e.innerHTML = cnt;
            e.style.display = 'block';
        },
        append = function (p, cs) { cs.forEach(function (c) { p.appendChild(c) }) },
        render = function (name){
            if (name in views) {
                remove(container);
                append(container, views[name]);
            }
        },
        reset = function _() {closeCountdowns(); render('start');},
        pause = function (){
            countdowns.inner && countdowns.inner.pause();
            countdowns.global && countdowns.global.pause();
        },
        resume = function (){
            countdowns.inner && countdowns.inner.resume();
            countdowns.global && countdowns.global.resume();
        },
        closeCountdowns = function () {
            countdowns.inner && countdowns.inner.end();
            countdowns.global && countdowns.global.end();
        };

    title.innerHTML = labels.startTitle;
    start.innerHTML = labels.icons.start;
    selectFileLabel.innerHTML = labels.chooseFile;
    end.innerHTML = labels.end;
    breakit.innerHTML = labels.icons.stop;
    rerun.innerHTML = '↺';
    newrun.innerHTML = 'new';
    back.innerHTML = '←';
    aux.innerHTML = '♪';
    pauseResume.innerHTML = labels.icons.pause;
    higherTooltip.innerHTML = labels.higherTooltip.beepsoff;
    lowerTooltip.innerHTML = labels.lowerTooltip.stop;

    rerun.addEventListener('click', function _() {
        render('running')
        startGlobal();
        memRun();
    });
    
    pauseResume.addEventListener('mouseover', function _() {
        show(lowerTooltip, labels.lowerTooltip[status === 'playing' ? 'pause' : 'resume']);
    });
    pauseResume.addEventListener('mouseleave', function _() { lowerTooltip.style.display = 'none'; });
    pauseResume.addEventListener('click', function (){
        hide(lowerTooltip, '');
        switch(status) {
            case 'playing':
                pause();
                status = 'paused';
                document.body.style.backgroundColor = '#aaa';
                pauseResume.innerHTML = labels.icons.start;
                document.title = labels.startTitle + ' PAUSED';

                break;
            case 'paused':
                resume();
                status = 'playing';
                document.body.style.backgroundColor = '#fff';
                pauseResume.innerHTML = labels.icons.pause;
                document.title = labels.startTitle + ' RUNNING';
                break;
        }
    });
    breakit.addEventListener('click', function () {
        hide(lowerTooltip);
        reset()
    });
    breakit.addEventListener('mouseover', function _() {
        show(lowerTooltip, labels.lowerTooltip.stop);
    });
    breakit.addEventListener('mouseleave', function _() { hide(lowerTooltip); });
    back.addEventListener('click', reset);
    newrun.addEventListener('click', reset);

    aux.addEventListener('click', function _() {
        auxActive = !auxActive;
        hide(higherTooltip, labels.higherTooltip[auxActive ? 'beepsoff' : 'beepson']);
        aux.style.color = auxActive ? styles.aux.color : '#aaa';
    });
    aux.addEventListener('mouseover', function _() { higherTooltip.style.display = 'block'; });
    aux.addEventListener('mouseleave', function _() { higherTooltip.style.display = 'none'; });
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
