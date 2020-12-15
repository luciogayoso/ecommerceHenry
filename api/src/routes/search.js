const server = require('express').Router();
const { Product } = require('../db.js');
const { Sequelize } = require('sequelize');

const Op = Sequelize.Op

//toma el valor query que le pasan por la url, busca productos que tenga esas palabras en el nombre o descripcion
server.get('/',(req,res)=>{
    const search = req.query.query;
    

    if(!search){
        return res.json([])
    }
    Product.findAll({
        where:{ [Op.or]: {
            name: {
           [Op.iLike] : '%'+search+'%'}
            ,
            description:{
            [Op.iLike] : '%'+search+'%'   
            }}
            }
    })
    .then(products => {
        if(products== false){
            return res.json([])
        }
        res.send(products);
    })
    .catch(err=>{ 
        res.send(err)})
})


module.exports = server;