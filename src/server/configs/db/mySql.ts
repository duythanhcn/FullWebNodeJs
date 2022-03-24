import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';
require('dotenv').config();

export default {
  type: 'mysql',
  port: process.env.DB_PORT || 3306,
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  insecureAuth: true,
  supportBigNumbers: true,
  multipleStatements: true,
  synchronize: true, // must be false in production
  migrationsRun: true,
  entities: [path.join(__dirname, '../..', '/**/*.entity{.ts,.js}')],
  migrations: ['src/migration/*.ts', 'dist/migration/*{.ts,.js}'],
  cli: {
    entitiesDir: 'src/app/entities',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
  allowJs: true,
  subscribers: ['src/subscriber/**/*.ts'],
} as TypeOrmModuleOptions;
