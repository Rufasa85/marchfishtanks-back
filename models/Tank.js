const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Tank extends Model {}

Tank.init(
    {
      name:{
          type:DataTypes.STRING,
          allowNull:false
      }
    },{
        sequelize
    }
)

module.exports = Tank;