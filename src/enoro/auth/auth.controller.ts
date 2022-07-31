import { Body, Controller, Get, Param, Query, Res } from "@nestjs/common";
import axios from "axios";
import * as url from 'url';
import { AuthService } from "./auth.provider";

@Controller('@enoro/auth')
export class AuthController {
    private static localHostTesting = false;

    constructor(private authService: AuthService) {}

    @Get('discord/login')
    public async discordLogin(@Res() res) {
        if (AuthController.localHostTesting) {
            res.redirect('https://discord.com/api/oauth2/authorize?client_id=1002031029080563732&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F%40enoro%2Fauth%2Fdiscord&response_type=code&scope=identify');
        } else {
            res.redirect('https://discord.com/api/oauth2/authorize?client_id=1002031029080563732&redirect_uri=https%3A%2F%2Fcloudapi-node.vercel.app%2F%40enoro%2Fauth%2Fdiscord&response_type=code&scope=identify');
        }
    }

    @Get('discord')
    public async discord(@Query('code') code: string) {
        if (code) {
            try {
                const tokenRequest = await axios.post(
                    'https://discord.com/api/v10/oauth2/token',
                    new url.URLSearchParams({
                        client_id: process.env.enoro_discordAppClientId,
                        client_secret: process.env.enoro_discordAppClientSecret,
                        redirect_uri: process.env.hostname + '/@enoro/auth/discord',
                        grant_type: 'authorization_code',
                        code: code.toString()
                    }).toString(),
                    {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }
                );

                const { access_token, token_type } = tokenRequest.data;

                const userRequest = await axios.get(
                    'https://discord.com/api/v8/users/@me',
                    {
                        headers: {
                            'Authorization': `${token_type} ${access_token}`
                        }
                    }
                );

                const token = this.authService.authorize(userRequest.data.id);

                return {
                    token: token
                };
            } catch (e) {
                return {
                    error: e
                }
            }
        }
    }
}