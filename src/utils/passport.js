import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import userModel from '../dao/models/userModel.js';
import config from '../config.js';

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        req => req.cookies['authToken'],
    ]),
    secretOrKey: config.JWT_PRIVATE_KEY
};

const jwtVerify = async (jwtPayload, done) => {
    try {
        const user = await userModel.findById(jwtPayload.id);
        if (!user) {
            return done(null, false, { message: 'User not found' });
        }
        return done(null, user);
    } catch (error) {
        return done(error, false);
    }
};

passport.use(new JwtStrategy(jwtOptions, jwtVerify));

const initializePassport = () => passport.initialize();

export { initializePassport };