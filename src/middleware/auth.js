const jwt = require('jsonwebtoken');
const User = require('../models').user;
const config = require('../config')( process.env.NODE_ENV );

module.exports = async (req, res, next) => {
	let token = req.headers.jwt || req.cookies.jwt || '';

	if(!token){
		res.status(500);
		res.json({data: null, error: `You dont have permission to do ${req.method} on ${req.originalUrl}` });
		return;
	}
	
	try{
		let decoded = jwt.verify(token, config.jwt_secret);
		let user = await User.findOne({ where: { id: decoded.id } })
		
		if(!user){
			res.status(500);
			res.json({data: null, error: `You dont have permission to do ${req.method} on ${req.originalUrl}`});
			return;
		}
		
		req.user = {
			id: user.id,
			username: user.username
		};
		next();
	}catch(e){
		res.status(500);
		res.json({data: null, error: `You dont have permission to do ${req.method} on ${req.originalUrl}`});
		return; 
	}
}
