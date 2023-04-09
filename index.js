const express = require('express')
const path = require('path')
const fs = require('fs')
const server = express()
const app = require('http').createServer(server);
require('dotenv').config()
const { Server } = require("socket.io");
const io = new Server(app);
const mongoose = require('mongoose');

<<<<<<< HEAD
let getData = async (URL) => {
    const res = await fetch(URL)
    
    const data = await res.json()

    return data;
}

=======
>>>>>>> 29ce1734107644d60322ba64408e55a02dab188a
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Connected!'));

server.set('view engine', 'ejs')


const schema = new mongoose.Schema({})
const Model = new mongoose.model('messages', schema);


const createPath = (page) => path.resolve(__dirname, 'pages-ejs', `${page}.ejs`)

// server.listen(PORT, (error) => {
//     error ? console.log(error) : console.log(`listening port ${PORT}`)
// })



server.use(express.static('./public'));

    
    

server.get('/', async (req, res) => {

    let data = await getData('https://ipapi.co/json')
    console.log(data.ip);
    let database = await Model.find({});
    console.log(req.socket.remoteAddress)
    res.render(createPath('index'),{database})
})

server.get('/database', async (req,res) => {
    let data = await Model.find({});
    res.send(data);
})



server.get('/api/encode/:text/:key', async (req,res) => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ "
    const numAlph = {}

    for(let i = 0; i < alphabet.length; i++){
        numAlph[alphabet[i]] = i
    }

    let encode = (text, key) => {
        let code = ''
        
        for(let i = 0; i < text.length; i++){
            code += alphabet[(numAlph[text[i]] + numAlph[key[i % key.length]]) % alphabet.length]
        }

        return code;
    }

    
    res.json({
        result : encode(req.params.text.toUpperCase(), req.params.key.toUpperCase())
    })
})

io.on('connection', (socket) => {
    socket.on('message', (msg) => {
        let data = {
            "text": msg.text,
            "name": msg.name,
            "colorT": msg.colorT
        }
        Model.collection.insertOne(data)
        io.emit('chat message', `<p><b style = "${msg.colorT}">${msg.name}</b>: ${msg.text}</p>`);
        
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


app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));