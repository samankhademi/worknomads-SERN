import express from 'express'
import type {Express} from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import helmet from 'helmet'
import httpStatus from 'http-status'
import {errorConverter} from './middlewares/error'
import cors from 'cors'
import ApiError from "./utils/ApiError";
import passport from "passport";
import jwtStrategy from "./config/passport";
import routes from 'routes/v1';

const app:Express = express();

// secure with helmet
app.use(helmet());
// enable cors
app.use(cors());
app.options('*', cors());

// parse post & body
app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// add parse cookie
app.use(cookieParser())
// enable compression
app.use(compression())

// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// v1 api routes
app.use('/v1', routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

export default app;