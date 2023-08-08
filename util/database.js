const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete','root','H3lloworld!',{ 
    dialect : 'mysql', 
    host :'localhost'
});

module.exports = sequelize;
