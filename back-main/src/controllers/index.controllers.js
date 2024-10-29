import {pool} from '../db.js';

export const ping = async (req,res) => {
    const [result] = await pool.query('SELECT "pong" AS result')
    res.json(result)
}

// Controlador para login
export const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const [rows] = await pool.query('SELECT * FROM usuario WHERE email = ? AND password = ?', [email, password]);
  
      if (rows.length > 0) {
        res.json({ message: 'Inicio de sesión exitoso', user: rows[0] });
      } 
      else {
        res.status(401).json({ message: 'Credenciales incorrectas' });
      }
    } 
    catch (error) {
      res.status(500).json({ message: 'Error en el servidor' });
    }
};

export const registerUser = async (req, res) => {
  const { email, password, rol } = req.body;

  const userRole = rol || 'client';

  const checkEmailQuery = 'SELECT * FROM usuario WHERE email = ?';
  db.query(checkEmailQuery, [email], (error, results) => {
    if (error) return res.status(500).json({ message: 'Error en el servidor' });

    if (results.length > 0) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    const insertUserQuery = 'INSERT INTO usuario (email, password, client) VALUES (?, ?, ?)';
    db.query(insertUserQuery, [email, password, userRole], (error, results) => {
      if (error) return res.status(500).json({ message: 'Error al registrar el usuario' });

      res.status(201).json({ message: 'Usuario registrado con éxito' });
    });
  });
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