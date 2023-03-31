const countdown = require('@fedeghe/countdown');

(function (){
    var styles = {
            container: {
                fontFamily: 'verdana',
                padding: '5px',
                backgroundColor: 'white',
                position:'fixed',
                top:'-5px',
                right:'-5px',
                paddingTop:'10px',
                paddingRight:'20px',
                // top:0,
                // right:0,
                // width:'300px',
                // height:'50px',
                border:'1px dashed #aaa',
                borderRadius:'5px',
                opacity:'0.7',
                display:'flex',
                justifyContent:'center',
                flexDirection: 'column',
                alignItems: 'center'
            },
            close: {
                position:'absolute',
                right:'10px',
                top:'5px',
                width:'10px',
                height:'10px',
                cursor:'pointer'
            },
            plus: {
                width:'20px',
                height:'20px',
            },
            label:{color:'red'},
            progress:{accentColor:'green', height:'20px'},
            remaining:{
                fontSize:'0.5em',
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
        target = document.body;
    
    function sec2time(sec) {
        var h = ~~ (sec / 3600),
            m = ~~ ((sec % 3600)/ 60),
            s = ~~ (sec % 60);
        return `${h}h ${m}m ${s}s`;
    }
    function create(tag, {attrs = null, style = null}) {
        var t = document.createElement(tag);
        if(attrs) for(a in attrs) t.setAttribute(a, attrs[a]);
        if(style) for(s in style) t.style[s] = style[s];

        return t;
    }
    function schedule(config, setters, show, complete){
        console.log(JSON.stringify(config, null, 2))
        runSchedule(Object.entries(config), 0, setters, complete)
        show()
    }
    
    function runSchedule(schedules, index, setters, complete){
        var label = schedules[index][0],
            time = schedules[index][1];
        
        setters.label(label)
        setters.progress(1000)
        setters.remaining(sec2time(time*60))
        countdown(() => {
            console.log(schedules.length,  index+1,  schedules.length > index+1)
            if (schedules.length > index+1) {
                runSchedule(schedules, index+1, setters, complete)
            } else {
                console.log('complete')
                complete()
            }
        }, time*60e3)
        .onTick(({progress, remaining}) => {
            // console.log({progress, remaining})
            setters.progress(100-progress)
            setters.remaining(sec2time(Math.ceil(remaining/1000)))
        },1e3).run()
    }


    //
    (function(){
        var container = create('div', {style: styles.container}),
            fileInput = create('input', {attrs: {type:'file', name:'file', accept:'application/json'}}),
            close = create('div', {style:styles.close}),
            label = create('div', {style:styles.label}),
            progress = create('progress', {style:styles.progress, attrs:{value: 0, max:100}}),
            remaining = create('div', {style:styles.remaining});
            end = create('div', {style:styles.complete});
            newrun = create('div', {style:styles.newrun});
            rerun = create('div', {style:styles.rerun}),
            memRun = function (){};
        function show(fi){
            console.log({fi})
            container.appendChild(label);
            container.appendChild(progress);
            container.appendChild(remaining);
            if(!fi)
                container.removeChild(fileInput);
        }
        function complete(){
            container.removeChild(label);
            container.removeChild(progress);
            container.removeChild(remaining);
            container.appendChild(end);
            container.appendChild(rerun);
            container.appendChild(newrun);
        }
        function setLabel(l){
            label.innerHTML = l;
        }
        function setProgress(p){progress.setAttribute('value', p)}
        function setRemaining(r){remaining.innerHTML = r}
        close.innerHTML='&times;';
        end.innerHTML='TIME OVER';
        rerun.innerHTML='↺';
        newrun.innerHTML='new';
        close.addEventListener('click', function (){
            target.removeChild(container);
        });
        rerun.addEventListener('click', function _(){
            container.appendChild(label);
            container.appendChild(progress);
            container.appendChild(remaining);
            container.removeChild(end);
            container.removeChild(rerun);
            container.removeChild(newrun);
            memRun(true);
        })
        newrun.addEventListener('click', function _(){
            container.removeChild(end);
            container.removeChild(rerun);
            container.removeChild(newrun);
            container.appendChild(fileInput);
        })
        fileInput.addEventListener('change', function (e){
            var files = this.files;

            if (files.length) {
                var file = files[0],
                    reader = new FileReader(); // Creating reader instance from FileReader() API
                    
                reader.addEventListener("load", function () { 
                    var j = JSON.parse(reader.result);
                    memRun = again => schedule(j, {
                        label: setLabel,
                        progress: setProgress,
                        remaining: setRemaining
                    },function (){show(again);}, complete);
                    memRun();
                }, false);
                reader.readAsText(file, "UTF-8");
                e.target.value = '';
            }
        });
        container.appendChild(fileInput);
        container.appendChild(close);
        target.appendChild(container);
    })();

})();
