import {pool} from '../db.js';


export const ping = async (req,res) => {
    const [result] = await pool.query('SELECT "pong" AS result')
    res.json(result)
}

// Controlador para login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await pool.query('SELECT * FROM user WHERE LOWER(email) = LOWER(?) AND password = ?', [email, password]);

    if (rows.length > 0) {
      const user = rows[0];
      req.session.userId = user.id;

      res.status(200).json({
        success: true,
        user: {
          id: user.id,
          nombre: user.nombre,
          apellido: user.apellido,
          email: user.email,
          rol: user.rol,
        }
      });
    } 
    else {
      res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
    }
  } 
  catch (error) {
    res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
};

// Controlador para registrar
export const registerUser = async (req, res) => {

  try {
    const { nombre, apellido, email, password } = req.body;

    const userRole = 'client';
  
    const [rows] = await pool.query('INSERT INTO user (nombre, apellido, email, password, rol) VALUES (?, ?, ?, ?, ?)', [nombre, apellido, email, password, userRole]);
    res.status(201).json({ 
      success: true, 
      message: 'Usuario registrado exitosamente', 
      userId: rows.insertId 
    });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' }); 
  }
};

export const updateUser = async (req, res) => {
  try {
    const { nombre, apellido, email } = req.body;  // Solo permitimos estos campos
    const userId = req.params.id;

    // Realiza la actualización sin tocar el rol
    const [result] = await pool.query(
      'UPDATE user SET nombre = ?, apellido = ?, email = ? WHERE id = ?',
      [nombre, apellido, email, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }

    res.json({ success: true, message: 'Usuario actualizado exitosamente' });
  } catch (error) {
    console.error('Error en el servidor:', error);
    res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
};

export const ver = async (req, res) => {
   
  try {
    const [result] = await pool.query(
      'select * from usuario'
    );
    res.status(201).json({ result });
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al registrar el usuario' });
  }
};

export const usuario = async(req, res) => {

  const id = req.session.userId;

  try {
    const [rows] = await pool.query('SELECT * FROM user WHERE id = ?', [id]);
    
    if (rows.length > 0) {
      const user = rows[0];
      res.status(200).json({
        success: true,
        user: {
          id: user.id,
          nombre: user.nombre,
          apellido: user.apellido,
          email: user.email
        }
      });
    } 
    else {
      res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }
  }
  catch (error) {
    console.error('Error al obtener datos del usuario:', error);
    res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
};

export const crearReserva = async (req, res) => {
  // Extraer datos del cuerpo de la solicitud
  const { usuario_id, habitacion_id, servicios_adicionales } = req.body;

  // Verificar que los datos requeridos están presentes
  if (!usuario_id || !habitacion_id) {
    return res.status(400).json({ message: 'Datos faltantes para la reserva' });
  }

  try {
    // Insertar la reserva en la base de datos
    const [result] = await pool.query(
      'INSERT INTO reservas (usuario_id, habitacion_id, servicios_adicionales) VALUES (?, ?, ?)',
      [usuario_id, habitacion_id, JSON.stringify(servicios_adicionales || [])] // Guardar servicios como JSON
    );

    // Actualizar disponibilidad de la habitación
    const [updateResult] = await pool.query(
      'UPDATE habitaciones SET disponibilidad = disponibilidad - 1 WHERE id = ? AND disponibilidad > 0',
      [habitacion_id]
    );

    // Validar si la disponibilidad fue actualizada correctamente
    if (updateResult.affectedRows === 0) {
      // Obtener la disponibilidad actual de la habitación
      const [habitacion] = await pool.query('SELECT disponibilidad FROM habitaciones WHERE id = ?', [habitacion_id]);
      const disponibilidad_actual = habitacion[0]?.disponibilidad || 0;

      // Responder con un error si no hay disponibilidad
      return res.status(400).json({ 
        message: 'No hay disponibilidad para esta habitación', 
        disponibilidad_actual 
      });
    }

    // Obtener la disponibilidad actualizada de la habitación
    const [habitacion] = await pool.query('SELECT disponibilidad FROM habitaciones WHERE id = ?', [habitacion_id]);
    const disponibilidad_actual = habitacion[0]?.disponibilidad || 0;

    // Responder con éxito
    res.status(201).json({
      message: 'Reserva creada con éxito',
      reservaId: result.insertId,
      disponibilidad_actual, // Enviar la disponibilidad actual al cliente
      servicios_adicionales: servicios_adicionales || [] // Enviar los servicios adicionales
    });
  } catch (error) {
    console.error('Error al crear la reserva:', error);
    res.status(500).json({ message: 'Error al crear la reserva' });
  }

};

export const crearHabitacion = async (req, res) => {

  try {
    const { nombre, descripcion, precio, disponibilidad, imagen} = req.body;
    const disponible = disponibilidad || 5;
    const [rows] = await pool.query('INSERT INTO habitaciones (nombre, descripcion, precio, disponibilidad, imagen) VALUES (?, ?, ?, ?, ?)', [nombre, descripcion, precio, disponible, imagen]);
    
    res.send({
      rows
    })
  } 
  catch (error) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

export const getHabitacionById = async (req, res) => {
  const { id } = req.params;

  try {
    const [habitacion] = await pool.query('SELECT * FROM habitaciones WHERE id = ?', [id]);

    if (habitacion.length === 0) {
      return res.status(404).json({ message: 'Habitación no encontrada' });
    }

    res.status(200).json(habitacion[0]);
  } catch (error) {
    console.error('Error al obtener la habitación:', error);
    res.status(500).json({ message: 'Error al obtener la habitación' });
  }
};

export const getAllHabitaciones = async (req, res) => {
  try {
    // Consulta SQL para obtener todas las habitaciones
    const [habitaciones] = await pool.query('SELECT * FROM habitaciones');

    res.status(200).json(habitaciones); // Devuelve las habitaciones en formato JSON
  } catch (error) {
    console.error('Error al obtener las habitaciones:', error);
    res.status(500).json({ message: 'Error al obtener las habitaciones' });
  }
};

export const guardarReserva = async (req, res) => {
  try {
    console.log('Datos recibidos en el backend:', req.body);
    
    const {
      usuario_id,
      habitacion_id,
      tarjeta_ultimos4,
      tarjeta_nombre,
      tarjeta_expiracion,
      monto,
      servicios_adicionales,
      fecha_inicio,
      fecha_termino
    } = req.body;

    // Verificar habitación
    const [habitacion] = await pool.query(
      'SELECT disponibilidad FROM habitaciones WHERE id = ?',
      [habitacion_id]
    );

    if (!habitacion.length || habitacion[0].disponibilidad <= 0) {
      return res.status(400).json({
        message: 'La habitación no está disponible'
      });
    }

    // Query ajustado a la estructura exacta de tu tabla
    const query = `
      INSERT INTO reservas 
      (usuario_id, habitacion_id, tarjeta_ultimos4, tarjeta_nombre, 
       tarjeta_expiracion, monto, servicios_adicionales, fecha_inicio, fecha_termino) 
      VALUES (?, ?, ?, ?, ?, ?, ?, STR_TO_DATE(?, '%Y-%m-%d'), STR_TO_DATE(?, '%Y-%m-%d'))
    `;

    const values = [
      usuario_id,
      habitacion_id,
      tarjeta_ultimos4,
      tarjeta_nombre,
      tarjeta_expiracion,
      monto,
      servicios_adicionales, // Ya debe venir como string JSON
      fecha_inicio,
      fecha_termino
    ];

    console.log('Valores a insertar:', values);

    const [result] = await pool.query(query, values);

    // Actualizar disponibilidad
    await pool.query(
      'UPDATE habitaciones SET disponibilidad = disponibilidad - 1 WHERE id = ?',
      [habitacion_id]
    );

    res.status(201).json({
      message: 'Reserva creada exitosamente',
      reservaId: result.insertId
    });

  } catch (error) {
    console.error('Error detallado:', error);
    console.error('SQL State:', error.sqlState);
    console.error('SQL Message:', error.sqlMessage);
    res.status(500).json({
      message: `Error al procesar la reserva: ${error.sqlMessage || error.message}`,
      sqlMessage: error.sqlMessage
    });
  }
};
