

const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const CartItem = sequelize.define('cart-item',{
  id :{
    type : Sequelize.INTEGER,
    allowNull : false,
    primaryKey : true,
    autoIncrement : true
  },
  quantity : Sequelize.INTEGER
});

module.exports = CartItem;