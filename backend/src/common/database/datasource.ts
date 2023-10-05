import {DataSource} from "typeorm"
import config from '../../config/config'

const dataSource:DataSource = new DataSource({
    type: "mssql",
    host: config.db.host,
    port: +config.db.port,
    username: config.db.username,
    password: config.db.password,
    database: config.db.db,
    entities: ["src/common/entities/*.ts"],
    migrations: ['src/common/migrations/*.ts'],
    logging: config.env === 'development',
    synchronize: false,
    migrationsRun: true,
    extra: {
        trustServerCertificate: true,
    }
})


export default dataSource