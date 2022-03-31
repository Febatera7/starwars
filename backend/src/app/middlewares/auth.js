const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const authConfig = require('../../config/auth');
const db = require('../models');

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).send({ message: 'Not authorized' });
    }

    const [, token] = authHeader.split(' ');

    if (!token) {
      res.status(401).send({ message: 'Not authorized' });
    }

    try {
      const user = await db.Users.findOne({
        where: {
          token: token
        }
      });

      if (!user) {
        return res.status(401).json({ message: 'Not authorized' });
      }

      const decoded = await promisify(jwt.verify)(token, authConfig.secret);

      req.userId = decoded.id;

      return next();
    } catch (err) {
      res.status(401).send({ mensagem: 'Session expired, please login again' });
    }

  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};
