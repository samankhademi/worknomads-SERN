import * as process from "process";
import * as donenv from 'dotenv';

// when we use dev server
if (!process.env.DB_HOST) {
    donenv.config({path: __dirname + './../../../.env'});
}

const config = {
    env: process.env.NODE_ENV,
    db: {
        host: process.env.DB_HOST,
        db: process.env.DB_DATABASE,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
    },
    app: {
        port: process.env.APP_LOCAL_PORT
    },
    jwt: {
        secret: process.env.JWT_SECRET_KEY,
        validationTime: process.env.JWT_EXP_TIME
    }
}

export default config;