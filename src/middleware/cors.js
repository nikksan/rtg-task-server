module.exports = (req, res, next) => {
	res.header('Access-Control-Allow-Origin'		, `${req.get('origin')}`);
	res.header('Access-Control-Allow-Credentials'	, 'true');
	res.header('Access-Control-Allow-Methods'		, 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers'		, 'Content-Type');

	if (req.method === 'OPTIONS') {
		return res.send(200);
	}

	next();
}