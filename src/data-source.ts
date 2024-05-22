import { DataSource } from 'typeorm';
import * as path from 'path';

const isCompiled = path.extname(__filename).includes('js');

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  synchronize: true,
  logging: true,
  entities: [path.join(__dirname, isCompiled ? './entity/*.js' : './entity/*.ts')],
  migrations: [path.join(__dirname, isCompiled ? './migration/*.js' : './migration/*.ts')],
  subscribers: [],
});
