const express = require('express')
const path = require('path')
const fs = require('fs')
const server = express()
const app = require('http').createServer(server);
require('dotenv').config()
const { Server } = require("socket.io");
const io = new Server(app);
const mongoose = require('mongoose');

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
    
    let database = await Model.find({});
    
    res.render(createPath('index'),{database})
})

server.get('/database', async (req,res) => {
    let data = await Model.find({});
    res.send(data);
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