const path = require('path');

module.exports = {
	image: async (req, res) => {
		if(!req.files || !req.files.image){
			res.status(500);
			res.json({
				data: null,
				error: 'Missing file!'
			});
			return;
		}

		let image = req.files.image;
		if(image.mimetype.indexOf('image/') === 0){
			let ext = image.name.split('.').pop();
			let name = +new Date();
			let filepath = `/images/${name}.${ext}`;
			
			try{
				await image.mv(path.join(__dirname, '/../public/', filepath));
				res.json({
					data: { image: filepath },
					error: null
				});
			}catch(e){
				res.status(500);
				res.json({
					data: null,
					error: e.message
				});
			}
		}else{
			res.status(500);
			res.json({
				data: null,
				error: 'Only image files are allowed!'
			});
		}

	}
}