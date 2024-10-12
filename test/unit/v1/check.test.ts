import app from '../../../src/app';
import request from 'supertest';
import { expect } from 'chai';


describe('GET /api/v1/test', () => {
    it('should return 200 OK', async () => {
        const response = await request(app).get('/api/v1/test');
        expect(response.status).to.equal(200);
    });

    it('should return the correct response body', async () => {
        const response = await request(app).get('/api/v1/test');
        expect(response.body).to.deep.equal({
            status: "success",
            message: "TEST, OK!"
        });
    });
});

describe('GET /check', () => {
    it('should return 200 OK', async () => {
        const response = await request(app).get('/check');
        expect(response.status).to.equal(200);
    });
});
