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

    it('should create and authenticate a new user and respond with a status-code 201 if request body is totally valid', async () => {
      const res = await exec();

      expect(res).toBeDefined();
      expect(res.status).toBe(201);
      expect(typeof res.body).toBe('object');
      expect(res.headers['x-auth-token']).toBeDefined();
      expect(res.body['result']['email']).toBe(user['email']);
    });

  });


  describe('POST /login', () => {
    let credentials;
    beforeEach(async () => {
      const user = { 
        firstname: 'abc', 
        lastname: 'xyz', 
        username: 'abcxyz', 
        email: 'abcxyz@example.com', 
        gender: 'female', 
        password: 'abc123xyz' 
      };
      credentials = { email: user['email'], password: user['password'] };
      await request(server).post('/api/users/').send(user); // create a user for credentials to be tested on
    });
    const exec = async () => {
      return await request(server).post('/api/users/login').send(credentials);
    }

    
    it('should return an error with status-code 400 if any login credential is invalid(syntax wise)', async () => {
      credentials['email'] = 'abcxyz';
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('should return an error with status-code 400 if email is not defined', async () => {
      credentials['email'] = null;
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('should return an error with a status-code 400 if username is being used for login and it is not defined', async () => {
      credentials['email'] = undefined;
      credentials['username'] = null;

      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('should return an error with a status-code of 400 if username or email is not sent with the request', async () => {
      credentials['email'] = undefined;
      credentials['username'] = undefined;

      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('should return an error with a status-code of 400 if login credentials(password) is not correct', async () => {
      credentials['password'] = 'abcxyz123';
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('should return an error with a status-code of 400 if login credentials(username) is not correct', async () => {
      credentials['email'] = undefined;
      credentials['username'] = 'xyzabc';

      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('should return an error with a status-code of 400 if login credentials(email) is not correct', async () => {
      credentials['email'] = 'random@example.com';
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('should authenticate user if credentials(email and password) are valid and correct', async () => {
      const res = await exec();

      expect(res).toBeDefined();
      expect(res.status).toBe(200);
      expect(typeof res.body).toBe('object');
      expect(res.headers['x-auth-token']).toBeDefined();
      expect(res.body['result']['email']).toBe(credentials['email']);
    });

    it('should authenticate user if credentials(username and password) are valid and correct', async () => {
      credentials['email'] = undefined;
      credentials['username'] = 'abcxyz';

      const res = await exec();

      expect(res).toBeDefined();
      expect(res.status).toBe(200);
      expect(typeof res.body).toBe('object');
      expect(res.headers['x-auth-token']).toBeDefined();
      expect(res.body['result']['username']).toBe('@' + credentials['username']);
    });

  });


  describe('GET /me', () => {
    // TODO
    let token;
    beforeEach(async () => {
      const user = { 
        firstname: 'abc', 
        lastname: 'xyz', 
        username: 'abcxyz', 
        email: 'abcxyz@example.com', 
        gender: 'female', 
        password: 'abc123xyz' 
      };
      await request(server).post('/api/users/').send(user); // create a user for credentials to be tested on
      const createdUser = await User.findOne({ 'email': user['email'] });
      token = createdUser.generateAuthToken();
    });
    const exec = async () => {
      return await request(server).get('/api/users/me').set('x-auth-token', token);
    }


    it('should return an error with status-code 400 if token is an empty string', async () => {
      token = '';
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('should return an error with status-code 500 if token is invalid', async () => {
      token = 'abc';
      const res = await exec();
      expect(res.status).toBe(500);
    });

    it('should fetch the user info if token is valid', async () => {
      const res = await exec();
      expect(res).toBeDefined();
      expect(res.status).toBe(200);
      expect(typeof res.body).toBe('object');
      expect(res.body['result']['email']).toBe('abcxyz@example.com');
    });

  });


  describe('ALL /doesUsernameExist', () => {
    let data;
    beforeEach(async () => {
      const user = { 
        firstname: 'abc', 
        lastname: 'xyz', 
        username: 'abcxyz', 
        email: 'abcxyz@example.com', 
        gender: 'female', 
        password: 'abc123xyz' 
      };
      data = { username: user['username'] };
      await request(server).post('/api/users/').send(user); // create a user for credentials to be tested on
    });
    const exec = async () => {
      return await request(server).post('/api/users/doesUsernameExist').send(data);
    }


    it('should return an error with a status-code 400 if username was not sent', async () => {
      data['username'] = undefined;
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('should return an error with status-code 400 if username is less than 4 characters', async () => {
      data['username'] = 'abc';
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('should return true if username already exists', async () => {
      const res = await exec();
      expect(res.status).toBe(200);
      expect(res.body['result']).toBe(true);
    });

    it('should return true if username is prefixed by "@" and already exists', async () => {
      data['username'] = '@' + data['username'];
      const res = await exec();
      
      expect(res.status).toBe(200);
      expect(res.body['result']).toBe(true);
    });

    it('should return false if username does not exist', async () => {
      data['username'] = 'xyzabc';
      const res = await exec();

      expect(res.status).toBe(200);
      expect(res.body['result']).toBe(false);
    });

    it('should return false if username is prefixed by "@" and does not exist', async () => {
      data['username'] = '@xyzabc';
      const res = await exec();
      
      expect(res.status).toBe(200);
      expect(res.body['result']).toBe(false);
    });

  });

});