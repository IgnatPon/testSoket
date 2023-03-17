const express = require('express')
const path = require('path')
const fs = require('fs')
const server = express()
const app = require('http').createServer(server);
const { Server } = require("socket.io");
const io = new Server(app);


server.set('view engine', 'ejs')

const PORT = 3000

const createPath = (page) => path.resolve(__dirname, 'pages-ejs', `${page}.ejs`)

// server.listen(PORT, (error) => {
//     error ? console.log(error) : console.log(`listening port ${PORT}`)
// })

const setTime = () => {
    let D = new Date();
    let hour = D.getHours()
    fs.readFile('./bd/time.json','utf-8',(err, data)=> {
        err ? console.log(err): null;
        let time = JSON.parse(data);
        if(time.zero == 1 &&hour == 10 ){
            fs.writeFile('./bd/time.json','{"zero":0}',(err)=> {
                err ? console.log(err) : null;
                fs.writeFile('./bd/bd.json','{"messages":[]}',(err)=> {
                    err ? console.log(err) : null;
                    
                })
            })
        }
        else if(time.zero == 0 &&hour != 10){
            fs.writeFile('./bd/time.json','{"zero":1}',(err)=> {
                err ? console.log(err) : null;
                
            })
        }
        
    })
}


server.use(express.static('./public'));
setInterval(setTime, 1000*60*60);
    
    

server.get('/', (req, res) => {
    
    fs.readFile('./bd/bd.json','utf-8',(err,data)=> {
        err ? console.log(err) : null;
        let database = JSON.parse(data);
    res.render(createPath('index'), {database})
    })
})



io.on('connection', (socket) => {
    socket.on('message', (msg) => {
        fs.readFile('./bd/bd.json','utf-8',(err,data)=> {
            err ? console.log(err) : null;
            let database = JSON.parse(data);
            
            database.messages.push(msg)
            
             fs.writeFile('./bd/bd.json',JSON.stringify(database),(err)=> {
                 err ? console.log(err) : io.emit('chat message', `<p><b style = "${msg.colorT}">${msg.name}</b>: ${msg.text}</p>`);;
             })
        })
        
      });
    socket.on('song', ()=> {
        io.emit('playSong')
    })
});

server.use((req, res) => {
    res
        .status(404)
        .render(createPath('error'))
})


app.listen(PORT, () => console.log(`Listening on port ${PORT}`));