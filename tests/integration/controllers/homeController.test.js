const request = require('supertest');
let server;

describe('/', () => {
  beforeEach(() => server = require('../../../server.js'));
  afterEach(() => server.close());

  describe('GET /', () => {
    it('should return a return a welcome message', async () => {
      const res = await request(server).get('/');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(typeof res.body.result).toBe('string');
    });
  });

});