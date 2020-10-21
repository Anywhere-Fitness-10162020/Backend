exports.up = function (knex) {
  return knex.schema.createTable("passes", (tbl) => {
    tbl.increments();
    tbl
      .integer("instructor_id")
      .references("id")
      .inTable("users")
      .unsigned()
      .notNullable()
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    tbl
      .string("class_type")
      .references("class_type")
      .inTable("classes")
      .notNullable()
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    tbl.integer("max_punches").unsigned().notNullable().defaultTo(5);
  })
  .createTable('punches', tbl => {
      tbl.integer('pass_id')
      .references("id")
      .inTable("passes")
      .unsigned()
      .notNullable()
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
      tbl.integer('user_id')
      .references("id")
      .inTable("users")
      .unsigned()
      .notNullable()
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
      tbl.integer('punch_count')
      .unsigned()
      .notNullable()
      .defaultTo(0)
      tbl.boolean('free_class')
      .defaultTo(0)
      tbl.primary(["pass_id", "user_id"])
  })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('punches')
    .dropTableIfExists('passes')
};
