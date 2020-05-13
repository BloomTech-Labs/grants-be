exports.up = function (knex) {
    return knex.schema.alterTable("users", (tbl) => {
        tbl.unique("email");
    });
};

exports.down = function (knex) {
    return knex.schema.alterTable("users", (tbl) => {
        tbl.dropUnique("email");
    });
};
