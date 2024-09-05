const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const port = process.env.PORT || 3000;

// Create an HTTP server and bind it with Express
const server = http.createServer(app);
const io = socketIo(server);  // Initialize Socket.IO with the server

// Serve static files from the "public" directory
app.use(express.static(__dirname + '/../public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Handle Socket.IO connections
io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle messages from clients
    socket.on('message', (data) => {
        console.log('Message received:', data);
        // Broadcast the message to other clients
        socket.broadcast.emit('message', data);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Start the server
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
