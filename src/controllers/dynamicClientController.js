const fetch = require('node-fetch');

const getAllPhones = async (req, res) => {
    try {
        const response = await fetch('http://localhost:3000/api/phones');
        const result = await response.json();
        res.render('dynamicClient', { phones: result.data });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching phones' });
    }
};

module.exports = { getAllPhones };
