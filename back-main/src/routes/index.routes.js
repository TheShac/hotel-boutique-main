import  {Router}  from 'express';
import { ping, login, registerUser, ver } from '../controllers/index.controllers.js'

const router = Router()

router.get('/ping',ping)
router.post('/login', login);
router.post('/register', registerUser)
router.get('/ver',ver)

export default router;