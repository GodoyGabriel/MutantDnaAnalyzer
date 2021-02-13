// Cargar modulos de node para crear servidor
const express = require('express');
const bodyParser = require('body-parser');

// Ejecutar express (http)
const app = express();

// Cargar ficheros rutas
const dnaRoutes = require('./routes/dnaRoutes');

// Middlewares
app.use(bodyParser.urlencoded({ extended: false} ));   // Para utilizar el bodyparser
app.use(bodyParser.json());  // Convertir las peticiones a json

// CORS

// Añadir prefijos a rutas / Cargar rutas
app.use('/', dnaRoutes);
// Exportar modulo (fichero actual)
module.exports = app;