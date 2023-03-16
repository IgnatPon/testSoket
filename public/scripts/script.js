var socket = io();

document.addEventListener('keydown',(e) => {
    if(e.keyCode == 13){
        if(document.querySelector('.inp').value != '' && document.querySelector('.name').value != ''){
            socket.emit('message', {
                text: document.querySelector('.inp').value,
                name: document.querySelector('.name').value
            });
            document.querySelector('.inp').value = '';
        }
        
        
    }
})

socket.on('chat message', (msg) => {
    document.querySelector('.wrapper').insertAdjacentHTML('beforeend',msg);
  });