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

async function connect() {
    try {
        await client.connect();
        collection = client.db().collection('Phone');
        console.log("Connected to MongoDB and selected 'Phone' collection");
    } catch (ex) {
        console.error(ex);
    }
}

const getAllPhones = async () => {
    try {
        await connect();
        return await collection.find({}).toArray();
    } catch (error) {
        throw new Error('Error fetching phones');
    }
};

const addPhone = async (phone) => {
    try {
        await connect();
        return await collection.insertOne(phone);
    } catch (error) {
        throw new Error('Error adding phone');
    }
};

module.exports = { getAllPhones, addPhone };
