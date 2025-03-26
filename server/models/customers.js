const { all } = require("../app");
// Definierar en modell för 'Customers' i en Sequelize-baserad databas
module.exports = (sequelize, DataTypes) => {
    return sequelize.define ('customers', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      firstName: {
        type: DataTypes.STRING (50),
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING (50),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING (200),
        allowNull: false,
        validate : {len: [4, 200],
            isEmail: true
        },
      },
      password: {
        type: DataTypes.STRING (200),
        allowNull: false,
      }
    },
      { underscored: true});
      
  };