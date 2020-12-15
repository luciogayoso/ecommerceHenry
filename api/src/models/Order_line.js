const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('order_line', {
    id:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      valueDefault:1,
      autoIncrement:true,
      allowNull:true

    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    productId:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    orderId:{
      type:DataTypes.INTEGER,
      allowNull:false
    }

  });
};