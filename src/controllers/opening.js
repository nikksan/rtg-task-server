const Opening = require('../models').opening;

module.exports = {
	index: async (req, res) => {
		try{
			let openings = await Opening.findAll();
			res.json({error: null, data: openings})
		}catch(e){
			res.status(500);
			res.json({error: e.message, data: null})
		}
	},
	
	show: async (req, res) => {
		try{
			if(opening = await Opening.findById(req.params.id)){
				res.json({error: null, data: opening})
			}else{
				res.status(404);
				res.json({error: `Opening #${req.params.id} not found`, data: null})
			}
		}catch(e){
			res.status(500);
			res.json({error: e.message, data: null})
		}
	},
	
	create: async (req, res) => {
		try{
			let opening = await Opening.create({
				title: req.body.title,
				description: req.body.description
			});
			res.json({error: null, data: opening})
		}catch(e){
			res.status(500);
			res.json({error: e.message, data: null})
		}
	},
	
	edit: async (req, res) => {
		try{
			if(await Opening.findById(req.params.id)){
				await Opening.update(
					{
						title: req.body.title,
						description: req.body.description
					},
					{	where: { id: req.params.id } }
				)
				let opening = Opening.findById(req.params.id);
				res.json({error: null, data: opening });
			}else{
				res.status(404);
				res.json({error: `Opening #${req.params.id} not found`, data: null})
			}
		}catch(e){
			res.status(500);
			res.json({error: e.message, data: null})
		}
	},
	
	delete: async (req, res) => {
		try{
			if(opening = await Opening.findById(req.params.id)){
				await Opening.destroy(
					{	where: { id: req.params.id } }
				)
				res.json({error: null, data: opening });
			}else{
				res.status(404);
				res.json({error: `Opening #${req.params.id} not found`, data: null})
			}
		}catch(e){
			res.status(500);
			res.json({error: e.message, data: null})
		}
	}
}