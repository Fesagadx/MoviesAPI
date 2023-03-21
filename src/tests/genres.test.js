const request = require('supertest');
const app = require('../app');
require('../models');

let genreId;

test("POST /genres  create a new genre", async () => {
  const newGenre = {
    name: "action"
  };
  const res = await request(app)
    .post("/genres")
    .send(newGenre);
  genreId = res.body.id
  expect(res.status).toBe(201);
  expect(res.body.name).toBe(newGenre.name);
})

test("GET /genres return genres", async () => {
  const res = await request(app).get('/genres');  
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
})

test("GET ONE /genres/:id return one genre", async () => {
  const res = await request(app).get(`/genres/${genreId}`);
  expect(res.status).toBe(200);
  expect(res.body.name).toBe("action");
})


test('PUT /genres/:id update one genre', async () => {
  const body = {
    name: "action"
  };
  const res = await request(app)
    .put(`/genres/${genreId}`)
    .send(body);
  expect(res.status).toBe(200);
  expect(res.body.name).toBe(body.name);
})

test('DELETE /genres/:id delete one genre', async () => {
  const res = await request(app).delete(`/genres/${genreId}`);
  expect(res.status).toBe(204);
})