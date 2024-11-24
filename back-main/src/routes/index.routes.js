import  {Router}  from 'express';
import { ping, login, registerUser, ver, usuario } from '../controllers/index.controllers.js';
import { isAuthenticated } from '../middlewares/authMiddleware.js';

const router = Router();


router.get('/ping', ping)
router.post('/login', login);
router.post('/register', registerUser)
router.get('/ver', ver)
router.get('/usuario/', isAuthenticated, usuario)

export default router;