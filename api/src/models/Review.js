const { DataTypes } = require('sequelize');

// Modelo de Review !
module.exports = (sequelize) => {
    // Se define el modelo !
  sequelize.define('review', {
    calificacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT
    },
    userId: {
      type: DataTypes.INTEGER
    }
  });
};