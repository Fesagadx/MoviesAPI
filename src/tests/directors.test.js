const request = require('supertest');
const app = require('../app');
require('../models');

let directorId;

test("POST /directors create a new director", async () => {
  const newDirector = {
    firstName: "Anthony",
    lastName: "Russo",
    nationality: "Estadounidense",
    image: "image.png",
    birthday: "02/03/1970"
  };
  const res = await request(app)
    .post("/directors")
    .send(newDirector);
  directorId = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.firstName).toBe(newDirector.firstName);
})

test("GET /directors return directors", async () => {
  const res = await request(app).get('/directors');
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
})

test("GET ONE /directors/:id return one director", async () => {
  const res = await request(app).get(`/directors/${directorId}`);
  expect(res.status).toBe(200);
  expect(res.body.firstName).toBe("Anthony");
})

test('PUT /directors/:id update one director', async () => {
  const body = {
    firstName: "Anthony"
  }
  const res = await request(app)
    .put(`/directors/${directorId}`)
    .send(body);
  expect(res.status).toBe(200);
  expect(res.body.firstName).toBe(body.firstName);
})

test('DELETE /directors/:id delete one director', async () => {
  const res = await request(app).delete(`/directors/${directorId}`);
  expect(res.status).toBe(204);
})