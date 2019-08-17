var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var fs = require('fs');


var numUsers = 0;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	numUsers=numUsers+1;
  console.log('a user connected ' + socket.id +" usercount "+numUsers);
  io.emit('usercount', ""+numUsers);
  socket.on('chat message', function(msg){
  writedata("user connected "+socket.id+"\r\n");
  writedata("chat message "+socket.id+" : "+msg+" "+"\r\n");

  
   //send to all
   //io.emit('chat message', msg);
	
	//send to all except sender
	socket.broadcast.emit('chat message', msg);

  });
  
  //when user disconnect
  socket.on('disconnect', () => {
	  numUsers=numUsers-1;
	console.log('User Disconnected ' + socket.id +" usercount " +numUsers);
	writedata("User Disconnected "+socket.id+"\r\n");
	io.emit('usercount', ""+numUsers);
  });
  
  
});

function writedata(textdata)
{
	 fs.appendFile('mynewfile1.txt', textdata, function (err) {
		if (err) throw err;
		//console.log('Saved!');
	});
	
}

http.listen(port, function(){
  console.log('listening on *:' + port);
});