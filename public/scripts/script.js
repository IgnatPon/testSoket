var socket = io();
let color = `color: rgb(${Math.floor(100+Math.random()*145)},${Math.floor(100+Math.random()*145)},${Math.floor(100+Math.random()*145)})`
document.addEventListener('keydown',(e) => {
    if(e.keyCode == 13){
        if(document.querySelector('.inp').value != '' && document.querySelector('.name').value != ''){
            
            socket.emit('message', {
                text: document.querySelector('.inp').value,
                name: document.querySelector('.name').value,
                colorT: color
            });
            document.querySelector('.inp').value = '';
        }
        
        
    }
})

socket.on('chat message', (msg) => {
    document.querySelector('.wrapper').insertAdjacentHTML('beforeend',msg);
    document.querySelector('.wrapper').scrollTop = document.querySelector('.wrapper').scrollTop + 100000;
  });