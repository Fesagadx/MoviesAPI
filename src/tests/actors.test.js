const request = require('supertest');
const app = require('../app');
require('../models');

let actorId;

test("POST /actors create a new actor", async () => {
  const newActor = {
    firstName: "Scarlett",
    lastName:"Johansson",
    nationality: "Estadounidense",
    image:"image.png",
    birthday: "02/22/1984"
  };
  const res = await request(app)
    .post("/actors")
    .send(newActor);
  actorId = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.firstName).toBe(newActor.firstName);
})

test("GET /actors return actors", async () => {
  const res = await request(app).get('/actors');  
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
})

test("GET ONE /actors/:id return one actor", async () => {
  const res = await request(app).get(`/actors/${actorId}`);
  expect(res.status).toBe(200);
  expect(res.body.firstName).toBe("Scarlett");
})

test('PUT /actors/:id update one actor', async () => {
  const body = {
    firstName: "Scarlett"
  }
  const res = await request(app)
    .put(`/actors/${actorId}`)
    .send(body);
  expect(res.status).toBe(200);
  expect(res.body.firstName).toBe(body.firstName);
})

test('DELETE /actors/:id delete one actor', async () => {
  const res = await request(app).delete(`/actors/${actorId}`);
  expect(res.status).toBe(204);
})