const { DataTypes } = require('sequelize');

module.exports = (sequelize)=>{
    sequelize.define('categoryproduct', { 

        id :{ 
            type: DataTypes.INTEGER,
            primaryKey: true,
            valueDefault: 1,
            autoIncrement: true,
            allowNull: true
            
        },         
        categoryId:{
            type: DataTypes.INTEGER,
        },
        productId: {
            type: DataTypes.INTEGER,

        }    
    });
}