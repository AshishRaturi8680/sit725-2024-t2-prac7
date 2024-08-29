const request = require('supertest');
const express = require('express');
const startServerWithMongo = require('../../server/startServerWithMongo'); 

describe('Start Server With Mongo', () => {
    let server;

    beforeAll(() => {
        server = startServerWithMongo();
    });

    it('should start the server and respond to GET requests', async () => {
        const response = await request(server).get('/');
        expect(response.statusCode).toBe(200);
    });

    afterAll(() => {
        server.close();
    });
});
