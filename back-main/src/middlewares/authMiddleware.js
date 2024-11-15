// authMiddleware.js
export const isAuthenticated = (req, res, next) => {
    if (req.session.userId) {
      next(); // Usuario autenticado, continúa con la petición
    } 
    else {
      res.status(401).json({ message: 'Usuario no autenticado' });
    }
  };
  