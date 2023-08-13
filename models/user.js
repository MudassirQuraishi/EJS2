const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const User = sequelize.define('users',{
    id : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        allownull : false,
        autoIncrement : true,
    },
    name : Sequelize.STRING,
    email : Sequelize.STRING,
});

module.exports = User;
