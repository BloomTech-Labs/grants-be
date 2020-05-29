require("dotenv").config();

module.exports = {
    development: {
        client: "pg",
        connection: process.env.DATABASE_URL,
        migrations: {
            directory: __dirname + "/knex/migrations",
        },
        seeds: {
            directory: __dirname + "/knex/seeds",
        },
        ssl: true,
    },
    testing: {
        client: "pg",
        connection: process.env.TEST_DATABASE_URL,
        migrations: {
            directory: __dirname + "/knex/migrations",
        },
        seeds: {
            directory: __dirname + "/knex/seeds",
        },
        ssl: true,
    },
    staging: {
        client: "pg",
        connection: process.env.DATABASE_URL,
        migrations: {
            directory: __dirname + "/knex/migrations",
        },
        seeds: {
            directory: __dirname + "/knex/seeds",
        },
        pool: {
            min: 2,
            max: 10,
        },
        ssl: true,
    },
    production: {
        client: "pg",
        connection: process.env.DATABASE_URL,
        migrations: {
            directory: __dirname + "/knex/migrations",
        },
        seeds: {
            directory: __dirname + "/knex/seeds",
        },
        ssl: true,
    },
};
