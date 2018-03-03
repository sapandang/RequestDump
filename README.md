# RequestDump

[![N|Solid](https://github.com/sapandang/RequestDump/raw/master/Screenshot_1.jpg)](https://github.com/sapandang/RequestDump/blob/)

RequestDump is nodejs based server whcih logs all the request it receives.Similarly like webhook tester.
Why it was created.
  - mainly to test the integration between the system
  - log what request are being send by your app
  - log all the headers and body send by server

### Installation

* RequestDump requires [Node.js](https://nodejs.org/) v4+ to run.
* make sure you have nodejs setup in your system
* clone the repo

```sh
$ cd RequestDump
$ npm install 
$ npm start
or
$ node index.js
```

This will start server at port 3000.

Now open "http://127.0.0.1:3000/" in your browser you should see message
```
open /log to view the request
```
Now open "http://127.0.0.1:3000/log" in browser log page will open

### Next
configure your app to send request to http://127.0.0.1:3000/
you will see all the request in /log

### Do not send request to /log , /datas

### Development

Want to contribute? Great!
RequestDump is build using .
*  nodejs
* vuejs
* express
* socket.io

### Todos

 - currently server support only one requeset session
 - add mock features

License
----

MIT


**Free Software, Hell Yeah!**

