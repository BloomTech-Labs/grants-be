exports.up = function (knex) {
    return knex
        .raw('ALTER TABLE public.writer_saved_grants DROP CONSTRAINT "FK_166"')
        .then(() => {
            return knex.schema.alterTable("writer_saved_grants", (table) => {
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
        .alterTable("writer_saved_grants", (table) => {
            table.dropForeign("grant_id");
        })
        .then(() => {
            return knex.raw(
                'ALTER TABLE public.writer_saved_grants ADD CONSTRAINT "FK_166" FOREIGN KEY (grant_id) REFERENCES   public.grants (id)  MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION'
            );
        });
};
