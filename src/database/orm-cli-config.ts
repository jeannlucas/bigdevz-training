import { DataSource } from 'typeorm';
import { dataSourceOptions } from './database.module';
import { CreateCoursesTable1714652174496 } from 'src/migrations/1714652174496-CreateCoursesTable';
import { CreateTagsTable1714658182098 } from 'src/migrations/1714658182098-CreateTagsTable';
import { CreateCoursesTagsTable1714660810750 } from 'src/migrations/1714660810750-CreateCoursesTagsTable';

export const database = new DataSource({
  ...dataSourceOptions,
  synchronize: false,
  migrations: [
    CreateCoursesTable1714652174496,
    CreateTagsTable1714658182098,
    CreateCoursesTagsTable1714660810750,
  ],
});
