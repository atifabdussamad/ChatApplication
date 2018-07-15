var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var PORT = process.env.port || 8080 ;

app.use("/",require('express').static("public"))

let id=[];
let users=[];
let messages=[];

io.on('connection',function (socket) {

    id.push(socket.id);
    socket.emit('get_username');


    socket.on('username',function (name) {
        users.push(name);
        io.emit('newactive',users[id.indexOf(socket.id)])
    })

    socket.on('newmessage',function (message) {
        messages.push(message+"---"+users[id.indexOf(socket.id)]);
        io.emit('message',{msg:message , user:users[id.indexOf(socket.id)]});
    })

    socket.emit('pageload',messages);

    socket.emit('activeusers',users);

    socket.on('disconnect',function () {
        let index = id.indexOf(socket.id);
        users.splice(index,1);
        id.splice(index,1);
        io.emit('userleft',users);
    })

});//io.on connection


server.listen( process.env.port || 8080  , function () {
    console.log("Server is listening at port no "+PORT);
})