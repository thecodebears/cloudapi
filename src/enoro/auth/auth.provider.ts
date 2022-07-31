import { Injectable } from "@nestjs/common";
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
    /**
     * Runtime cache.
     */
    public static authorized: string[] = [];

    private generateSHA256(key: string): string {
        const hashCreator = crypto.createHash('sha256');
        hashCreator.update(key);

        return hashCreator.digest('hex');
    }

    public authorize(key: string): string {
        const token = this.generateSHA256(key + 'codebears@enoro');
        
        if (!AuthService.authorized.includes(token)) AuthService.authorized.push(token);
        
        return token;
    }

    public login(login: string): boolean {
        return AuthService.authorized.includes(login);
    }
}
