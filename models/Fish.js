const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Fish extends Model {}

Fish.init(
    {
      name:{
          type:DataTypes.STRING,
          allowNull:false
      },
      width:{
          type:DataTypes.INTEGER,
          allowNull:false
      },
      color:{
          type:DataTypes.STRING,
          allowNull:false
      }
    },{
        sequelize
    }
)

module.exports = Fish;