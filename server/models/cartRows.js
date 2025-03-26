const { underscoreIf } = require('sequelize/lib/utils');

// Definierar en modell för 'cartRows' (varukorgsrader) i en Sequelize-baserad databas
module.exports = (sequelize, DataTypes) => {
    // Här definieras en modell med namnet 'cartRows' som representerar varukorgens rader i databasen
    return sequelize.define('cartRows', {
        
        // Definierar fältet 'id' som en primärnyckel (primary key) för tabellen
        id: {
            type: DataTypes.INTEGER, 
            primaryKey: true,        
            autoIncrement: true,  
        },
        
        // Definierar fältet 'amount' som antalet av en viss produkt i varukorgen
        amount: {
            type: DataTypes.DOUBLE,  
            allowNull: false,       
        }

    }, { 
        // Sätter 'underscored' till true så att alla attributnamn i modellen använder underskruv (_)
        underscored: true 
    });
}