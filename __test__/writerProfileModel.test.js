const db = require("../knex/knex");
const knexCleaner = require("knex-cleaner");
const writerProfiles = require("../users/writer_profiles/writersProfileModel");
// const writer_services_offered = require("../users/writer_profiles");
// const writer_educations = require("../users/writer_profiles");
// const work_histories = require("../users/writer_profiles");

const user = {
    email: "gmail@email.com",
    password: "password",
    user_type: "writer",
};

const userTwo = {
    email: "email@email.com",
    password: "password",
    user_type: "writer",
};

// const newWriter = {
//     first_name: "Peter",
//     last_name: "Smith",
//     city: "Chicago",
//     state: "IL",
//     country: "USA",
//     zip: "60614",
//     bio: "Experienced writer",
//     sector: "Non-profit Enviromental",
//     website: "none",
// };

//     describe("deleteWriteProfile", function() {
//       it("should delete a writer profile", async function() {
//         const writers = await db("writers");
//         await writers.deleteWriteProfile({ writer_id: 1 });
//         expect(users).toHaveLength(0);
//       });
//     });
//   });

let createdUserId;

beforeAll(async () => {
    await knexCleaner.clean(db, {
        ignoreTables: ["knex_migrations", "knex_migrations_lock"],
    });
    createdUserId = (await db("users").insert(user, "id"))[0];
});

afterAll(() => {
    return db.destroy();
});

describe("writers models", () => {
    beforeEach(async () => {
        await db.raw("truncate table writer_profiles cascade");
    });
    test("adds a writer profile ", async () => {
        const added = await writerProfiles.addWriterProfile(createdUserId);
        expect(added.writer_id).toEqual(createdUserId);
        const found = await db("writer_profiles")
            .where({ writer_id: createdUserId })
            .first();
        expect(found).toMatchObject({
            writer_id: createdUserId,
            first_name: "",
            last_name: "",
            city: "",
            state: "",
            country: "",
            zip: "",
            bio: "",
            sector: "",
            website: "",
        });
    });
    test("gets all writers profiles", async () => {
        const writers = await writerProfiles.findWritersProfile();
        expect(writers.length).toEqual(0);
        const added = await writerProfiles.addWriterProfile(createdUserId);
        const addedwriters = await writerProfiles.findWritersProfile();
        expect(addedwriters.length).toEqual(1);
    });

    test("gets writer profile by id", async () => {
        const profile = await writerProfiles.findWriterProfileById(
            createdUserId
        );
        expect(profile).toBe(undefined);
        const added = await writerProfiles.addWriterProfile(createdUserId);
        const foundProfile = await writerProfiles.findWriterProfileById(
            createdUserId
        );
        expect(foundProfile).toMatchObject(added);
    });
    test("deletes writer profile by id", async () => {
        const addedFirst = await writerProfiles.addWriterProfile(createdUserId);
        const createdUserNumberTwo = (
            await db("users").insert(userTwo, "id")
        )[0];
        const addedSecond = await writerProfiles.addWriterProfile(
            createdUserNumberTwo
        );
        await writerProfiles.deleteWriteProfile(createdUserId);
        const profiles = await writerProfiles.findWritersProfile();
        expect(profiles.length).toBe(1);
        expect(addedSecond).toMatchObject(profiles[0]);
    });
});
