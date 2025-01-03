import * as url from 'url';
import dotenv from 'dotenv';

dotenv.config();

const config = {
    PORT: process.env.PORT,
    DIRNAME: url.fileURLToPath(new URL('.', import.meta.url)),
    MONGODB_URI: process.env.MONGODB_URI,
    COOKIE_SIGNATURE: process.env.COOKIE_SIGNATURE,
    JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY,
    JWT_EXPIRES_TIME_TOKEN: process.env.JWT_EXPIRES_TIME_TOKEN
};

export default config;