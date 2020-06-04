exports.up = function (knex) {
  return knex.schema.table("grants", (tbl) => {
    tbl.varchar("status").notNullable().defaultTo("open");
  });
};

exports.down = function (knex) {
  return knex.schema.table("grants", (tbl) => {
    tbl.dropColumn("status");
  });
};
