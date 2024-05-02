import { DataSource } from 'typeorm';
import { dataSourceOptions } from './database.module';
import { CreateCoursesTable1714652174496 } from 'src/migrations/1714652174496-CreateCoursesTable';

export const database = new DataSource({
  ...dataSourceOptions,
  synchronize: false,
  migrations: [CreateCoursesTable1714652174496],
});
