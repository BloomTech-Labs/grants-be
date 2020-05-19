exports.up = function(knex) {
  return knex.schema.table('writer_educations', tbl => {
    tbl.increments();
  })
};

exports.down = function(knex) {
  return knex.schema.table('writer_educations', tbl => {
    tbl.dropColumn('id');
  })
};
