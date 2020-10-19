exports.up = function(knex) {
  return knex.schema.table('classes', tbl => {
      tbl.integer('instructor_id')
        .references('id')
        .inTable('users')
        .unsigned()
        .notNullable()
        .defaultTo(0)
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
  })
};

exports.down = function(knex) {
  return knex.schema.table('classes', tbl => {
      tbl.dropColumn('instructor_id')
  })
};
