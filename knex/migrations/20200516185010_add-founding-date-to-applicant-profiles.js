
exports.up = function(knex) {
  return knex.schema.table('applicant_profiles', tbl => {
    tbl.date('founding_date');
  })
};

exports.down = function(knex) {
  return knex.schema.table('applicant_profiles', tbl => {
    tbl.dropColumn('founding_date');
  })
};
