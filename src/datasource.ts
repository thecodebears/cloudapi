import { DataSource } from "typeorm"
import { ConfigService } from "./config/config.service"

export const AppDataSource = new DataSource({
    type: ConfigService.getOrmConfig().type,
    host: ConfigService.getOrmConfig().host,
    port: ConfigService.getOrmConfig().port,
    username: ConfigService.getOrmConfig().username,
    password: ConfigService.getOrmConfig().password,
    database: ConfigService.getOrmConfig().database,
})

AppDataSource.initialize()
    .then(() => console.log("Data Source has been initialized!"))
    .catch(e => console.error("Error during Data Source initialization", e))