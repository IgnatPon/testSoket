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




server.use(express.static('./public'));

server.get('/', (req, res) => {
    res.render(createPath('index'))
})



io.on('connection', (socket) => {
    socket.on('message', (msg) => {
        io.emit('chat message', `<p><b style = "${msg.colorT}">${msg.name}</b>: ${msg.text}</p>`);
      });
});

server.use((req, res) => {
    res
        .status(404)
        .render(createPath('error'))
})


app.listen(PORT, () => console.log(`Listening on port ${PORT}`));