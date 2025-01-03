import { Router } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config.js';

const router = Router();

router.get('/', (req,res) => {
    res.render('login', { title: 'Iniciar Sesión' });
});

router.get('/register', (req, res) => {
    res.render('register', { title: 'Crear cuenta' });
});

router.get('/login', (req, res) => {
    res.render('login', { title: 'Iniciar Sesión' });
});

router.get('/current', (req, res) => {
    const token = req.cookies.authToken;

    if (!token) {
        return res.redirect('/login');
    }

    try {
        const decoded = jwt.verify(token, config.JWT_PRIVATE_KEY);
        res.render('current', { title: 'Current', user: decoded });
    } catch (error) {
        console.error('Error al verificar el token:', error.message);
        res.redirect('/login');
    }
});

export default router;