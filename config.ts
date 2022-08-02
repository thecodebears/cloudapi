import 'dotenv/config';

export const config = {
    scope: process.env.scope,
    hostname: process.env.hostname,
    integrations: {
        discord: {
            applicationClientId: process.env.discordApplicationClientId,
            applicationClientSecret: process.env.discordApplicationClientSecret,
            applicationRedirectURL: process.env.scope === 'DEV' ? `http://localhost:3000/auth/discord` : encodeURI(process.env.hostname + '/auth/discord')
        }
    },
    api: {
        maxClientsPerInstance: Number(process.env.maxUserClientInstances)
    }
} as Readonly<{
    scope: string,
    hostname: string,
    integrations: {
        discord: {
            applicationClientId: string,
            applicationClientSecret: string,
            applicationRedirectURL: string
        }
    },
    api: {
        maxClientsPerInstance: number
    }
}>