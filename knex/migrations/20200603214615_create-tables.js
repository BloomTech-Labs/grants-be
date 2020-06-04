exports.up = function (knex) {
    return knex.schema.table("writer_educations", (tbl) => {
        tbl.dropColumn("writer_profile_id");
        tbl.integer("writer_id")
            .unsigned()
            .references("users.id")
            .onDelete("CASCADE")
            .onUpdate("CASCADE");
    });
};

exports.down = function (knex) {
    return knex.schema.table("writer_educations", (tbl) => {
        tbl.dropColumn("writer_id");
        tbl.integer("writer_profile_id")
            .unsigned()
            .references("writer_profiles.id")
            .onDelete("CASCADE")
            .onUpdate("CASCADE");
    });
};
