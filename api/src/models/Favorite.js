const { DataTypes } = require('sequelize');

module.exports = (sequelize)=>{
    sequelize.define('favorite', { 

        id :{ 
            type: DataTypes.INTEGER,
            primaryKey: true,
            valueDefault: 1,
            autoIncrement: true,
            allowNull: true
            
        },         
        userId:{
            type: DataTypes.INTEGER,
        },
        productId: {
            type: DataTypes.INTEGER,

        }    
    });
}