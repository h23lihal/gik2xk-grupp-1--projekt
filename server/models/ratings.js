const { validate } = require("validate.js");

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('ratings', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      rating: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      }
    }, 
    
    
    { 
      underscored: true 
    });
  };
  