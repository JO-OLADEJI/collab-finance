let server;
const request = require('supertest');
const { User } = require('../../../models/user.js');
const mongoose = require('mongoose');


describe('/api/users', () => {
  beforeEach(() => server = require('../../../server.js'));
  afterEach(async () => {
    server.close();
    await User.deleteMany({}); // database cleanup
  });

  describe('POST /', () => {
    let user;
    beforeEach(() => {
      user = { firstname: 'abc', lastname: 'xyz', username: 'abcxyz', email: 'abcxyz@example.com', gender: 'female', password: 'abc123xyz' };
    });
    const exec = async () => {
      return await request(server).post('/api/users').send(user);
    }
    
    it('should return an error with status-code 400 if any key in the request body is invalid', async () => {
      user.firstname = 'a'; // creating an invalid key
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('should return an error with status-code 409 if the given username already exists', async () => {
      user.email = 'xyzabc@example.com'; // to avoid email duplicate
      await exec();
      const res = await exec();
      expect(res.status).toBe(409);
    });

    it('should return an error with status-code 409 if the given email already exists', async () => {
      user.username = 'xyzabc'; // to avoid username duplicate
      await exec();
      const res = await exec();
      expect(res.status).toBe(409);
    });

    it('should create a new user and respond with a status-code 201 if request body is totally valid', async () => {
      const res = await exec();

      expect(res).toBeDefined();
      expect(res.status).toBe(201);
      expect(typeof res.body).toBe('object');
      expect(res.body['result']['email']).toBe(user['email']);
    });

  });


  describe('POST /login', () => {
    //
  });


  describe('GET /me', () => {
    //
  });


  describe('ALL /doesUsernameExist', () => {
    //
  });

});