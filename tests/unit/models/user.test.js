const { User, userSchema } = require('../../../models/user.js');
const jwt = require('jsonwebtoken');
require('dotenv/config.js');

describe('user', () => {
  it('should generate a mock json web token for the user', () => {
    userSchema.methods.generateAuthToken = jest.fn().mockReturnValue('...');

    const mockUser = new User({
      'firstname': 'abc',
      'lastname': 'xyz',
      'username': '@abcxyz',
      'email': 'abc.xyz@example.com',
      'gender': 'male',
      'password': '012345'
    });
    const token = mockUser.generateAuthToken();

    expect(token).toMatch(/.../);
  });

  it('should generate a real json web token for the user', () => {
    const user = new User({
      'firstname': 'abc',
      'lastname': 'xyz',
      'username': '@abcxyz',
      'email': 'abc.xyz@example.com',
      'gender': 'male',
      'password': '012345'
    });
    const token = user.generateAuthToken();
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    
    expect(payload['_id']).toBe(user['_id'].toHexString());
  });
});