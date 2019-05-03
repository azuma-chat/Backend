
   
    let chat_channel = 'general';

    var socket = io();

    let last = {
        author: '',
        id: ''
    }

    socket.emit('login', window.localStorage.getItem('token'));

let missed = 0;
$(window).on('focus', () => {
    missed = 0;
    document.title = `Azuma`;
    $('#message').focus();
});

socket.on('message', msg => {
    if(!document.hasFocus() || chat_channel != msg.channel){
        new Audio('/resources/audio/message.mp3').play();
        missed += 1;
        document.title = `(${missed}) Azuma`;
        create_alert(`${msg.author.name} #${msg.channel}`, msg.content, 'chat');
    }
    //if(chat_channel == msg.channel) create_message(msg);

    // Scroll down so the user can see the new message
    document.getElementById('scroller').scrollTo(0,document.getElementById('scroller').scrollHeight);
});
socket.on('alert', al => {
    create_alert(al[0], al[1]);
});

socket.on('system', al => {
    create_banner(al);
    //create_alert('System', al, 'info');
});

socket.on('disconnect', () => {
    // TODO
    // On socket disconnect try to reconnect with the token as message
    // The server will recognize the token and re-login the user

    $('#disconnection-warning').addClass('unhide');
})

socket.on('connect', () => {
    $('#disconnection-warning').removeClass('unhide');
})