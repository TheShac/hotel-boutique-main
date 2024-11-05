import {pool} from '../db.js';


export const ping = async (req,res) => {
    const [result] = await pool.query('SELECT "pong" AS result')
    res.json(result)
}

// Controlador para login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await pool.query('SELECT * FROM usuario WHERE LOWER(email) = LOWER(?) AND password = ?', [email, password]);
    console.log('Resultado de la consulta:', rows);

    if (rows.length > 0) {
      const user = rows[0];
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

export const registerUser = async (req, res) => {

  try {
    console.log(req.body)
    const { email, password, rol } = req.body;

    const userRole = rol || 'client';
  
    const [rows] = await pool.query('INSERT INTO usuario (email, password, rol) VALUES (?, ?, ?)',[email,password,userRole]);
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
        'select * from usuario'
      );
      res.status(201).json({ result });
    } 
    catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al registrar el usuario' });
    }
  };
