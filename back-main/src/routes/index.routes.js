import  {Router}  from 'express';
import { ping, login, registerUser, ver, usuario, crearReserva, crearHabitacion, getHabitacionById, getAllHabitaciones } from '../controllers/index.controllers.js';
import { isAuthenticated } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/ver', ver);
router.get('/ping', ping);

router.post('/login', login);
router.post('/register', registerUser);
router.get('/usuario/', isAuthenticated, usuario);

router.post('/api/reservas', crearReserva);
router.post('/habitacion', crearHabitacion);
router.get('/api/habitaciones/:id', getHabitacionById);
router.get('/api/habitaciones', getAllHabitaciones);

export default router;