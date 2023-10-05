import http from 'http'
import logger from './config/logger'
import app from './app'
import dataSource from './common/database/datasource'
import config from './config/config'

let server:http.Server;

dataSource
    .initialize()
    .then(() => {
        logger.info("db connection successful");
        server = app.listen(config.app.port, () => {
            logger.info((`App listening on port ${config.app.port}`));
        })
    })
    .catch((error) => {
        logger.error(`db connection failed: ${error.toString()}`)
    })

const exitHandler = () => {
    if (server) {
        server.close(() => {
            logger.info('Server closed');
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
};

const unexpectedErrorHandler = (error:unknown) => {
    logger.error(error);
    exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
    logger.info('SIGTERM received');
    if (server) {
        server.close();
    }
});

export default server;