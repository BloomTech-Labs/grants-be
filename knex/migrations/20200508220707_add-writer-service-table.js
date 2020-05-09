
exports.up = function(knex) {
  return knex.schema.createTable('writer_services_offered', tbl => {
    tbl.increments();
    tbl.integer('writer_profile_id')
      .unsigned()
      .references('writer_profiles.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    tbl.varchar('service_offered')
      .notNullable();
  });

};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('writer_services_offered');
};
