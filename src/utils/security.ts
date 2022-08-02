import * as crypto from 'crypto';

export class Security {
    public static generateSHA256(value: any) {
        let hashFactory = crypto.createHash('sha256');
        hashFactory.update(value);

        return hashFactory.digest('hex');
    }

    public static generateToken(value: any) {
        return this.generateSHA256(value + Date.now() + Math.random());
    }
}
