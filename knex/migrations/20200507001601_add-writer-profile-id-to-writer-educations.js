
exports.up = function(knex) {
  //this migration had an erorr and had to be duplicated in migration "fix-writer-education-id", it's present to keep duplicate code errors from being thrown, while still keeping the deployed heroky database migration file from being corrupted.
};

exports.down = function(knex) {
  
};
