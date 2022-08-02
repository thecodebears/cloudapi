import ormConfig from "ormconfig"
import { DataSource, DataSourceOptions } from "typeorm"

export const AppDataSource = new DataSource(ormConfig as DataSourceOptions);

AppDataSource.initialize()
    .then(() => console.log("Data Source has been initialized!"))
    .catch(e => console.error("Error during Data Source initialization", e))
