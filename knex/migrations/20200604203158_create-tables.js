exports.up = function (knex) {
    return knex
        .raw('ALTER TABLE public.applicant_profiles DROP CONSTRAINT "FK_29"')
        .then(() => {
            return knex.schema.alterTable("applicant_profiles", (table) => {
                table
                    .foreign("applicant_id")
                    .references("users.id")
                    .onDelete("CASCADE")
                    .onUpdate("CASCADE");
            });
        });
};

exports.down = function (knex) {
    return knex.schema
        .alterTable("applicant_profiles", (table) => {
            table.dropForeign("applicant_id");
        })
        .then(() => {
            return knex.raw(
                'ALTER TABLE public.applicant_profiles ADD CONSTRAINT "FK_29" FOREIGN KEY (applicant_id) REFERENCES public.users (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION'
            );
        });
};
