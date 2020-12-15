const server = require('express').Router();
const {Category, Categoryproduct} = require('../db.js');
//TODAS LAS CATEGORIAS
server.get('/', (req, res, next) => {
	
	Category.findAll()
		.then(categoryId => {
			res.send(categoryId);
		})
		.catch(next);
	
});

server.post('/',(req,res) => {
	 
	const  {name, description} = req.body;
	console.log(req.body)
	Category.create({
		name:name,
		description:description,
	})
	.then((cat)=>{
		//console.log(cat)
		res.send(cat)
	})

}) 

server.delete('/:idCategoria', (req, res)=>{
	const  {idCategoria} = req.params;

	 if(!idCategoria){
	   res.status(400).send("Faltan parametros !!!")
	} 

	Category.destroy({
		where:{
			id:idCategoria
		}
	})
	.then(() => {
		res.send("ando!!");

	})

})


// Modifica la categoria existente 
server.put('/:idCategoria', (req, res) => {
	const  {idCategoria} = req.params;


	 Category.findByPk(idCategoria)
	.then (function(category){
        category.name = req.body.name;
        category.description = req.body.description;
        category.save();
        res.status(201).send(category);
	})
});

server.get('/:idProducto', (req, res) => {
	const { idProducto } = req.params;

	if (!idProducto) {
		return res.status(400), res.send("Faltan parametros !!!");
	}

	Categoryproduct.findAll({
		where: {
			productId: idProducto
		}
	})
	.then(categories => {
		res.json(categories);
	})
	.catch(err => {
		res.send(err);
	})
})


module.exports = server;

 


