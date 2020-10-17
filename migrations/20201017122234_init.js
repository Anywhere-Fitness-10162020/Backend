exports.up = function(knex) {
  return knex.schema.createTable('classes', tbl => {
      tbl.increments();
      tbl.string('name').notNullable()
      tbl.string('type').notNullable()
      tbl.datetime('start_time').notNullable()
      tbl.integer('duration').unsigned().notNullable()
      tbl.integer('intensity_level').unsigned().notNullable().defaultTo(1)
      tbl.string('location').notNullable()
      tbl.integer('attendees_registered').unsigned().notNullable().defaultTo(0)
      tbl.integer('max_attendees').unsigned().notNullable()
      tbl.integer('instructor_id').unsigned().notNullable()
  })
      .createTable('users', tbl => {
          tbl.increments()
          tbl.string('username').notNullable()
          tbl.string('password').notNullable()
          tbl.integer('user_type').unsigned().notNullable()
      })
      .createTable('reservations', tbl => {
          tbl.integer('user_id')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('users')
          .onUpdate('CASCADE')
          .onDelete('CASCADE')
          tbl.integer('class_id')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('classes')
          .onUpdate('CASCADE')
          .onDelete('CASCADE')
      })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('reservations')
  .dropTableIfExists('users')
  .dropTableIfExists('classes')
};
