const { underscoreIf } = require('sequelize/lib/utils');
module.exports = (sequelize, DataTypes) => {
    return sequelize.define ('cartRows', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
        amount: {
            type: DataTypes.DOUBLE,
            allowNull: false,
          }
    }, { underscored: true});

}