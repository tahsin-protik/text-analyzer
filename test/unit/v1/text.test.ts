import request from 'supertest';
import app from '../../../src/app'; 
import { expect } from 'chai';

describe('Text CRUD APIs', () => {
  let textId: number;

  it('should create a new text', async () => {
    const response = await request(app)
      .post('/api/v1/text')
      .send({ content: 'Hello, world!' });

    expect(response.status).to.equal(201);
    expect(response.body.content).to.equal('Hello, world!');
    textId = response.body.id;
  });

  it('should retrieve all texts', async () => {
    const response = await request(app).get('/api/v1/text');

    expect(response.status).to.equal(200);
    expect(response.body.length).to.be.greaterThan(0);
  });

  it('should retrieve a text by ID', async () => {
    const response = await request(app).get(`/api/v1/text/${textId}`);

    expect(response.status).to.equal(200);
    expect(response.body.id).to.equal(textId);
  });

  it('should update a text by ID', async () => {
    const response = await request(app)
      .put(`/api/v1/text/${textId}`)
      .send({ content: 'Updated content' });

    expect(response.status).to.equal(200);
    expect(response.body.content).to.equal('Updated content');
  });

  it('should delete a text by ID', async () => {
    const response = await request(app).delete(`/api/v1/text/${textId}`);

    expect(response.status).to.equal(204);
  });

  it('should return 404 for a non-existent text', async () => {
    const response = await request(app).get(`/api/v1/text/${textId}`);

    expect(response.status).to.equal(404);
  });
});
