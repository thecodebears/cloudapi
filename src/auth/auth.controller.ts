import axios from 'axios';
import * as url from 'url';
import { Controller, Get, Query, Response } from '@nestjs/common';
import { config } from 'config';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) {}

    /**
     * Discord strategy authorization.
     * Gets full user data.
     */
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

                return userRequest.data;
            } catch(e) {
                console.log(e);
            }
        } else {
            res.redirect(`https://discord.com/api/oauth2/authorize?client_id=${ applicationClientId }&redirect_uri=${ encodeURIComponent(applicationRedirectURL) }&response_type=code&scope=identify`);
        }
    }
}
