
$(function () {

    const socket = io();

    //obtaining DOM elements from the interface

    const $messageform = $('#message-form');
    const $messagebox = $('#message');
    const $chat = $('#chat');

    //obtaining DOM elements from the nickname form

    const $nickForm = $('#nickForm');
    const $nickError = $('#nickError');
    const $nickname = $('#nickname');
    const $users = $('#usernames');

    $nickForm.submit(e => {
        e.preventDefault();
        socket.emit('new user', $nickname.val(), data => {
            if (data) {
                $('#nickWrap').hide();
                $('#contentWrap').show();
                $('#user').html(
                    `<div class="alert alert-dark" role="alert"> <b>Let's Chat:</b>  ${$nickname.val()}</div>`
                );
                
            } else {
                $nickError.html(
                    '<div class="alert alert-danger"> That username alredy exits </div>'
                );
            }
        });
    });

    //events

    $messageform.submit(e => {
        e.preventDefault();
        socket.emit('send message', $messagebox.val(), data => {
            $chat.append(`<p class="error">${data}</p>`)
        });
        $messagebox.val('');
    });

    socket.on('new message', function (data) {
        $chat.append('<b>' + data.nick + '</b>: ' + data.msg + '</br></br>');
    });

    socket.on('usernames', data => {
        let html = '';
        for (let i = 0; i < data.length; i++) {
            html += `<p><i class="fas fa-user"> ${data[i]} </i></p>`
        }
        $users.html(html);
    });

    socket.on('wisper', data =>{
        $chat.append(`<p class="wisper"><b>${data.nick}:</b> ${data.msg}</p>`);
    });
})