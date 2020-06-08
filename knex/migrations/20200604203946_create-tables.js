exports.up = function (knex) {
    return knex
        .raw('ALTER TABLE public.portfolio_entries DROP CONSTRAINT "FK_116"')
        .then(() => {
            return knex.schema.alterTable("portfolio_entries", (table) => {
                table
                    .foreign("writer_profile_id")
                    .references("writer_profiles.id")
                    .onDelete("CASCADE")
                    .onUpdate("CASCADE");
            });
        });
};

exports.down = function (knex) {
    return knex.schema
        .alterTable("portfolio_entries", (table) => {
            table.dropForeign("writer_profile_id");
        })
        .then(() => {
            return knex.raw(
                'ALTER TABLE public.portfolio_entries ADD CONSTRAINT "FK_116" FOREIGN KEY (writer_profile_id) REFERENCES public.writer_profiles (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION'
            );
        });
};
