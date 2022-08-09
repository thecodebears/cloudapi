import 'dotenv/config';
import { applicationConfig } from './application.config';

export const integrationsConfig = () => Object.freeze({
    discord: {
        application: {
            clientId: process.env.discordApplicationClientId,
            clientSecret: process.env.discordApplicationClientSecret,
        },
        auth: {
            redirectURI: `${ applicationConfig().hostname }${ applicationConfig().scope === 'DEV' ? `:${applicationConfig().port}` : '' }/auth/discord`
        }
    }
})