## Micro scheduler bookmarklet

Need to run a meeting or an interview in perfect timing ?  

Just create a config json file as follows 

``` json
{
    "intro": 5,
    "the problem": 5,
    "effects": 10,
    "cascade effects": 5,
    "mitigation": 2,
    "short term": 10,
    "long run": 3,
    "questions": {
        "#1": 5,
        "#2": 5,
    },
    "q&a": 30

}
```

then create (just once) a bookmarklet containing the following: 
``` 
javascript:void%20function(){window.open('https%3A%2F%2Ffedeghe.github.io%2FmicroSchedulerBookmarklet%2F'%2C'Scheduler'%2C'width%3D300%2Cheight%3D100%2Cstatus%3D0%2Ctoolbar%3D0%2Cmenubar%3D0%2Clocation%3D0%2Cresizable%3D0%2Cpopup%3D1%2Cnoopener%3D1%2Cnoreferrer%3D1')%3B}();
```
and name it as u like.

Now when the meeting starts, click the bookmarklet

![Alt text](https://github.com/fedeghe/microSchedulerBookmarklet/raw/master/source/s_start.png "started") 

 select the right config json and 

![Alt text](https://github.com/fedeghe/microSchedulerBookmarklet/raw/master/source/s_selected.png "started")

hit the `⏵` icon and the scheduler starts:

![Alt text](https://github.com/fedeghe/microSchedulerBookmarklet/raw/master/source/s_running2.png "the end")

there one can see
- the overall progress in the upper left corner (click to toggle from percentage to remanining time)
- the current section progress
- a `♪` icon to turn on/off the beeps that will be produced on each transition and at the end.   
- a `⏹︎` icon to stop the execution and go back to the file selection.

When the time is over one can either rerun either run a new one.

![Alt text](https://github.com/fedeghe/microSchedulerBookmarklet/raw/master/source/s_end.png "the end")

---



