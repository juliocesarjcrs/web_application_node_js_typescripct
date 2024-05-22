import { DataSource } from 'typeorm';
import * as path from 'path';
export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  synchronize: true,
  logging: true,
  entities: [path.join(__dirname, './entity/*.ts')],
  migrations: [path.join(__dirname, './migration/*.ts')],
  subscribers: [],
});
