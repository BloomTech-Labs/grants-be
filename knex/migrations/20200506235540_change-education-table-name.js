
exports.up = function(knex) {
  return knex.schema
    .renameTable('education', 'writer_educations');
};

exports.down = function(knex) {
  return knex.schema  
    .renameTable('writer_educations', 'education');
};
