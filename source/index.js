const countdown = require('@fedeghe/countdown');

(function (){
    var styles = {
            container: {
                fontFamily: 'verdana',
                padding: '5px',
                backgroundColor: 'white',
                paddingTop:'10px',
                paddingRight:'20px',
                borderRadius:'5px',
                opacity:'0.7',
                display:'flex',
                justifyContent:'center',
                flexDirection: 'column',
                alignItems: 'center'
            },
            plus: {
                width:'20px',
                height:'20px',
            },
            label:{color:'red'},
            progress:{accentColor:'green', height:'20px'},
            remaining:{
                fontSize:'1em',
                fontWeight: 'bold'
            },
            complete:{
                fontWeight:'bold',
            },
            newrun:{
                fontSize:'0.8em',
                color:'green',
                cursor: 'pointer'
            },
            rerun:{
                fontSize:'1.4em',
                lineHeight:'0.8em',
                color:'green',
                cursor: 'pointer'
            },
            flash: {
                filter: 'invert(100%)',
                transition: 'filter .3s ease-in-out'
            }
        },
        target = document.body,
        create = function(tag, {attrs = null, style = null}) {
            var t = document.createElement(tag);
            if(attrs) for(a in attrs) t.setAttribute(a, attrs[a]);
            if(style) for(s in style) t.style[s] = style[s];
            return t;
        },
        container = create('div', {style: styles.container}),
        fileInput = create('input', {attrs: {type:'file', name:'file', accept:'application/json'}}),
        label = create('div', {style:styles.label}),
        progress = create('progress', {style:styles.progress, attrs:{value: 0, max:100}}),
        remaining = create('div', {style:styles.remaining});
        end = create('div', {style:styles.complete});
        newrun = create('div', {style:styles.newrun});
        rerun = create('div', {style:styles.rerun}),
        memRun = function (){},

        sec2time = function(sec) {
            var h = ~~ (sec / 3600),
                m = ~~ ((sec % 3600)/ 60),
                s = ~~ (sec % 60);
            return `${h}h ${m}m ${s}s`;
        },
        remove = function(p, cs){cs.forEach(function(c){p.removeChild(c)})},
        append = function(p, cs){cs.forEach(function(c){p.appendChild(c)})},
        schedule = function(config, setters, show, complete){
            runSchedule(Object.entries(config), 0, setters, complete);
            show();
        },
        runSchedule = function(schedules, index, setters, complete){
            var label = schedules[index][0],
                time = schedules[index][1];
            
            setters.label(label);
            setters.progress(1000);
            setters.remaining(sec2time(time*60));
            countdown(() => {
                schedules.length > index+1
                ? runSchedule(schedules, index+1, setters, complete)
                : complete()
            }, time*60e3)
            .onTick(({progress, remaining}) => {
                setters.progress(100-progress)
                setters.remaining(sec2time(Math.ceil(remaining/1000)))
            },1e3).run()
        },
        show = function(fi){
            append(container, [label, progress, remaining]);
            !fi && container.removeChild(fileInput);
        },
        complete = function(){
            remove(container, [label, progress, remaining]);
            append(container, [end, rerun, newrun]);
        },
        setLabel = function(l){label.innerHTML = l;},
        setProgress = function(p){progress.setAttribute('value', p)},
        setRemaining = function(r){remaining.innerHTML = r}

    end.innerHTML='TIME OVER';
    rerun.innerHTML='↺';
    newrun.innerHTML='new';

    rerun.addEventListener('click', function _(){
        append(container, [label, progress, remaining]);
        remove(container, [end, rerun, newrun]);
        memRun(true);
    });

    newrun.addEventListener('click', function _(){
        append(container, [end, rerun, newrun]);
        container.appendChild(fileInput);
    });

    fileInput.addEventListener('change', function (e){
        var files = this.files,
            file, reader;
        if (files.length) {
            file = files[0];
            reader = new FileReader();
                
            reader.addEventListener("load", function () { 
                try {
                    var j = JSON.parse(reader.result);
                    memRun = again => schedule(j, {
                        label: setLabel,
                        progress: setProgress,
                        remaining: setRemaining
                    }, function (){show(again);}, complete);
                    memRun();
                } catch(e) {

                }
            }, false);
            reader.readAsText(file, "UTF-8");
            e.target.value = '';
        }
    });
    container.appendChild(fileInput);
    target.appendChild(container);

})();
