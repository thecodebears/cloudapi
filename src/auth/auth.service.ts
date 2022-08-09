import { Injectable } from "@nestjs/common";
import { UserService } from "src/models/user/user.service";
import { APIResponse } from "src/types";
import { CryptoService } from "src/utils/crypto.service";
import { AuthResponse, UserAuthorizationData } from "./auth.types";

@Injectable()
export class AuthService {
    constructor(
        private readonly cryptoService: CryptoService,
        private readonly userService: UserService
    ) {}
    
    async register(username: string, password: string): Promise<APIResponse<UserAuthorizationData>> {
        if (await this.userService.findOneBy({ username })) return { error: AuthResponse.UsernameWasTaken };

        let passwordHash = this.cryptoService.hash(password);
        let instance = await this.userService.create({
            username,
            password: passwordHash
        });

        let id = instance.id;
        let token = this.cryptoService.createToken(
            `${ id }@user`,
            { scopes: [ '*' ] },
            passwordHash
        );

        await this.userService.update({ id }, { token });

        return { username, token };
    }

    async login(username: string, password: string): Promise<APIResponse<UserAuthorizationData>> {
        let instance = await this.userService.findOneBy({ username });

        if (!instance) return { error: AuthResponse.UserNotFound };
        
        let passwordHash = this.cryptoService.hash(password);
        let originalPasswordHash = instance.password;

        if (passwordHash !== originalPasswordHash) {
            return { error: AuthResponse.InvalidPassword };
        } else {
            return {
                username: instance.username,
                token: instance.token
            }
        }
    }
}