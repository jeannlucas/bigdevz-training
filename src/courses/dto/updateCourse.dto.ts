import { PartialType } from '@nestjs/mapped-types';
import { createCourseDTO } from './createCourse.dto';

export class updateCourseDTO extends PartialType(createCourseDTO) {}
