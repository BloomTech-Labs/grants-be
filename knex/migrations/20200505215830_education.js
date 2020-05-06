exports.up = function (knex) {
    return knex.schema.createTable("education", (tbl) => {
        tbl.varchar("college");
        tbl.date("start_date");
        tbl.date("end_date");
        tbl.boolean("still_attending").defaultTo(false);
        tbl.varchar("degree");
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists("education");
};
