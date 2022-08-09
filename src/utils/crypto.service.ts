import { Token, TokenProtectedData } from './crypto.types';
import { Injectable } from '@nestjs/common';
import * as CryptoJS from 'crypto-js/index';
import * as CryptoNative from 'crypto';
import { SnowflakeService } from './snowflake.service';

@Injectable()
export class CryptoService {
    constructor(public readonly snowflakeService: SnowflakeService) {}

    public hash(value: any): string {
        let hashGenerator = CryptoNative.createHash('sha256');

        hashGenerator.update(value);

        return hashGenerator.digest('hex').toString();
    }

    public encryptSync(value: string, key: string): string {
        return CryptoJS.AES.encrypt(value, key).toString();
    }

    public decryptSync(value: string, key: string): string {
        return CryptoJS.AES.decrypt(value, key).toString();
    }

    public createToken(descriptor: string, protectedData: TokenProtectedData, key: string): string {
        let protectedDataString = `scopes:${ protectedData.scopes.join(',') }`
        let encryptedProtectedData = this.encryptSync(protectedDataString, key);
        
        return this.snowflakeService.encode([ descriptor, encryptedProtectedData ]);
    }

    public decryptToken(token: string, key: string): Token {
        let [ descriptor, encryptedProtectedData ] = this.snowflakeService.decode(token);
        let protectedDataString = this.decryptSync(encryptedProtectedData, key);
        let protectedData = {
            scopes: protectedDataString.split('&')[0].slice('scopes:'.length).split(',')
        } as TokenProtectedData;

        return [ descriptor, protectedData ];
    }
}
