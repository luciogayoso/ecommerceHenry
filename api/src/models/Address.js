const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
 
  sequelize.define('address', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    postalCode: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city:{
        type: DataTypes.STRING,
        allowNull: false,
    }
  });
};