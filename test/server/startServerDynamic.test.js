const request = require('supertest');
const express = require('express');
const startServerDynamic = require('../../server/startServerDynamic'); // Ensure this file exists and path is correct

describe('Start Server Dynamic', () => {
    let server;

    beforeAll(() => {
        server = startServerDynamic();
    });

    it('should start the server and respond to GET requests', async () => {
        const response = await request(server).get('/');
        expect(response.statusCode).toBe(200);
    });

    afterAll(() => {
        server.close();
    });
});
