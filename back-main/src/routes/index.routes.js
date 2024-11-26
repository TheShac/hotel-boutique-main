import  {Router}  from 'express';
import { ping, login, registerUser, ver, usuario, crearReserva, crearHabitacion, getHabitacionById, getAllHabitaciones, updateUser, guardarReserva } from '../controllers/index.controllers.js';
import { isAuthenticated } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/ver', ver);
router.get('/ping', ping);

router.post('/login', login);
router.post('/register', registerUser);
router.put('/user/:id', isAuthenticated, updateUser);
router.get('/usuario/', isAuthenticated, usuario);

router.post('/api/reservas', crearReserva);
router.post('/newHabitacion', crearHabitacion);
router.get('/api/habitaciones/:id', getHabitacionById);
router.get('/api/habitaciones', getAllHabitaciones);
router.post('/api/reservas', guardarReserva);

export default router;