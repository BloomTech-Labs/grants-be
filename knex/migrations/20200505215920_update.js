exports.up = function (knex) {
    return knex.schema.table("work_histories", (tbl) => {
        tbl.varchar("current_position");
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.table("work_histories", (tbl) => {
        tbl.dropColumn("current_position");
    });
};
