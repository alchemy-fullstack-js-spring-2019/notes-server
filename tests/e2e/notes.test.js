require('dotenv').config();
const request = require('supertest');
const mongoose = require('mongoose');
const connect = require('../../lib/utils/connect');
const app = require('../../lib/app');

describe('notes routes', () => {
  beforeAll(() => {
    return connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('can create a note via POST', () => {
    return request(app)
      .post('/api/v1/notes')
      .send({ title: 'my note', body: 'my note has a body' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          title: 'my note',
          body: 'my note has a body',
          __v: 0
        });
      });
  });
});
