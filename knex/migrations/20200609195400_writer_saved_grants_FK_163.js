exports.up = function (knex) {
    return knex
        .raw('ALTER TABLE public.writer_saved_grants DROP CONSTRAINT "FK_163"')
        .then(() => {
            return knex.schema.alterTable("writer_saved_grants", (table) => {
                table
                    .foreign("writer_id")
                    .references("writer_profiles.id")
                    .onDelete("CASCADE")
                    .onUpdate("CASCADE");
            });
        });
};

exports.down = function (knex) {
    return knex.schema
        .alterTable("writer_saved_grants", (table) => {
            table.dropForeign("writer_id");
        })
        .then(() => {
            return knex.raw(
                'ALTER TABLE public.writer_saved_grants ADD CONSTRAINT "FK_163" FOREIGN KEY (writer_id) REFERENCES public.writer_profiles (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION'
            );
        });
};
