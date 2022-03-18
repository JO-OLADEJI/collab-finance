let server;
const request = require('supertest');

describe('Errors', () => {
  beforeEach(() => server = require('../../../server.js'));
  afterEach(() => server.close());

  describe('ALL /*', () => {

    it('should return an error with a 404 status-code if an endpoint that does not exist is requested with any HTTP verb', async () => {
      const res1 = await request(server).get('/anything');
      const res2 = await request(server).post('/anything');
      const res3 = await request(server).put('/anything');
      const res4 = await request(server).delete('/anything');
      // any other request to an endpoint that doesn't exist in the application using any http verb would throw the same error

      expect(res1.status).toBe(404);
      expect(res2.status).toBe(404);
      expect(res3.status).toBe(404);
      expect(res4.status).toBe(404);
    });

  });


  describe('endpoint errors', () => {

    it('should return an error with the given status-code if an error is thrown anywhere in the entire application', async () => {
      const res1 = await request(server).post('/api/users');
      const res2 = await request(server).get('/api/users/me');
      // any othere request that's invalid would throw an error of this nature
      
      expect(res1.status).toBe(400);
      expect(res2.status).toBe(400);
    });

  });

});