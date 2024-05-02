/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { createCourseDTO } from './dto/createCourse.dto';
import { updateCourseDTO } from './dto/updateCourse.dto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly courseService: CoursesService) {}

  @Get('list')
  findAll() {
    return this.courseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(id);
  }

  @Post()
  create(@Body() createCourseDTO: createCourseDTO) {
    return this.courseService.create(createCourseDTO);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCourseDTO: updateCourseDTO) {
    return this.courseService.update(id, updateCourseDTO);
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(id);
  }
}
