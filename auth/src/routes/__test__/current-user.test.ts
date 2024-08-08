import request from 'supertest';
import { app } from '../../app';

it('responds with details about the current user', async () => {
  // const authResponse = await request(app)
  //   .post('/api/users/signup')
  //   .send({
  //     email: 'rahul3@gmail.com',
  //     password: 'Rahul@123',
  //   })
  //   .expect(201);
  // const cookie: any = authResponse.get('Set-Cookie');

  const cookie = await global.signin();

  const response = await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie)
    .send()
    .expect(200);

  //console.log(response.body);

  expect(response.body.currentUser.email).toEqual('rahul3@gmail.com');
});

it('responds with null if not authenticated', async () => {
  const response = await request(app)
    .get('/api/users/currentuser')
    .send()
    .expect(401);
  //console.log(response.body);
  expect(response.body.errors).toHaveLength(1);
  expect(response.body.errors[0].message).toEqual('Not Authorized');
});
