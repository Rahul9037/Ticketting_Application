import request from 'supertest';
import { app } from '../../app';

it('returns a 201 on successful signup', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'rahul3@gmail.com',
      password: 'Rahul@123',
    })
    .expect(201);
});

it('returns a 400 with an invalid email', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'ascascdcdcdsdcdsc',
      password: 'Rahul@123',
    })
    .expect(400);
});

it('returns a 400 with an invalid password', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'rahul3@gmail.com',
      password: 'R',
    })
    .expect(400);
});

it('returns a 400 with an missing email and password', async () => {
  //return request(app).post('/api/users/signup').send({}).expect(400);

  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'rahul3@gmail.com',
    })
    .expect(400);

  await request(app)
    .post('/api/users/signup')
    .send({
      password: 'R',
    })
    .expect(400);
});

it('disallows duplicate emails', async () => {
  //return request(app).post('/api/users/signup').send({}).expect(400);

  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'rahul3@gmail.com',
      password: 'Rahul@123',
    })
    .expect(201);

  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'rahul3@gmail.com',
      password: 'Rahul@123',
    })
    .expect(400);
});

it('sets a cookie after successful signup', async () => {
  //return request(app).post('/api/users/signup').send({}).expect(400);

  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'rahul3@gmail.com',
      password: 'Rahul@123',
    })
    .expect(201);

  expect(response.get('Set-Cookie')).toBeDefined();
});
