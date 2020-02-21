var socket = io('http://localhost:4002');
  
socket.on('recommended', () => {
    $('.alerta').fadeIn()
    setTimeout(() => {
        $('.alerta').fadeOut()
    }, 2000);
});




