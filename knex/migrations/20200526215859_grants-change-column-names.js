exports.up = function (knex) {
  return knex.schema.table("grants", (tbl) => {
    tbl.renameColumn("applicat_profile_id", "applicant_profile_id");
    tbl.varchar("site_id");
    tbl.varchar("status").notNullable();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.table("grants", (tbl) => {
    tbl.dropColumn("status");
    tbl.dropColumn("site_id");
    tbl.dropColumn("applicant_profile_id", "applicat_profile_id");
  });
};
