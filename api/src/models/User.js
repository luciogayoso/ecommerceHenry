const { DataTypes }= require('sequelize');
// require('sequelize-isunique-validator')(DataTypes)
const bcrypt = require("bcrypt");

//Modelo de usuario
module.exports = (sequelize) => {
    // defino el modelo
   const User= sequelize.define('user', {
        name:{
            type: DataTypes.STRING,
        },
        lastname:{
            type: DataTypes.STRING,
        },
        dni:{
            type: DataTypes.INTEGER,
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            unique:true,
            validated:{
              isEmail: true,
            }
        },
        username:{
            type: DataTypes.STRING,
            unique:true,
        },
        password:{
            type: DataTypes.STRING,
            set(value){
                const newPass=User.generateHash(value)
                this.setDataValue('password',newPass)
            }
        },
        image:{
            type: DataTypes.BLOB('long')
        },
        typeUser:{
            type: DataTypes.ENUM('Admin','cliente'),
            defaultValue: 'cliente'
        
        },
        googleId:{
            type: DataTypes.STRING
        }
    })
User.generateHash= function(password) {
                return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
            }
User.prototype.validPassword=function(password) {
                return bcrypt.compareSync(password, this.password);
            }

User.sync()
    return User;
  
 };
