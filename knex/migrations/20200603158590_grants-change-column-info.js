exports.up = function (knex) {
  return knex.schema.table("grants", (tbl) => {
    tbl.dropColumn("contact_name");
    tbl.dropColumn("org_name");
    tbl.varchar("awarding_agency");
    tbl.dropColumn("status");
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.table("grants", (tbl) => {
    tbl.varchar("status");
    tbl.dropColumn("awarding_agency");
    tbl.varchar("org_name");
    tbl.varchar("contact_name");
  });
};
