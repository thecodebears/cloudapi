import { ConfigService } from '../config/config.service';
import * as fs from 'fs';

fs.writeFileSync('ormconfig.json',
    JSON.stringify(ConfigService.getOrmConfig(), null, 4)
);