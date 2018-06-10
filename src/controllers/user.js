const User = require('../models').user;
const config = require('../config')( process.env.NODE_ENV );
const jwt = require('jsonwebtoken');

module.exports = {
	login: async (req, res) => {
		try{
			let user = await User.findOne({ where: { username: req.body.username } });
			if(!user){
				res.status(500);
				res.json({
					data: null,
					error: 'User not found' 
				});
				return;
			}

			if(!await user.isCorrectPassword(req.body.password)){
				res.status(500);
				res.json({
					data: null,
					error: 'Incorrect passowrd' 
				});
				return;
			}

			// Sign a token
			let token = jwt.sign({ id: user.id }, config.jwt_secret);
			res.json({
				data: {
					token: token
				},
				error: null
			});
		}catch(e){
			res.status(500);
			res.json({
				data: null,
				error: e.message 
			});
		}
	},
	register: async (req, res) => {
		try{
			let user = await User.create({
				username: req.body.username,
				password: req.body.password
			});

			// Sign a token
			let token = jwt.sign({ id: user.id }, config.jwt_secret);

			res.json({
				data: {
					token: token
				},
				error: null
			});
		}catch(e){
			res.status(500);
			res.json({
				data: null,
				error: e.message 
			});
		}
	},
	auth: (req, res) => {
		res.json({
			data: {
				user: req.user
			},
			error: null
		});
	}
}