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
};

exports.down = function (knex, Promise) {
    return knex.schema.table("writer_profiles", (tbl) => {
        tbl.dropColumn("country");
        tbl.dropColumn("zip");
        tbl.dropColumn("state");
        tbl.dropColumn("city");
        tbl.dropColumn("sector");
        tbl.dropColumn("last_name");
        tbl.dropColumn("first_name");
    });
};
