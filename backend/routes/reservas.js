const express = require('express');
const router = express.Router();
const { guardarReserva } = require('../controllers/index.controllers');

// Ruta para crear una nueva reserva
router.post('/api/reservas', guardarReserva);

module.exports = router; 