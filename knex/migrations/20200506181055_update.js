exports.up = function (knex) {
    return knex.schema.table("users", (tbl) => {
        tbl.varchar("first_name").notNullable();
        tbl.varchar("last_name").notNullable();
        tbl.dropColumn("name");
        tbl.dropColumn("username")
    });
   
};

exports.down = function (knex, Promise) {
    return knex.schema.table("users", (tbl) => {
        tbl.varchar("username");
        tbl.varchar("name");
        tbl.dropColumn("last_name");
        tbl.dropColumn("first_name");  
    });
};
