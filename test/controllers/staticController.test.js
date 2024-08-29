const { getStaticData } = require('../../controllers/staticController'); // Ensure this file exists and path is correct
const { MongoClient } = require('mongodb');
jest.mock('mongodb');

describe('Static Controller', () => {
    let req, res;

    beforeAll(() => {
        req = {}; // Define request object as needed
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
    });

    it('should get static data', async () => {
        // Mock implementation if needed
        await getStaticData(req, res);
        // Update with actual expected results
        expect(res.json).toHaveBeenCalledWith({ statusCode: 200, data: [], message: 'Get static data successful' });
    });
});
