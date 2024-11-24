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
    const { email, password } = req.body;
    const rol = req.body.rol || 'client';
  
    // Verificar que todos los datos requeridos estén presentes
    if (!email || !password || !['admin', 'client'].includes(rol)){
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }
  
    // Encriptar la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10);
  
    try {
      const [result] = await pool.query(
        'INSERT INTO usuario (username, password, rol) VALUES (?, ?, ?)',
        [email, hashedPassword, rol]
      );
      res.status(201).json({ message: 'Usuario registrado con éxito', userId: result.insertId });
    } 
    catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al registrar el usuario' });
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