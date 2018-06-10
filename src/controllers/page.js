const Page = require('../models').page;

module.exports = {
	index: async (req, res) => {
		try{
			let pages = await Page.findAll();
			res.json({error: null, data: pages})
		}catch(e){
			res.status(500);
			res.json({error: e.message, data: null})
		}
	},
	
	show: async (req, res) => {
		try{
			if(opening = await Page.findById(req.params.id)){
				res.json({error: null, data: opening})
			}else{
				res.status(404);
				res.json({error: `Page #${req.params.id} not found`, data: null})
			}
		}catch(e){
			res.status(500);
			res.json({error: e.message, data: null})
		}
	},
	
	create: async (req, res) => {
		try{
			let opening = await Page.create({
				slug: req.body.slug,
				title: req.body.title,
				content: req.body.content
			});
			res.json({error: null, data: opening})
		}catch(e){
			res.status(500);
			res.json({error: e.message, data: null})
		}
	},
	
	edit: async (req, res) => {
		try{
			if(await Page.findById(req.params.id)){
				await Page.update(
					{
						slug: req.body.slug,
						title: req.body.title,
						content: req.body.content
					},
					{	where: { id: req.params.id } }
				)

				let page = await Page.findById(req.params.id);
				res.json({error: null, data: page });
			}else{
				res.status(404);
				res.json({error: `Page #${req.params.id} not found`, data: null})
			}
		}catch(e){
			res.status(500);
			res.json({error: e.message, data: null})
		}
	},
	
	delete: async (req, res) => {
		try{
			if(page = await Page.findById(req.params.id)){
				await Page.destroy(
					{	where: { id: req.params.id } }
				)
				res.json({error: null, data: page });
			}else{
				res.status(404);
				res.json({error: `Page #${req.params.id} not found`, data: null})
			}
		}catch(e){
			res.status(500);
			res.json({error: e.message, data: null})
		}
	}
}