import 'dotenv/config';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { Course } from './entities/courses.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Tag } from './entities/tags.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesModule } from './courses.module';
import request from 'supertest';

describe('CoursesController e2e Testes', () => {
  let app: INestApplication;
  let module: TestingModule;
  let data: any;
  let courses: Course[];

  const dataSourceTest: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: 5433,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [Course, Tag],
    synchronize: true,
  };

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        CoursesModule,
        TypeOrmModule.forRootAsync({
          useFactory: async () => {
            return dataSourceTest;
          },
        }),
      ],
    }).compile();
    app = module.createNestApplication();
    await app.init();

    data = {
      name: 'Curso de Teste',
      description: 'Curso de teste para testes',
      tags: ['teste', 'testes2', 'teste3'],
    };
  });

  beforeEach(async () => {
    const dataSource = await new DataSource(dataSourceTest).initialize();
    const repository = dataSource.getRepository(Course);
    courses = await repository.find();
    await dataSource.destroy();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /courses', () => {
    it('should create a new course', async () => {
      const res = await request(app.getHttpServer())
        .post('/courses')
        .send(data)
        .expect(201);
      expect(res.body.id).toBeDefined();
      expect(res.body.name).toEqual(data.name);
      expect(res.body.description).toEqual(data.description);
      expect(res.body.created_at).toBeDefined();
      expect(res.body.tags[0].name).toEqual(data.tags[0]);
      expect(res.body.tags[1].name).toEqual(data.tags[1]);
    });
  });

  describe('GET /courses/list', () => {
    it('should list all courses', async () => {
      const res = await request(app.getHttpServer())
        .get('/courses/list')
        .expect(200);
      expect(res.body[0].id).toBeDefined();
      expect(res.body[0].name).toEqual(data.name);
      expect(res.body[0].description).toEqual(data.description);
      expect(res.body[0].created_at).toBeDefined();
      res.body.map((item) =>
        expect(item).toEqual({
          id: item.id,
          name: item.name,
          description: item.description,
          created_at: item.created_at,
          tags: [...item.tags],
        }),
      );
    });
  });

  describe('GET /courses/:id', () => {
    it('should gets a course by id', async () => {
      const res = await request(app.getHttpServer())
        .get(`/courses/${courses[0].id}`)
        .expect(200);
      expect(res.body.id).toEqual(courses[0].id);
      expect(res.body.name).toEqual(data.name);
      expect(res.body.description).toEqual(data.description);
    });
  });

  describe('PUT /courses/:id', () => {
    it('should update a course', async () => {
      const updateData = {
        name: 'Curso de Teste',
        description: 'Curso de teste para testes',
        tags: ['teste', 'teste2', 'teste3'],
      };

      const res = await request(app.getHttpServer())
        .put(`/courses/${courses[0].id}`)
        .send(updateData)
        .expect(200);
      expect(res.body.id).toEqual(courses[0].id);
      expect(res.body.name).toEqual('Curso de Teste');
      expect(res.body.description).toEqual('Curso de teste para testes');
      expect(res.body.tags).toHaveLength(3);
      expect(res.body.tags[0].name).toEqual('teste');
      expect(res.body.tags[1].name).toEqual('teste2');
      expect(res.body.tags[2].name).toEqual('teste3');
    });
  });

  describe('DELETE /courses/:id', () => {
    it('should delete a course', async () => {
      const res = await request(app.getHttpServer())
        .delete(`/courses/${courses[0].id}`)
        .expect(204)
        .expect({});
    });
  });
});
