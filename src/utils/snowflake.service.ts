import { Injectable } from "@nestjs/common";

/**
 * Snowflake is a multipart encoded string,
 * invented for holding payloads and data in
 * UUID's, tokens, keys and more.
 */
@Injectable()
export class SnowflakeService {
    public encode(parts): string {
        try {
            let stringifiedParts: string[] = parts.map(part => typeof part === 'string' ? part : JSON.stringify(part)); 
            let encodedParts: string[] = stringifiedParts.map(part => Buffer
                .from(part, 'utf8')
                .toString('base64')
                .replace(/^\=+|\=+$/g, '')
            );

            let snowflake: string = encodedParts.join('.');

            return snowflake;
        } catch(e) {
            return null;
        }
    }

    public decode(snowflake): string[] {
        try {
            if (snowflake.length === 0) return null;

            let parts: string[] = snowflake.split('.');
            let decodedParts: string[] = parts.map(part => Buffer
                .from(part, 'base64')
                .toString('utf8')
            );

            return decodedParts;
        } catch(e) {
            return null;
        }
    }
}
