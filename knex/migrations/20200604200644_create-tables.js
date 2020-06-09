exports.up = function (knex) {
    return knex
        .raw('ALTER TABLE public.writer_profiles DROP CONSTRAINT "FK_155"')
        .then(() => {
            return knex.schema.alterTable("writer_profiles", (table) => {
                table
                    .foreign("writer_id")
                    .references("users.id")
                    .onDelete("CASCADE")
                    .onUpdate("CASCADE");
            });
        });
};

exports.down = function (knex) {
    return knex.schema
        .alterTable("writer_profiles", (table) => {
            table.dropForeign("writer_id");
        })
        .then(() => {
            return knex.raw(
                'ALTER TABLE public.writer_profiles ADD CONSTRAINT "FK_155" FOREIGN KEY (writer_id) REFERENCES public.users (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION'
            );
        });
};
