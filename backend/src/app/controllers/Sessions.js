const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../models');
const authConfig = require('../../config/auth');

class SessionController {
    async create(req, res) {
        try {
            const { email, password } = req.body;

            const user = await db.Users.findOne({ where: { email: email } });

            if (!user) {
                return res.status(401).json({ message: 'Invalid username and/or password' });
            }

            if (!(await bcrypt.compare(password, user.password))) {
                return res.status(401).json({ message: 'Invalid username and/or password' });
            }

            const token = jwt.sign({ id: user.id }, authConfig.secret, {
                expiresIn: authConfig.expiresIn,
            });

            const userUpdated = await user.update({ token: token });

            res.status(200).send({
                email: userUpdated.email,
                token: userUpdated.token
            });

        } catch (err) {
            res.status(400).send({ error: err.message });
        }
    };
}

module.exports = new SessionController();
