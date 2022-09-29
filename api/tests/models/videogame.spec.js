const { Videogame, conn } = require('../../src/db.js');
const { expect } = require('chai');
const { agent } = require('supertest');

describe('Videogame model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Videogame.sync({ force: true }));

    describe('name', () => {
      it('Debería arrojar un error si el nombre es nulo', (done) => {
        Videogame.create({
          name: null,
          description: "Este es el video juego número 2",
          genres: [5, 2],
          release_date: "2004-06-26",
          rating: 3.4,
          platforms: ["PS4", "PC"]
        })
          .then(() => done(new Error('Se requiere un nombre válido')))
          .catch(() => done());
      });
    })

    describe("Descripción", () => {
      it("Debería arrojar un error si la descripción es nula", (done) => {
        Videogame.create({
          name: "Videogame 2",
          description: null,
          genres: [5, 2],
          release_date: "2004-06-26",
          rating: 3.4,
          platforms: ["PS4", "PC"]
        })
          .then(() => done(new Error("Se requiere una descripción")))
          .catch(() => done())
      })
    })

    describe("Rating", () => {
      it("Debería arrojar un error si el rating no es un número", (done) => {
        Videogame.create({
          name: "Videogame 2",
          description: "Descripción del juego 2",
          genres: [5, 2],
          release_date: "2004-06-26",
          rating: "Hola",
          platforms: ["PS4", "PC"]
        })
          .then(() => done(new Error("El rating debe ser un número")))
          .catch(() => done())
      })
    });

    describe("Plataformas", () => {
      it("Debería arrojar un error si no se pasan plataformas", (done) => {
        Videogame.create({
          name: "Videogame 2",
          description: "Descripción del juego 2",
          genres: [5, 2],
          release_date: "2004-06-26",
          rating: 4,
        })
          .then(() => done(new Error("Debe agregarse mínimo una plataforma")))
          .catch(() => done())
      })
    });
  });
});

