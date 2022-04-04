const db = require('../models');
const bcrypt = require('bcryptjs');

class UsersController {
    async create(req, res) {
        try {
            const { name, email, phone, password } = req.body;

            const emailExists = await db.Users.findOne({ where: { email: email } });

            if (emailExists) {
                throw new Error('E-mail already registered. Please enter a different email');
            }

            const phoneExists = await db.Users.findOne({ where: { phone: phone } });

            if (phoneExists) {
                throw new Error('Phone number already registered. Please enter a different phone');
            }

            const pass = await bcrypt.hash(password, 8);

            await db.Users.create({
                name,
                email,
                phone,
                password: pass
            });

            res.status(201).send({ message: 'User created successfully. Please login to the app' });
        } catch (err) {
            console.error(err.message);
            res.status(400).send({ error: err.message });
        }
    };

    async read(req, res) {
        try {
            const user = await db.Users.findByPk(req.userId);

            res.status(200).send({
                user: {
                    name: user.name,
                    phone: user.phone,
                    email: user.email,
                    createdAt: user.createdAt,
                }
            });
        } catch (err) {
            console.error(err.message);
            res.status(400).send({ error: err.message });

        }
    }

    async update(req, res) {
        try {
            const user = await db.Users.findByPk(req.userId);

            user.update(req.body);

            res.status(200).send({ message: 'User successfully updated' });
        } catch (err) {
            console.error(err.message);
            res.status(400).send({ error: err.message });
        }
    }

    async delete(req, res) {
        try {
            await db.Users.destroy({ where: { id: req.userId } });

            res.status(200).send({ message: 'User successfully deleted' });
        } catch (err) {
            console.error(err.message);
            res.status(400).send({ error: err.message });
        }
    }
};

module.exports = new UsersController();
