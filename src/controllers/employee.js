const Employee = require('../models').employee;

module.exports = {
	index: async (req, res) => {
		try{
			let employees = await Employee.findAll();
			res.json({error: null, data: employees})
		}catch(e){
			res.status(500);
			res.json({error: e.message, data: null})
		}
	},
	
	show: async (req, res) => {
		try{
			if(employee = await Employee.findById(req.params.id)){
				res.json({error: null, data: employee})
			}else{
				res.status(404);
				res.json({error: `Employee #${req.params.id} not found`, data: null})
			}
		}catch(e){
			res.status(500);
			res.json({error: e.message, data: null})
		}
	},
	
	create: async (req, res) => {
		try{
			let employee = await Employee.create({
				name: req.body.name,
				picture: req.body.picture,
				big	: req.body.big
			});
			res.json({error: null, data: employee})
		}catch(e){
			res.status(500);
			res.json({error: e.message, data: null})
		}
	},
	
	edit: async (req, res) => {
		try{
			if(await Employee.findById(req.params.id)){
				await Employee.update(
					{
						name: req.body.name,
						picture: req.body.picture,
						big	: req.body.big
					},
					{	where: { id: req.params.id } }
				)
				let employee = await Employee.findById(req.params.id);
				res.json({error: null, data: employee });
			}else{
				res.status(404);
				res.json({error: `Employee #${req.params.id} not found`, data: null})
			}
		}catch(e){
			res.status(500);
			res.json({error: e.message, data: null})
		}
	},
	
	delete: async (req, res) => {
		try{
			if(employee = await Employee.findById(req.params.id)){
				await Employee.destroy(
					{	where: { id: req.params.id } }
				)
				res.json({error: null, data: employee });
			}else{
				res.status(404);
				res.json({error: `Employee #${req.params.id} not found`, data: null})
			}
		}catch(e){
			res.status(500);
			res.json({error: e.message, data: null})
		}
	}
}