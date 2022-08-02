import 'dotenv/config';
import * as path from 'path';
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

export class ConfigService {
    private static env = process.env;

    private static ormConfig: PostgresConnectionOptions = {
        type: 'postgres',
        
        host: this.env.databaseHost,
        database: this.env.databaseName,
        username: this.env.databaseUsername,
        port: parseInt(this.env.databasePort),
        password: this.env.databasePassword,
    
        useUTC: false,
        logNotifications: true,
        applicationName: `cloudapi@${ this.env.hostname }`,
        migrations: ['src/migration/*{.ts,.js}'],
        entities: [ path.join(__dirname, '**', '*.entity.{ts,js}') ],
        
        ...(this.env.useSSL === ('true' || true) && {
            ssl: {
                rejectUnauthorized: false
            }
        })
    };

    public static getOrmConfig(): PostgresConnectionOptions {
        return this.ormConfig;
    }
}