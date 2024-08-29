const request = require('supertest');
const express = require('express');
const startServer = require('../../server/startServer'); // Ensure this file exists and path is correct

describe('Start Server', () => {
    let server;

    beforeAll(() => {
        server = startServer();
    });

    it('should start the server and respond to GET requests', async () => {
        const response = await request(server).get('/');
        expect(response.statusCode).toBe(200);
    });

    afterAll(() => {
        server.close();
    });
});
