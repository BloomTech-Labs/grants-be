exports.up = function (knex) {
    return knex.schema.table("writer_profiles", (tbl) => {
        tbl.varchar("first_name").notNullable();
        tbl.varchar("last_name").notNullable();
        tbl.varchar("sector");
        tbl.varchar("city").notNullable();
        tbl.varchar("state").notNullable();
        tbl.varchar("zip").notNullable();
        tbl.varchar("country").notNullable();
    });
    knex.schema.table("work_histories", (tbl) => {
        tbl.varchar("curent_position");
    });
    createTable("education", (tbl) => {
        tbl.varchar("college");
        tbl.date("start_date");
        tbl.date("end_date");
        tbl.boolean("still_attending").defaultTo(false);
        tbl.varchar("degree");
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists("education");
    knex.schema.table("work_histories", (tbl) => {
        tbl.dropColumn("curent_position");
    });
    knex.schema.table("writer_profiles", (tbl) => {
        tbl.dropColumn("country");
        tbl.dropColumn("zip");
        tbl.dropColumn("state");
        tbl.dropColumn("city");
        tbl.dropColumn("sector");
        tbl.dropColumn("last_name");
        tbl.dropColumn("first_name");
    });
};
