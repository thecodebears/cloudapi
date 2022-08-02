import 'dotenv/config';
import * as path from "path";
import { Client } from 'src/models/client/client.entity';
import { BaseEntity } from 'src/models/base.entity';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { User } from 'src/models/user/user.entity';
import { Application } from './src/models/application/application.entity';

const config: Readonly<PostgresConnectionOptions> = {
    type: 'postgres',
        
    host: process.env.databaseHost,
    database: process.env.databaseName,
    username: process.env.databaseUsername,
    port: parseInt(process.env.databasePort),
    password: process.env.databasePassword,

    useUTC: false,
    logNotifications: true,
    applicationName: `cloudapi@${ process.env.hostname }`,
    migrations: [ path.join(__dirname, 'src/migration/*.ts') ],
    entities: [
        BaseEntity,
        Client,
        User,
        Application
    ],
    
    ...(process.env.useSSL === ('true' || true) && {
        ssl: {
            rejectUnauthorized: false
        }
    }),

    synchronize: true
};

export default config;
