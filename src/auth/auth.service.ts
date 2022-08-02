import { Injectable } from "@nestjs/common";
import { Security } from "src/utils/security";
import { AuthResponse } from "./auth.codes";

export class AuthSession {
    public key: string;
    public type: 'discord' | 'raw';
    public data: any;

    constructor(key: string, type: AuthSession['type'], data: any) {
        this.key = key;
        this.type = type;
        this.data = data;
    }
}

@Injectable()
export class AuthService {
    private authSessions: AuthSession[] = [];

    public createAuthSession(type: AuthSession['type'], data: any): string {
        let sessionKey = Security.generateToken(type);
        this.authSessions.push(new AuthSession(sessionKey, type, data));

        return sessionKey;
    }

    public getAuthSession(sessionKey: string): AuthSession | AuthResponse {
        return this.authSessions.find(s => s.key === sessionKey) || AuthResponse.AuthSessionNotExists;
    }

    public closeAuthSession(sessionKey: string): AuthResponse {
        if (!this.authSessions.find(s => s.key === sessionKey)) {
            return AuthResponse.AuthSessionNotExists;
        } else {
            this.authSessions = this.authSessions.filter(k => k.key !== sessionKey);

            return AuthResponse.AuthSessionClosed;
        }
    }
}