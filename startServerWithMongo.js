let express = require('express');
let app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://ashishraturi8680:YxPK6fw4wpANF2nc@speccells.iwh69wx.mongodb.net/";
let port = process.env.PORT || 3000;
let collection;

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function runDBConnection() {
    try {
        await client.connect();
        collection = client.db().collection('Phone');
        console.log("Connected to MongoDB and selected 'Phone' collection");
    } catch (ex) {
        console.error(ex);
    }
}

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/indexmongo.html');
});

app.get('/api/phones', (req, res) => {
    getAllPhones((err, result) => {
        if (!err) {
            res.json({ statusCode: 200, data: result, message: 'Get all phones successful' });
        } else {
            res.status(500).json({ statusCode: 500, message: 'Error fetching phones' });
        }
    });
});

app.post('/api/phone', (req, res) => {
    let phone = req.body;
    postPhone(phone, (err, result) => {
        if (!err) {
            res.json({ statusCode: 201, data: result, message: 'Phone added successfully' });
        } else {
            res.status(500).json({ statusCode: 500, message: 'Error adding phone' });
        }
    });
});

function postPhone(phone, callback) {
    collection.insertOne(phone, callback);
}

function getAllPhones(callback) {
    collection.find({}).toArray(callback);
}

app.listen(port, () => {
    console.log('Express server started on port ' + port);
    runDBConnection();
});
