const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/../public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
