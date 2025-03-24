'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

// 🔹 Lägger till relationer mellan modeller
db.customers.hasMany(db.carts, { foreignKey: 'customerId', allowNull: false, onDelete: 'CASCADE' });
db.carts.belongsTo(db.customers, { foreignKey: 'customerId', allowNull: false, onDelete: 'CASCADE' });

db.carts.hasMany(db.cartRows, { foreignKey: 'cartId', allowNull: false, onDelete: 'CASCADE' });
db.cartRows.belongsTo(db.carts, { foreignKey: 'cartId', allowNull: false, onDelete: 'CASCADE' });

db.products.hasMany(db.cartRows, { foreignKey: 'productId', allowNull: false, onDelete: 'CASCADE' });
db.cartRows.belongsTo(db.products, { foreignKey: 'productId', allowNull: false, onDelete: 'CASCADE' });

db.products.hasMany(db.ratings, { foreignKey: 'productId', allowNull: false, onDelete: 'CASCADE' });
db.ratings.belongsTo(db.products, { foreignKey: 'productId', allowNull: false, onDelete: 'CASCADE' });

// 🔹 Se till att associate() körs för varje modell
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;