import { Module } from "@nestjs/common";
import { CryptoService } from "./crypto.service";
import { SnowflakeService } from "./snowflake.service";

@Module({
    imports: [],
    providers: [ CryptoService, SnowflakeService ],
    controllers: [],
    exports: [ CryptoService, SnowflakeService ]
})
export class UtilsModule {}
