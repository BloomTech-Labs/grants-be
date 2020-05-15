
exports.up = function(knex) {
  return knex.schema.table("applicant_profiles", tbl => {
    tbl.varchar("first_name");
    tbl.varchar("last_name");
    tbl.varchar("city");
    tbl.varchar("state");
    tbl.varchar("country");
    tbl.varchar("zip");
    tbl.dropColumn("contact_name");
  })
};

exports.down = function(knex) {
  return knex.schema.table("applicant_profiles", tbl => {
    tbl.varchar("contact_name");
    tbl.dropColumn("zip");
    tbl.dropColumn("country");
    tbl.dropColumn("state");
    tbl.dropColumn("city");
    tbl.dropColumn("last_name");
    tbl.dropColumn("first_name");
  })
};
