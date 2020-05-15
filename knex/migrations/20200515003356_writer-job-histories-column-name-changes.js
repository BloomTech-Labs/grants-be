
exports.up = function(knex) {
  return knex.schema.table("work_histories", tbl => {
    tbl.dropColumn("employer");
    tbl.dropColumn("job_title");
    tbl.dropColumn("job_description");
    tbl.varchar("company");
    tbl.varchar("position");
    tbl.varchar("responsibilities");
  });
};

exports.down = function(knex) {
  return knex.schema.table("work_histories", tbl => {
    tbl.dropColumn("responsibilities");
    tbl.dropColumn("position");
    tbl.dropColumn("company");
    tbl.varchar("job_description");
    tbl.varchar("job_title");
    tbl.varchar("employer");
  })
};
