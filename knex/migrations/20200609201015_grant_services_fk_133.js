exports.up = function (knex) {
    return knex
        .raw('ALTER TABLE public.grant_services DROP CONSTRAINT "FK_133"')
        .then(() => {
            return knex.schema.alterTable("grant_services", (table) => {
                table
                    .foreign("grant_id")
                    .references("grants.id")
                    .onDelete("CASCADE")
                    .onUpdate("CASCADE");
            });
        });
};

exports.down = function (knex) {
    return knex.schema
        .alterTable("grant_services", (table) => {
            table.dropForeign("grant_id");
        })
        .then(() => {
            return knex.raw(
                'ALTER TABLE public.grant_services ADD CONSTRAINT "FK_133" FOREIGN KEY (grant_id) REFERENCES  public.grants (id)  MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION'
            );
        });
};
