exports.up = function (knex) {
    return knex
        .raw('ALTER TABLE public.grant_services DROP CONSTRAINT "FK_140"')
        .then(() => {
            return knex.schema.alterTable("grant_services", (table) => {
                table
                    .foreign("service_id")
                    .references("services_needed.id")
                    .onDelete("CASCADE")
                    .onUpdate("CASCADE");
            });
        });
};

exports.down = function (knex) {
    return knex.schema
        .alterTable("grant_services", (table) => {
            table.dropForeign("service_id");
        })
        .then(() => {
            return knex.raw(
                'ALTER TABLE public.grant_services ADD CONSTRAINT "FK_140" FOREIGN KEY (service_id) REFERENCES  public.services_needed (id)  MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION'
            );
        });
};
