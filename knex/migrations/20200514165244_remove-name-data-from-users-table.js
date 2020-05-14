
exports.up = function(knex) {
  return knex.schema.table("users", tbl => {
    tbl.dropColumn("first_name");
    tbl.dropColumn("last_name");
  });
};

exports.down = function(knex) {
  return knex.schema.table("users", tbl => {
    tbl.varchar("last_name");
    tbl.varchar("first_name")
  });
};
