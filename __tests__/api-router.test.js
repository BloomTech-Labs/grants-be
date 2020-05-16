const request = require('supertest');
const server = require('../api/server.js');
const apiRouter = require('../api/api-router.js');
const knex = require('knex');

describe('api-router.js', () => {

  it('sets the environment to testing', () => {
    expect(process.env.DB_ENV).toBe('testing');
  });

  describe('/GET', () => {
    
    it('connects and returns a 200 status', async () => {
      const res = await request(server).get('/');

      expect(res.status).toBe(200);
    });

    it('should return success message', async () => {
      const res = await request(server).get('/');

      expect(res.body).toEqual({ message: "Server Running!"});
    });
  });
});