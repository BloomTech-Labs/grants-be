
exports.up = function(knex) {
  return knex.schema.table("writer_educations", tbl => {
    tbl.dropColumn("writer_profile_id");
    tbl.integer("writer_id")
  })
};

exports.down = function(knex) {
  
};
