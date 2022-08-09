import 'dotenv/config';

export const applicationConfig = () => Object.freeze({
    scope: process.env.scope as 'DEV' | 'PROD',
    hostname: process.env.hostname as `${'http' | 'https'}://${`${number}.${number}.${number}.${number}` | 'localhost' | string}` ,
    port: Number(process.env.port)
});