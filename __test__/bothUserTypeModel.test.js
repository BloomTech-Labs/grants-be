const db = require('../knex/knex.js');
const Users = require('../users/for_both_user_types/bothUserTypeModels.js');

beforeEach(async () => {
  await db.raw('TRUNCATE users RESTART IDENTITY CASCADE');
});

describe('base user queries', () => {
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

  describe('READ queries', () => {
    it('GETS user by their ID', async () => {

      await Users.add({
        email: "email@email.com",
        password: "password",
        user_type: "writer"
      });

      const user = await Users.findById(1);

      expect(user.email).toBe("email@email.com");
      expect(user.user_type).toBe("writer");
      
    });

    it('GETS users by user_type', async () => {

      await Users.add({
        email: "email@email.com",
        password: "password",
        user_type: "writer"
      });

      await Users.add({
        email: "greg@email.com",
        password: "password",
        user_type: "applicant"
      });

      await Users.add({
        email: "gmail@email.com",
        password: "password",
        user_type: "writer"
      });

      const writers = await Users.findByUserType("writer");

      expect(writers).toHaveLength(2);
      expect(writers[0].user_type).toBe("writer");
      expect(writers[1].user_type).not.toBe("applicant");

    })

    it('GETS users by dynamic filter, in this test by email', async () => {

      await Users.add({
        email: "starfire@email.com",
        password: "password",
        user_type: "writer"
      });

      await Users.add({
        email: "raven@email.com",
        password: "password",
        user_type: "applicant"
      });

      await Users.add({
        email: "cyborg@email.com",
        password: "password",
        user_type: "writer"
      });

      const filtered = await Users.findBy({email: 'raven@email.com'});

      expect(filtered).toHaveLength(1);
      expect(filtered[0].email).toBe('raven@email.com');
      expect(filtered[0].id).toBe(2);
 
    })
  })
});