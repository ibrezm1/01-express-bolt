const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { ApiError } = require('../utils/errors');
const internalUsers = require('../data/internal.json');

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = internalUsers.users.find(u => u.username === username);
    if (!user) {
      throw new ApiError(401, 'Invalid credentials');
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new ApiError(401, 'Invalid credentials');
    }

    const token = jwt.sign(
      { 
        id: user.id, 
        username: user.username, 
        role: user.role 
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (error) {
    next(error);
  }
};