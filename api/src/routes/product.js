const server = require('express').Router();
const { Product, Category, Categoryproduct, Review, User} = require('../db.js');
const mercadopago = require('mercadopago');

server.get('/', (req, res, next) => {
	Product.findAll({include:{
		model: Review
	}})
		.then(products => {
			res.send(products);
		})
		.catch(next);
});

//trae el producto que tenga esa ID
server.get("/:id", (req, res) => {
	const id = req.params.id
	Product.findOne({
		where: { id: id },
		include: { model: Category }
	})
		.then(prod => {
			return res.send(prod)
		})
})

//agrega categoria al producto
server.post('/:idProducto/category/', (req, res) => {

	const { idProducto } = req.params;
	const categoriesCheck = req.body[1];
	console.log('categorias:', categoriesCheck);

	if (!idProducto) {
		return res.status(400).send("Faltan parametros !!!")
	}

	Categoryproduct.destroy({
		where: {
			productId: idProducto
		}
	})
	let categoriesProductCreate = [];
	for (let i = 0; i < categoriesCheck.length; i++) {
		objCategoriesProduct = {
			categoryId: categoriesCheck[i],
			productId: idProducto
		}
		categoriesProductCreate.push(objCategoriesProduct);
	}

	Categoryproduct.bulkCreate(
		categoriesProductCreate
	).then(algo => {
		res.send(algo);
	}).catch(err => {
		console.log("no anda")
		res.send(err)
	})

})

//quitar categoria al producto
server.delete('/:idProducto/category/:idCategoria', (req, res) => {
	const { idProducto, idCategoria } = req.params;

	if (!idProducto || !idCategoria) {
		return res.status(400).send("Faltan parametros !!!")
	}

	Categoryproduct.destroy({
		where: {
			productId: idProducto,
			categoryId: idCategoria
		}
	})
		.then(() => {
			res.send("ando!!");
		})
})

// AGREGAR PRODUCTOS 
server.post('/', (req, res) => {
	//SE VERIFICAN LOS CAMPOS
	const { name, description, price, stock, img } = req.body;

	if (!name || !description || !price || !stock) {
		return res.status(400).send("Los campos enviados no son correctos.")
	}

	Product.create({
		name: name,
		description: description,
		price: price,
		stock: stock,
		img: img
	})
		.then((prod) => {
			res.send(prod);
		})
})

//ACTUALIZAR PRODUCTO
server.put('/:idProducto', (req, res) => {
	const { idProducto } = req.params;
	const { name, description, price, stock, img } = req.body

	if (!idProducto) {
		return res.status(400).send("Faltan parametros !!!")
	}
	if (!name || !description || !price || !stock) {
		return res.status(400).send("Los campos enviados no son correctos.")
	}

	Product.update(
		{
			name: name,
			description: description,
			price: price,
			stock: stock,
			img: img
		},
		{
			where:
				{ id: idProducto }
		}
	)
		//agregar esto!!!!!
		.then((r) => {
			res.status(200).json(req.body)
		})
})

//ELIMINAR PRODUCTO
server.delete('/:idProducto', (req, res) => {
	const { idProducto } = req.params;
	if (!idProducto) {
		return res.status(400).send("Faltan parametros !!!");
	}
	Product.destroy({
		where: {
			id: idProducto
		}
	})
		.then(r => {
			res.send("El producto se elimino con exito")
		})
		.catch(err => {
			res.send("algo malir sal")
		})
})

// Crear Ruta que devuelva los productos de X categoría

server.get("/category/:id", (req, res) => {

	const { id } = req.params;

	Product.findAll({
		include: [{
			model: Category,
			attributes: ['id', 'name'],
			where: {
				id: id
			},
			through: { attributes: [] }
		}]
	})
		.then(function (productId) {
			res.status(200).json(productId);
		})

})

// Crear ruta para crear/agregar Review

server.post("/:id/review", (req, res) => {

	const { calificacion, descripcion} = req.body;
	let productId = req.params.id;
    const userId = req.body.userId;

	console.log("uId=", userId, "productId=", productId );
	
	Review.findAll({
			where: {
				userId: userId, 
				productId: productId
			},
	})
	.then(function (out) {

		if(out.length==0)
			{
				Review.create({
					calificacion: calificacion,
					descripcion: descripcion,
					userId: userId,
					productId: productId
				})
					.then(function (Review) {
						res.json(Review);
					})
			}
		else
			{
			res.status(400).send("Error ya hay review");
			}
	})
})


// DELETE /product/:id/review/:idReview
//ELIMINAR REVIEW
server.delete('/:productId/review/:review', (req, res) => {
	const { review } = req.params;
	const { productId } = req.params;
	console.log("entro");
	if (!review || !productId) {
		return res.status(400).send("Faltan parametros !!!");
	}
	Review.destroy({
		where: {
			id: review,
			productId: productId
		}
	})
		.then(r => {
			res.send("El review se le elimino con exito")
		})
		.catch(err => {
			res.send("algo salio mal")
		})
})
server.put("/:idProducto/review/:idReview", (req,res)=>{
	const { idProducto,idReview } = req.params;
	const { calificacion, descripcion} = req.body

	if (!idProducto) {
		return res.status(400).send("Faltan parametros !!!")
	}
	if (!calificacion || !descripcion){
		return res.status(400).send("Los campos enviados no son correctos.")
	}

	Review.update(
		{
			descripcion: descripcion,
			calificacion: calificacion,
		},
		{
			where:
				{ id: idReview,productId: idProducto}
		}
	)
		.then((r) => {
			res.status(200).json(req.body)
		})
})
//Trae todas las review de un producto
server.get("/:id/review/", (req,res)=>{
	let prodId= req.params.id
	Review.findAll({where:{productId: prodId}})
	.then(reviews=>{
			res.send(reviews)
	})
})

//mercado pago
server.post('/mercadoPago', (req, res) => {
	mercadopago.configure({
		access_token: 'TEST-577722203307587-031506-1b58f85e3673ad5209388d3d95940707-307991210'
	  });
	  
	  let preference = {
		  items: [
			{
			  title: req.body.title,
			  unit_price: req.body.price,
			  quantity: req.body.quantity
			}
		  ]
		};
		
	  mercadopago.preferences.create(preference)
		.then(response => {
			console.log(response.body.id);
		  res.send(response.body.id)
		}).catch(error => {
		  res.send(error)
		});
	})


module.exports = server;