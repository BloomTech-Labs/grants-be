exports.up = function (knex) {
  return knex.schema.table("grants", (tbl) => {
    tbl.varchar("title").notNullable();
    tbl.varchar("site_id").notNullable();
    tbl.varchar("agency");
    tbl.varchar("status").notNullable();
    tbl.varchar("posted_date").notNullable();
    tbl.varchar("end_date").notNullable();
    tbl.varchar("details").notNullable();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.table("grants", (tbl) => {
    tbl.dropColumn("details");
    tbl.dropColumn("end_date");
    tbl.dropColumn("posted_date");
    tbl.dropColumn("status");
    tbl.dropColumn("agency");
    tbl.dropColumn("site_id");
    tbl.dropColumn("title");
  });
};
