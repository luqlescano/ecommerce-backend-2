import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.get('/', (req, res) => {
    res.render('login', { title: 'Iniciar Sesión' });
});

router.get('/register', (req, res) => {
    res.render('register', { title: 'Crear cuenta' });
});

router.get('/login', (req, res) => {
    res.render('login', { title: 'Iniciar Sesión' });
});

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.render('current', { title: 'Perfil', user: req.user });
});

export default router;