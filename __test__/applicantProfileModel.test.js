const db = require("../knex/knex.js");
const Users = require("../users/for_both_user_types/bothUserTypeModels.js");
const Applicants = require("../users/applicant_profiles/applicantProfileModel.js");

beforeEach(async () => {
    await db.raw("TRUNCATE applicant_profiles RESTART IDENTITY CASCADE");
    await db.raw("TRUNCATE users RESTART IDENTITY CASCADE");
});

const userData = [
    {
        email: "sunbeam@email.com",
        user_type: "applicant",
        password: "password",
    },
    {
        email: "moonbeam@email.com",
        user_type: "applicant",
        password: "password",
    },
    {
        email: "starshine@email.com",
        user_type: "applicant",
        password: "password",
    },
];

describe("applicant profile queries", () => {
    describe("CREATE functions", () => {
        it("adds a new blank user profile when new applicant registers", async () => {
            await Users.add(userData[0]); //auto gen user id: 1

            const appProfiles = await Applicants.findApplicantProfiles();

            expect(appProfiles).toHaveLength(1);
            expect(appProfiles[0].applicant_id).toBe(1);
            expect(appProfiles[0].bio).toBe("");
            expect(appProfiles[0].first_name).toBe("");
        });
    });

    describe("GET functions", () => {
        it("returns all applicant_profiles", async () => {
            //applicant profiles auto generated with new user creation
            await Users.add(userData[0]); //autogen id: 1
            await Users.add(userData[1]); //autogen id: 2
            await Users.add(userData[2]); //autogen id: 3

            const appProfiles = await Applicants.findApplicantProfiles();

            expect(appProfiles).toHaveLength(3);
            expect(appProfiles[0].org_name).toBe("");
            expect(appProfiles[2].id).toBe(3);
        });

        it("returns applicant profile info by user id", async () => {
            await Users.add(userData[0]);
            await Users.add(userData[1]);
            const user_three = await Users.add(userData[2]);

            const appProf3 = await Applicants.findApplicantProfileById(
                user_three.id
            );

            expect(appProf3.applicant_id).toBe(user_three.id);
        });

        it("returns applicant profile(s) by dynamic filter", async () => {
            await Users.add(userData[0]);
            await Users.add(userData[1]);
            await Users.add(userData[2]);

            const emailSearch = await Applicants.findApplicantProfilesBy({
                applicant_id: 1,
            });
            expect(emailSearch).toHaveLength(1);
            expect(emailSearch[0].applicant_id).toBe(1);
        });

        it("updates applicant profile data", async () => {
            await Users.add(userData[2]); //autogen id: 1
            await Users.add(userData[0]); //autogen id: 2
            await Users.add(userData[1]); //autogen id: 3

            const profChanges = {
                org_name: "New Name",
                bio: "This is a little about me.",
                first_name: "Janice",
                last_name: "Ian",
            };

            await Applicants.updateApplicantProfile(profChanges, 2);

            const updatedProfile = await Applicants.findApplicantProfileById(2);
            const untouchedProfile = await Applicants.findApplicantProfileById(
                1
            );

            expect(updatedProfile.org_name).toBe("New Name");
            expect(updatedProfile.first_name).toBe("Janice");
            expect(untouchedProfile.first_name).not.toBe("Janice");
        });
    });
});
