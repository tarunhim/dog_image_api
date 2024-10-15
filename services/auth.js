const jwt = require('jsonwebtoken')
const fs = require('fs');
const bcrypt = require('bcrypt');


module.exports.generateAuthToken = (userDetails) => {
	return new Promise((resolve, reject) => {
		try {
			let tokenSession = Math.floor((Date.now() + 1 * 6 * 60 * 60 * 1000)/ 1000); // Current Date + days + hours + minutes + seconds + milliseconds
			let tokenPlayload = {
				id: userDetails.id,
				userName: userDetails.userName,
				   exp: tokenSession
			}
		
			resolve(jwt.sign(tokenPlayload, process.env.SECRET_KEY));
		} catch (error) {
			reject(error);
		}
	})
}

module.exports.validateAccessToken = async (req, res, callback) => {
	try {
		let accessToken = req.body.token || req.headers['Authorization'] || req.headers['authorization'];
		jwt.verify(accessToken, process.env.SECRET_KEY, async(err, decoded) => {
			if(decoded) {
				console.log("decoded", decoded)
				 req.decoded = decoded;
				 callback();
			} else {
				res.status(401).send({ error: 'Invalid access token' });
			}
		});

	} catch (error) {
		res.status(401).send({ error: 'Invalid access token' });
	}
}