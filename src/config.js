import * as url from 'url';
import dotenv from 'dotenv';

dotenv.config();

const config = {
    PORT: process.env.PORT,
    DIRNAME: url.fileURLToPath(new URL('.', import.meta.url)),
    MONGODB_URI: process.env.MONGODB_URI
};

export default config;