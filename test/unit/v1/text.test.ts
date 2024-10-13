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


describe('Text Analysis APIs', () => {
  let textId: number;

  before(async () => {
    const response = await request(app)
      .post('/api/v1/text')
      .send({ content: 'This is a test paragraph.\nIt has multiple sentences. And some longer words!\nAnother paragraph here.' });

    textId = response.body.id;
  });

  after(async () => {
    await request(app).delete(`/api/v1/text/${textId}`);
  });

  it('should get word count', async () => {
    const response = await request(app).get(`/api/v1/text/word-count/${textId}`);

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('word_count');
    expect(response.body.word_count).to.equal(16);
  });

  it('should get character count', async () => {
    const response = await request(app).get(`/api/v1/text/character-count/${textId}`);

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('character_count');
    expect(response.body.character_count).to.equal(80);
  });

  it('should get sentence count', async () => {
    const response = await request(app).get(`/api/v1/text/sentence-count/${textId}`);

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('sentence_count');
    expect(response.body.sentence_count).to.equal(4);
  });

  it('should get paragraph count', async () => {
    const response = await request(app).get(`/api/v1/text/paragraph-count/${textId}`);

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('paragraph_count');
    expect(response.body.paragraph_count).to.equal(3);
  });

  it('should get longest words in paragraphs', async () => {
    const response = await request(app).get(`/api/v1/text/longest-words/${textId}`);

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('paragraphs');
    expect(response.body.paragraphs).to.be.an('array').with.lengthOf(3);
    expect(response.body.paragraphs[0].longest_word).to.equal('paragraph');
    expect(response.body.paragraphs[1].longest_word).to.equal('sentences');
    expect(response.body.paragraphs[2].longest_word).to.equal('paragraph');
  });

  it('should return 404 for non-existent text', async () => {
    const nonExistentId = 9999;
    const response = await request(app).get(`/api/v1/text/word-count/${nonExistentId}`);

    expect(response.status).to.equal(404);
    expect(response.body).to.have.property('error', 'Text not found');
  });
});

