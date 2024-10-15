const { User } = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { generateAuthToken } = require("../services/auth")
module.exports.register = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        const user = await User.create({
            userName: req.body.userName,
            password: hashedPassword
        });
        return res.status(201).send(user);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Error registering user' });
    }
}

module.exports.login = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                userName: req.body.userName,
            }
        });

        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        // Compare the password with the hashed password in the database
        const isMatch = await bcrypt.compare(req.body.password, user.password);

        if (!isMatch) {
            return res.status(401).send({ error: 'Invalid password' });
        }
        let authToken = await generateAuthToken(user);


        return res.status(201).send({ success: true, authToken: authToken });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Error registering user' });
    }
}