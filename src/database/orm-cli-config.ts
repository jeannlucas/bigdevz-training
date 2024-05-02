import { DataSource } from 'typeorm';
import { dataSourceOptions } from './database.module';
import { CreateCoursesTable1714652174496 } from 'src/migrations/1714652174496-CreateCoursesTable';
import { CreateTagsTable1714658182098 } from 'src/migrations/1714658182098-CreateTagsTable';
import { CreateCoursesTagsTable1714660810750 } from 'src/migrations/1714660810750-CreateCoursesTagsTable';
import { AddCoursesIdToCoursesTagsTable1714667469864 } from 'src/migrations/1714667469864-AddCoursesIdToCoursesTagsTable';
import { AddTagsIdToCoursesTagsTable1714668403192 } from 'src/migrations/1714668403192-AddTagsIdToCoursesTagsTable';

export const database = new DataSource({
  ...dataSourceOptions,
  synchronize: false,
  migrations: [
    CreateCoursesTable1714652174496,
    CreateTagsTable1714658182098,
    CreateCoursesTagsTable1714660810750,
    AddCoursesIdToCoursesTagsTable1714667469864,
    AddTagsIdToCoursesTagsTable1714668403192,
  ],
});
