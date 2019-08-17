const express = require('express')
const app = express()
var server = require('http').createServer(app);
var io = require('socket.io').listen(server, { path: '/log' });
var dateTime = require('node-datetime');
const fs = require('fs');

var csvWriter = require('csv-write-stream')
var writer = csvWriter()
writer.pipe(fs.createWriteStream('arduino.csv'))


console.log("app started ..");
var dt = dateTime.create();
dt.format('m/d/Y H:M:S');


// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    //res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('/log*', function (req, res) {

    res.sendFile(__dirname + '/public/index.html')

})
app.get('/datas/vue.js*', function (req, res) {

    res.sendFile(__dirname + '/public/vue.js')

})


io.on('connection', function (socket) {
    console.log('a user connected ' + socket.id);
    socket.on('hi', function (msg) {
        console.log('message: ' + msg);
        io.emit('hi', { for: 'everyone' });
    });
});


app.use(function (req, res, next) {
    var data = '';
    req.setEncoding('utf8');
    req.on('data', function (chunk) {
        data += chunk;
    });

    req.on('end', function () {
        req.body = data;
        next();
    });
});

app.all('/*', function (req, res) {

    var chunks = [];
    req.on('data', function (chunk) {
        chunks.push(chunk)
    });

    var reqdump = {};
    reqdump.method = req.method;
    reqdump.headers = JSON.stringify(req.headers);
    reqdump.body = req.body;
    reqdump.uri = req.originalUrl;
    reqdump.timestamp = new Date(dt.now());
    reqdump.ip = req.ip;

    var dumped = req.originalUrl;
    dumped = dumped + "<br>" + JSON.stringify(req.headers) + "<br>";
    dumped = dumped + "body dumped :" + req.body;

    //dump the data to csv
    if (reqdump.uri == "/dump" &&  reqdump.method=="POST") {
        console.log(" =>" + reqdump.body);
            
       writer.write( JSON.parse(reqdump.body));

    }


    res.send('{"status":"OK"}');


    io.emit('hi', reqdump);


})

server.listen(3000, () => console.log('Example app listening on port 3000!'))

