### Micro scheduler bookmarklet

Want to run a meeting of an interview in perfect plan ?  

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
    "q&a": 30

}
```

then create (just once) a bookmarklet containing the following: 
```
javascript:void%20function(){window.open('https%3A%2F%2Ffedeghe.github.io%2FmicroSchedulerBookmarklet%2Findex.html'%2C'Scheduler'%2C'width%3D300%2Cheight%3D100%2Cstatus%3D0%2Ctoolbar%3D0%2Cmenubar%3D0%2Cresizebar%3D0%2Cpopup%3D1%2Cnoopener%3D1%2Cnoreferrer%3D1')%3B}();
```
and name it as u like.

Now when the meeting starts, click the bookmarklet

![Alt text](https://assets.digitalocean.com/articles/alligator/boo.svg "a title")
