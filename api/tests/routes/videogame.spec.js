/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Videogame, conn } = require('../../src/db.js');

const agent = session(app);

xdescribe('GET /videogames', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  beforeEach(() => Videogame.sync({ force: true }))

  it('Responde con 200', () =>
    agent.get('/videogames').expect(200)
  ).timeout(10000);

  it("Responde con 400 si hay un error", () => agent.get('/videogames?game=asdlfnl').expect(400));

  it("Responde un mensaje de error si no encuentra el juego", () =>
    agent.get('/videogames?game=asdlfnl').then(res => {
      expect(res.body.msgError).to.be.equal(`No se encontraron juegos con el nombre: asdlfnl`)
    })).timeout(10000)

  it("Responde un arreglo con 15 videojuegos si encuentra juegos con el nombre especificado", () =>
    agent.get('/videogames?game=counter').then(res => {
      expect(res.body).to.have.lengthOf(15)
    })).timeout(10000)
})

xdescribe('GET /genres', () => {
  it("Responde con 200 si recibe los géneros", () => agent.get('/genres').expect(200));
  it("Responde un arreglo", () =>
    agent.get('/genres').then(res => {
      expect(res.body).to.be.a("array")
    }))
  it("Responde con un arreglo que tiene los 19 géneros", () =>
    agent.get('/genres').then(res => {
      expect(res.body).to.have.lengthOf(19)
    }))
  it("Responde con un arreglo que tiene los géneros 'Action' y 'Sports'", () =>
    agent.get('/genres').then(res => {
      expect(res.body).to.deep.include({ id: 1, name: "Action" }, { id: 14, name: "Sports" })
    }))
});
