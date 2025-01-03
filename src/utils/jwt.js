import jwt from 'jsonwebtoken';
import config from '../config.js';

export const generateToken = (user) => {
    const payload = {
        id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role
    };
    return jwt.sign(payload, config.JWT_PRIVATE_KEY, { expiresIn: config.JWT_EXPIRES_TIME_TOKEN });
};

export const verifyTokenMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send({ error: "Not authenticated" });
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(token, config.JWT_PRIVATE_KEY, (error, decoded) => {
        if (error) {
            return res.status(403).send({ error: "Not authorized" });
        }

        req.user = decoded;
        next();
    });
};

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, config.JWT_PRIVATE_KEY);
    } catch (error) {
        return null;
    }
};