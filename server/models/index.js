'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename); // Hämtar filnamnet för nuvarande fil
const env = process.env.NODE_ENV || 'development'; // Bestämmer vilken miljö (ex. development) som ska användas
const config = require(__dirname + '/../config/config.json')[env]; // Hämtar databasinställningarna från config.json beroende på miljö
const db = {}; // Objekt som kommer att innehålla alla tabeller

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

// Läser in alla tabelldefinitionsfiler i nuvarande mapp (utom denna fil)
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js' // Filtrera ut dolda filer och denna fil
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes); // Hämtar varje modell och skickar in sequelize-instansen
    db[model.name] = model; // Lägger till modellen i db-objektet
  });

// Definierar relationer mellan tabeller
db.customers.hasMany(db.carts, { foreignKey: 'customerId', allowNull: false, onDelete: 'CASCADE' });
db.carts.belongsTo(db.customers, { foreignKey: 'customerId', allowNull: false, onDelete: 'CASCADE' });

db.carts.hasMany(db.cartRows, { foreignKey: 'cartId', allowNull: false, onDelete: 'CASCADE' });
db.cartRows.belongsTo(db.carts, { foreignKey: 'cartId', allowNull: false, onDelete: 'CASCADE' });

db.products.hasMany(db.cartRows, { foreignKey: 'productId', allowNull: false, onDelete: 'CASCADE' });
db.cartRows.belongsTo(db.products, { foreignKey: 'productId', allowNull: false, onDelete: 'CASCADE' });

db.products.hasMany(db.ratings, { foreignKey: 'productId', allowNull: false, onDelete: 'CASCADE' });
db.ratings.belongsTo(db.products, { foreignKey: 'productId', allowNull: false, onDelete: 'CASCADE' });

// Ser till att associate() körs för varje tabell om det finns några relationer definierade i tabellerna
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Exporterar alla modeller och sequelize-instansen för användning i andra delar av appen
module.exports = db;