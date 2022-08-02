import axios from 'axios';
import * as url from 'url';
import { Controller, Get, Query, Response } from '@nestjs/common';
import { config } from 'config';
import { ClientService } from 'src/models/client/client.service';
import { UserService } from 'src/models/user/user.service';
import { AuthService, AuthSession } from './auth.service';
import { AuthResponse } from './auth.codes';
import { UsersFindQuery } from 'src/models/user/user.types';
import { User } from 'src/models/user/user.entity';
import { Client } from 'src/models/client/client.entity';
import { Security } from 'src/utils/security';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private userService: UserService,
        private clientService: ClientService
    ) {}

    private async createUserClient(user: User): Promise<Client> {
        let client = await this.clientService.create('user', user.id);
        await this.userService.loginClient({ id: user.id }, client);

        return client;
    }

    private async destroyUserClient(user: User, client: Client) {
        await this.clientService.destroy({ id: client.id });
        await this.userService.logoutClient({ id: user.id }, client);
    }

    @Get('discord')
    public async discord(@Response({ passthrough: true }) res, @Query('code') code: string) {
        let { applicationClientId, applicationClientSecret, applicationRedirectURL } = config.integrations.discord;

        if (code) {
            try {
                let tokenRequest = await axios.post(
                    'https://discord.com/api/v8/oauth2/token',
                    new url.URLSearchParams({
                        client_id: applicationClientId,
                        client_secret: applicationClientSecret,
                        redirect_uri: applicationRedirectURL,
                        grant_type: 'authorization_code',
                        code: code.toString()
                    }).toString(),
                    {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }
                );
    
                let { access_token, token_type } = tokenRequest.data;
    
                let userRequest = await axios.get(
                    'https://discord.com/api/v10/users/@me',
                    {
                        headers: {
                            'Authorization': `${token_type} ${access_token}`
                        }
                    }
                );

                let authSession = this.authService.createAuthSession('discord', userRequest.data);
    
                res.redirect(`${ config.hostname }/auth/register?sessionKey=${ authSession }`);
            } catch(e) {
                console.log(e);
            }
        } else {
            res.redirect(`https://discord.com/api/oauth2/authorize?client_id=${ applicationClientId }&redirect_uri=${ encodeURIComponent(applicationRedirectURL) }&response_type=code&scope=identify`);
        }
    }

    @Get('register')
    public async register(
        @Query('sessionKey') sessionKey: string,
        @Query('username') username: string,
        @Query('password') password: string
    ) {
        let authSession = this.authService.getAuthSession(sessionKey);

        if (authSession instanceof AuthSession) {
            if (authSession.type === 'discord') {
                let user = await this.userService.findDiscordConnection(authSession.data.id);
                let password;

                if (!user) {
                    password = Security.generateToken(authSession.data.username).slice(0, 8);
                    user = await this.userService.create(authSession.data.username, password);
                }

                let client = await this.createUserClient(user);

                return {
                    token: client.token,
                    ...(password && { password })
                };
            } else if (authSession.type === 'raw') {
                /**
                 * Not implemented.
                 * TODO: Implement raw registration.
                 */

                return { error: 'NotImplemented' };
            }
        } else if (authSession === AuthResponse.AuthSessionNotExists) {
            return { error: authSession };
        }
    }
}
