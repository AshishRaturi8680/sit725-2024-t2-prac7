const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const port = process.env.PORT || 3000;

// Create an HTTP server and bind it with Express
const server = http.createServer(app);
const io = socketIo(server);  // Initialize Socket.IO with the server

app.use(express.json());
app.use(express.static('public'));

let phones = []; // Array to hold phone data

app.get('/api/phones', (req, res) => {
    res.json({ data: phones });
});

app.post('/api/phone', (req, res) => {
    const newPhone = req.body;
    phones.push(newPhone);
    // Broadcast the new phone data to clients
    io.emit('phoneUpdate', newPhone);
    res.json({ data: newPhone });
});

// Handle Socket.IO connections
io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Start the server
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
