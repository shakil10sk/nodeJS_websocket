const http = require('http');
const express = require('express');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// web socket.io connection
io.on('connection', socketClient => {
    socketClient.on('user-message', (msg) => {
        io.emit('message', msg);
    })
})

app.use(express.static(path.resolve('./public')))

app.get('/', (req, res) => {
    return res.sendFile('./public/index.html'); 
})

server.listen(9000, () => console.log('server is started at localhost:9000'))


