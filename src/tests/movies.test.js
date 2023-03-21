const request = require('supertest');
const app = require('../app');
const Actor = require('../models/Actor');
const Director = require('../models/Director');
const Genre = require('../models/Genre');
require('../models');

let movieId;

test("POST /movies should create a new movie", async () => {
  const newMovie = {
    name: "The Avengers",
    image:"image.png",
    synopsis:"The head of the SHIELD Agency decides to recruit a team to save the world from near-certain disaster when an unexpected enemy emerges as a major threat to global security.",
    releaseYear:2012

  };
  const res = await request(app)
    .post("/movies")
    .send(newMovie);
  movieId = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.name).toBe(newMovie.name);
})

test("GET /movies return movies", async () => {
  const res = await request(app).get('/movies');  
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
})

test("GET ONE /movies/:id return one movie", async () => {
  const res = await request(app).get(`/movies/${movieId}`);
  expect(res.status).toBe(200);
  expect(res.body.name).toBe("The Avengers");
})

//actors
test('POST /movies/:id/actors should set the actors of movies', async () => {
  const actor = await Actor.create(
    {
      firstName: "Scarlett",
      lastName:"Johansson",
      nationality: "Estadounidense",
      image:"image.png",
      birthday: "02/22/1984"
    }
  );
  const res = await request(app)
    .post(`/movies/${movieId}/actors`)
    .send([actor.id]);
  await actor.destroy();
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
})

//directors
test('POST /movies/:id/directors should set the directors of movies', async () => {
  const director = await Director.create(
    {
      firstName: "Anthony",
      lastName: "Russo",
      nationality: "Estadounidense",
      image: "image.png",
      birthday: "02/03/1970"
    }
  );
  const res = await request(app)
    .post(`/movies/${movieId}/directors`)
    .send([director.id]);
  await director.destroy();
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
})


//genre
test('POST  /movies/:id/genres should set the genres of movies', async () => {
  const genre = await Genre.create(
    {
      name: "action"
    }
  );
  const res = await request(app)
    .post(`/movies/${movieId}/genres`)
    .send([genre.id]);
  await genre.destroy();
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
})

test('PUT /movies/:id update one movie', async () => {
  const body = {
    name: "The Avengers"
  };
  const res = await request(app)
    .put(`/movies/${movieId}`)
    .send(body);
  expect(res.status).toBe(200);
  expect(res.body.name).toBe(body.name);
})

test('DELETE /movies/:id delete one movie', async () => {
  const res = await request(app).delete(`/movies/${movieId}`);
  expect(res.status).toBe(204);
})