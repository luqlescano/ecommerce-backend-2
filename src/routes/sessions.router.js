import { Router } from 'express';
import passport from 'passport';
import { comparePassword } from '../utils/bcrypt.js';
import { UserManager } from '../dao/managers/userManager.js';
import jwt from 'jsonwebtoken';
import config from '../config.js';
import UserDTO from '../dao/dto/user.dto.js';

const router = Router();
const userManager = new UserManager();

router.post('/register', async (req, res) => {
    try {
        const { first_name, last_name, email, age, password } = req.body;

        const existingUser = await userManager.getUserByEmail(email);
        if (existingUser) {
            return res.status(400).send({ error: 'El usuario ya existe' });
        }

        const newUser = await userManager.createUser({
            first_name,
            last_name,
            email,
            age,
            password,
        });

        res.redirect('/current');
    } catch (error) {
        res.status(500).send({ error: 'Error al registrar el usuario', message: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userManager.getUserByEmail(email);
        if (!user) {
            return res.status(400).send({ error: 'Credenciales incorrectas' });
        }

        const isPasswordValid = comparePassword(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).send({ error: 'Credenciales incorrectas' });
        }

        const token = jwt.sign(
            { id: user._id, first_name: user.first_name, email: user.email, role: user.role },
            config.JWT_PRIVATE_KEY,
            { expiresIn: config.JWT_EXPIRES_TIME_TOKEN }
        );

        res.cookie('authToken', token, { httpOnly: true }).redirect('/current');
    } catch (error) {
        res.status(500).send({ error: 'Error al iniciar sesión', message: error.message });
    }
});

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    const userDTO = new UserDTO(req.user);
    res.status(200).json(userDTO);
});

router.get('/logout', (req, res) => {
    res.clearCookie('authToken').redirect('/login');
});

export default router;