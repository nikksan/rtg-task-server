const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth');

const UserController = require('../controllers/user');
const EmployeeController = require('../controllers/employee');
const OpeningController = require('../controllers/opening');
const PageController = require('../controllers/page');
const UploadController = require('../controllers/upload');

router.post('/user/register', 			UserController.register);
router.post('/user/login', 				UserController.login);
router.post('/user/auth', 				authMiddleware, UserController.auth);

router.post('/upload/image', 		UploadController.image);

router.get('/employees', 			EmployeeController.index);
router.get('/employees/:id', 		EmployeeController.show);
router.post('/employees',			authMiddleware, EmployeeController.create);
router.put('/employees/:id', 		authMiddleware, EmployeeController.edit);
router.delete('/employees/:id',		authMiddleware, EmployeeController.delete);

router.get('/openings', 				OpeningController.index);
router.get('/openings/:id', 			OpeningController.show);
router.post('/openings',				authMiddleware, OpeningController.create);
router.put('/openings/:id', 			authMiddleware, OpeningController.edit);
router.delete('/openings/:id',			authMiddleware, OpeningController.delete);

router.get('/pages', 				PageController.index);
router.get('/pages/:id', 			PageController.show);
router.post('/pages',				authMiddleware, PageController.create);
router.put('/pages/:id', 			authMiddleware, PageController.edit);
router.delete('/pages/:id',			authMiddleware, PageController.delete);

router.all('*', (req, res) => {
	res.status(404);
	res.json({data: null, error: `${req.method} on ${req.originalUrl} is not a valid endpoint`});
})

module.exports = router;