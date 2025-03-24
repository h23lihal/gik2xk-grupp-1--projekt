

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('carts', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      payed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      }
    }, { 
      underscored: true 
    });
  };
  