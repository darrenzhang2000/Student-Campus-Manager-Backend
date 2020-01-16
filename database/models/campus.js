const Sequelize = require('sequelize');
const db = require('../db');

//enrollment array not included yet

const Campus = db.define("campus", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  campusName: {
    type: Sequelize.STRING,
    allowNull: false
  },

  address1: {
    type: Sequelize.STRING,
    allowNull: false
  },

  address2: {
    type: Sequelize.STRING,
    allowNull: false
  },

  campusImage: {  
    type: Sequelize.STRING,
    allowNull: false
  },

  description: {  
    type: Sequelize.STRING,
    allowNull: false
  }


});

module.exports = Campus;
