$(document).ready(function () {
    let inp =$("#inp");
    let btn=("#send");
    let result=("#messages");
    let active=("#active")

    var socket = io();
    let person="";

    promptmsg();
    if(person==null|| person=="")
    {
        alert("Username cannot be null");
        promptmsg();
    }




    display();


    socket.on('get_username',function () {
        socket.emit('username',person);
    })


    $(btn).click(function () {
        let val=inp.val();
        socket.emit('newmessage',val)
    })

    socket.on('message',function (data) {
        $(result).append(`<li>${data.msg}---${data.user}</li>`)
    })


    socket.on('newactive',function (user) {
        $(active).append(`<li>${user}</li>`)
    });

    socket.on('activeusers',function (users) {
            renderusers(users)
    })

    socket.on('userleft',function (usersleft) {
        $(active).empty();
        renderusers(usersleft);
    })

    function display() {

        socket.on('pageload',function (messages) {

                render(messages);

        });

    }//display()

    function render(data) {

        data.forEach(function (msg) {
            $(result).append(`<li>${msg}</li>`)
        });//for each

    }//render()

    function renderusers(data) {

        data.forEach(function (user) {
            $(active).append(`<li>${user}</li>`)
        });//for each

    }

    function promptmsg() {
        person = prompt("Please enter your name:", "");
    }//promptmsg()

});//document