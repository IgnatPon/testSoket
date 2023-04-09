var socket = io();
let color = `color: rgb(${Math.floor(100+Math.random()*145)},${Math.floor(100+Math.random()*145)},${Math.floor(100+Math.random()*145)})`
document.addEventListener('keydown', async (e) => {
    if(e.keyCode == 13){
        if(document.querySelector('.inp').value != '' && document.querySelector('.name').value != ''){
            if(document.querySelector('.inp').value == 'сасун_хочет*на*родину'){
                socket.emit('song')
            }
            else if(document.querySelector('.inp').value.split(' ')[0] == '/encode'){
                let str = document.querySelector('.inp').value.split(' ');
                str.shift()
                let data = await fetch(`http://localhost:3000/api/encode/${str.join(' ').split(',')[0]}/${str.join(' ').split(',')[1]}`)
                data = data.json()
                console.log()
            }
            else{
                socket.emit('message', {
                    text: document.querySelector('.inp').value,
                    name: document.querySelector('.name').value,
                    colorT: color
                });
            }
            
            document.querySelector('.inp').value = '';
        }
        
        
    }
})

socket.on('chat message', (msg) => {
    document.querySelector('.wrapper').insertAdjacentHTML('beforeend',msg);
    document.querySelector('.wrapper').scrollTop = document.querySelector('.wrapper').scrollTop + 100000;
  });


socket.on('playSong', ()=> {
    let audio = new Audio('songs/songT.mp3');
    audio.play();
    
})