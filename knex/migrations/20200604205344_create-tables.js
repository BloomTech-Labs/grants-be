exports.up = function (knex) {
    return knex
        .raw('ALTER TABLE public.grants DROP CONSTRAINT "FK_128"')
        .then(() => {
            return knex.schema.alterTable("grants", (table) => {
                table
                    .foreign("applicant_profile_id")
                    .references("applicant_profiles.id")
                    .onDelete("CASCADE")
                    .onUpdate("CASCADE");
            });
        });
};

exports.down = function (knex) {
    return knex.schema
        .alterTable("grants", (table) => {
            table.dropForeign("applicant_profile_id");
        })
        .then(() => {
            return knex.raw(
                'ALTER TABLE public.grants ADD CONSTRAINT "FK_128" FOREIGN KEY (applicant_profile_id) REFERENCES public.applicant_profiles (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION'
            );
        });
};
