import  express  from 'express';
import session from 'express-session';
import indexrouter from './routes/index.routes.js';
import { PORT } from './config/config.js'
import cors from 'cors'

const app = express()

app.use(cors({
    origin: 'http://localhost:4200', //Puerto de Angular
    credentials: true
}))

app.use(express.json())

app.use(session({
    secret: '123', // Cambia esto a una clave segura
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Pon `secure: true` en producción con HTTPS
}));

app.use(indexrouter)


app.use((req,res,next)=> {
    res.status(404).json({
        message:"Endpoint not found"
    })
})

app.listen(PORT)
console.log('http://localhost:3000/ping/')