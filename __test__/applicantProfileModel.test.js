const db = require('../knex/knex.js');
const Users = require('../users/for_both_user_types/bothUserTypeModels.js');
const Applicants = require('../users/applicant_profiles/applicantProfileModel.js');

beforeEach(async () => {
  //await db.raw('TRUNCATE applicant_profiles RESTART IDENTITY CASCADE');
  await db.raw('TRUNCATE users RESTART IDENTITY CASCADE');
});


describe('applicant profile queries', () => {
  describe('CREATE functions', () => {
    it('adds a new blank user profile when new applicant registers', async () => {
      
      //auto gen user id: 1
        await Users.add({
        email: "email@email.com",
        password: "password",
        user_type: "applicant"
      })

      const appProfiles = await db('applicant_profiles');

      expect(appProfiles).toHaveLength(1);
      expect(appProfiles[0].applicant_id).toBe(1);
      expect(appProfiles[0].bio).toBe('');
      expect(appProfiles[0].first_name).toBe('');
    })
  });

  describe('GET functions', () => {
    it('returns all applicant_profiles', async () => {

      //applicant profiles auto generated with new user creation
      await Users.add({
        //autogen id: 1
        email: "sunbeam@email.com",
        password: "password",
        user_type: "applicant"
      });
      await Users.add({
        //autogen id: 2
        email: "moonbeam@email.com",
        password: "password",
        user_type: "applicant"
      });
      await Users.add({
        //autogen id: 3
        email: "starshine@email.com",
        password: "password",
        user_type: "applicant"
      });

      const appProfiles = await Applicants.findApplicantProfiles();

      expect(appProfiles).toHaveLength(3);
      expect(appProfiles[0].org_name).toBe("");
      expect(appProfiles[2].id).toBe(3);
    })
    it('returns applicant profile info by user id', async () => {

      await Users.add({
        //autogen id: 1
        email: "sunbeam@email.com",
        password: "password",
        user_type: "applicant"
      });
      await Users.add({
        //autogen id: 2
        email: "moonbeam@email.com",
        password: "password",
        user_type: "applicant"
      });
      await Users.add({
        //autogen id: 3
        email: "starshine@email.com",
        password: "password",
        user_type: "applicant"
      });

      const appProf3 = await Applicants.findApplicantProfileById(3);

      expect(appProf3.id).toBe(3);
      expect(appProf3.id).not.toBe(2);
    });
  });
})