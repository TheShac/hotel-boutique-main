import { pool } from '../db.js';


export const ping = async (req,res) => {
    const [result] = await pool.query('SELECT "pong" AS result')
    res.json(result)
}

// Controlador para login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await pool.query('SELECT * FROM user WHERE LOWER(email) = LOWER(?) AND password = ?', [email, password]);
    //console.log('Resultado de la consulta:', rows);

    if (rows.length > 0) {
      const user = rows[0];
      req.session.userId = user.id;

      res.status(200).json({
        success: true,
        user: {
          id: user.id,
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
    console.log(req.body)
    const { nombre, apellido, email, password, rol } = req.body;

    const userRole = rol || 'client';
  
    const [rows] = await pool.query('INSERT INTO user (nombre, apellido, email, password, rol) VALUES (?, ?, ?, ?, ?)',[nombre, apellido, email, password, userRole]);
    res.send({
      rows
    })
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' });
    
  }

};

export const ver = async (req, res) => {
   
    try {
      const [result] = await pool.query(
        'select * from user'
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