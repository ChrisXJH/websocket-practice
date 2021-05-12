const express = require('express');
const socket = require('socket.io');

const PORT = 3000;

const app = express();

app.use(express.static('public'));


const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

const io = socket(server);

io.on('connection', socket => {
    console.log("Websocket connection", socket.id);

    socket.on('chat', data => {
        io.sockets.emit('chat', data);
    });

    socket.on('typing', data => {
        socket.broadcast.emit('typing', data);
    });
});
