import request from 'supertest';
import app from '../../src/index';

describe('GET /', () => {
  it('responds with json', (done) => {
    request(app)
      .get('/api/v1/products')
      .set('Accept', 'application/json')
      .expect(200, done);
  });
});
