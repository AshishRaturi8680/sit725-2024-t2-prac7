const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://ashishraturi8680:YxPK6fw4wpANF2nc@speccells.iwh69wx.mongodb.net/";
let collection;

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

const getAllPhones = async (req, res) => {
    try {
        await runDBConnection();
        const result = await collection.find({}).toArray();
        res.json({ statusCode: 200, data: result, message: 'Get all phones successful' });
    } catch (error) {
        res.status(500).json({ statusCode: 500, message: 'Error fetching phones' });
    }
};

const postPhone = async (req, res) => {
    try {
        await runDBConnection();
        const phone = req.body;
        const result = await collection.insertOne(phone);
        res.json({ statusCode: 201, data: result, message: 'Phone added successfully' });
    } catch (error) {
        res.status(500).json({ statusCode: 500, message: 'Error adding phone' });
    }
};

module.exports = { getAllPhones, postPhone };
