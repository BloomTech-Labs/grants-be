const db = require('../knex/knex.js');
const Users = require('../users/for_both_user_types/bothUserTypeModels.js');

beforeEach(async () => {
  // await db('users').truncate();
  // await db('writer_profiles').truncate();
  // await db('applicant_profiles').truncate();
  await db.raw('TRUNCATE users RESTART IDENTITY CASCADE');
});

describe('user onboarding and registration queries', () => {
  describe('CREATE queries', () => {
    it('adds a new user to the db', async () => {
      await Users.add({
        email: 'coolemail@gmail.com',
        password: 'bestpassword',
        user_type: 'writer'
      });
      await Users.add({
        email: 'betteremail@gmail.com',
        password: 'betterpassword',
        user_type: 'applicant'
      });
      await Users.add({
        email: 'coolestemail@gmail.com',
        password: 'bestpassword',
        user_type: 'writer'
      });

      const users = await db('users');
      expect(users).toHaveLength(3);
    });
  });
});