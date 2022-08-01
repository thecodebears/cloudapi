import { Injectable } from "@nestjs/common";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

@Injectable()
export class ConfigService {
    private static ormConfig: PostgresConnectionOptions = {
        type: 'postgres',
        
        host: process.env.databaseHost,
        database: process.env.databaseName,
        username: process.env.databaseUsername,
        port: parseInt(process.env.databasePort),
        password: process.env.databasePassword,
    
        useUTC: false,
        logNotifications: true,
        applicationName: `cloudapi@${ process.env.hostname }`
    };

    public getOrmConfig(): PostgresConnectionOptions {
        return ConfigService.ormConfig;
    }
}