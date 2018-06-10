const express = require('express');
const app = express();
const config = require('./config')( process.env.NODE_ENV );
const models = require('./models');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const fileUpload = require('express-fileupload');
const apiRoutes = require('./routes/api');
const path = require('path');

// Allow CORS (dev-only)
if(process.env.NODE_ENV === 'development'){
	app.use(require('./middleware/cors'));
} 

app.use(fileUpload());
app.use(bodyParser.json({limit: config.request_entity_limit}));
app.use(bodyParser.urlencoded({limit: config.request_entity_limit, extended: true}));
app.use(cookieParser());

// Serve server static files
app.use(express.static(path.join(__dirname, 'public')))
// Serve client static files
app.use(express.static(path.join(__dirname, 'build')))
app.use('/api', apiRoutes);

app.get('*', (req, res) => {
	res.sendFile('build/index.html' , { root : __dirname});
});

app.all('*', (req, res) => {
	res.status(404);
	res.send('Nothing found..');
});

app.listen(config.port, () => console.log(`Web app listening on port ${config.port}. Environment: ${ process.env.NODE_ENV }`));