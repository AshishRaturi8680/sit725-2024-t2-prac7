const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

let phones = []; // Array to hold phone data

app.get('/api/phones', (req, res) => {
    res.json({ data: phones });
});

app.post('/api/phone', (req, res) => {
    const newPhone = req.body;
    phones.push(newPhone);
    res.json({ data: newPhone });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
