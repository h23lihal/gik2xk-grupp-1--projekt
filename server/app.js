var express = require('express'); // Importerar Express-modulen

var cookieParser = require('cookie-parser'); // Importerar cookie-parser för att hantera cookies
var logger = require('morgan'); // Importerar morgan för loggning av HTTP-förfrågningar

var app = express(); // Skapar en instans av Express-applikationen

app.use(logger('dev')); // Aktiverar morgan loggning med 'dev'-format (ger detaljerad loggning)
app.use(express.json()); // Middleware för att hantera JSON-data i förfrågningar
app.use(express.urlencoded({ extended: false })); // Middleware för att hantera URL-kodad data i förfrågningar
app.use(cookieParser()); // Middleware för att hantera cookies i förfrågningar

// CORS (Cross-Origin Resource Sharing) middleware: Tillåter alla domäner att göra förfrågningar till servern
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Tillåter alla domäner
    res.header('Access-Control-Allow-Headers', '*'); // Tillåter alla headers
    res.header('Access-Control-Allow-Methods', 'GET, PUT, PATCH, POST, DELETE'); // Tillåter dessa HTTP-metoder
    next(); // Går vidare till nästa middleware eller route handler
});

// Definierar vägar för olika funktioner i applikationen
app.use('/products', require('./routes/productsRoute')); // Huvudväg för produkter
app.use('/customers', require('./routes/customersRoute')); // Huvudväg för kunder
app.use('/ratings', require('./routes/ratingsRoute')); // Huvudväg för betyg
app.use('/cart', require('./routes/cartRoute')); // Huvudväg för varukorgen

module.exports = app; 
