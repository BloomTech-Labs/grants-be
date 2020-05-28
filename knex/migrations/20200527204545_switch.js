exports.up = function (knex) {
    return knex.schema.table("writer_educations", (tbl) => {
        tbl.renameColumn("writer_profile_id", "writer_id");
    });
};

exports.down = function (knex) {
    return knex.schema.table("writer_educations", (tbl) => {
        tbl.renameColumn("writer_id", "writer_profile_id");
    });
};
