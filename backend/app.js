const express = require('express');
const cors = require('cors');
const reservasRoutes = require('./routes/reservas');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/', reservasRoutes);

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

module.exports = app; 