exports.up = function (knex) {
  return knex.schema.table("classes", (tbl) => {
    tbl.dropColumn("duration");
    tbl.time("class_duration", { precision: 6 }).notNullable().defaultTo('00:00:00');
  });
};

exports.down = function (knex) {
  return knex.schema.table("classes", (tbl) => {
    tbl.dropColumn("class_duration");
    tbl.time("duration", { precision: 6 }).notNullable().defaultTo('00:00:00');
  });
};
