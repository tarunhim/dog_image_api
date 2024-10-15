const { User } = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { generateAuthToken } = require("../services/auth")
const { createJsonResponse } = require("../services/response");
module.exports.register = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        const user = await User.create({
            userName: req.body.userName,
            password: hashedPassword
        });
        return res.status(201).send(createJsonResponse(true, 'User created successfully', null, user));
    } catch (error) {
        console.error(error);
        res.status(500).send(createJsonResponse(false, 'Error creating user', error, null));
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
            return res.status(404).send(createJsonResponse(false, 'User not found', null, null));
        }

        // Compare the password with the hashed password in the database
        const isMatch = await bcrypt.compare(req.body.password, user.password);

        if (!isMatch) {
            return res.status(401).send(createJsonResponse(false, 'Invalid password', null, null));
        }
        let authToken = await generateAuthToken(user);


        return res.status(201).send(createJsonResponse(true, 'User logged in successfully', null, authToken));
    } catch (error) {
        console.error(error);
        res.status(500).send(createJsonResponse(false, 'Error uploading file', error, null));
    }
}