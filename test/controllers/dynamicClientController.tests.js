const { getAllPhones } = require('../../controllers/dynamicClientController'); // Adjust the path as necessary
const fetch = require('node-fetch');
jest.mock('node-fetch');

describe('Dynamic Client Controller', () => {
    it('should fetch all phones and render them', async () => {
        fetch.mockResolvedValueOnce({
            json: async () => ({ data: [{ brand: 'TestBrand', model: 'TestModel' }] }),
        });

        const req = {};
        const res = {
            render: jest.fn(),
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await getAllPhones(req, res);
        expect(res.render).toHaveBeenCalledWith('dynamicClient', { phones: [{ brand: 'TestBrand', model: 'TestModel' }] });
    });
});
