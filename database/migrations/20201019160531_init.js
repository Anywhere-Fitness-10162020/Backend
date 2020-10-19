exports.up = function(knex) {
  return knex.schema.createTable('classes', tbl => {
      tbl.increments()
      tbl.string('class_name').notNullable()
      tbl.string('type').notNullable()
      tbl.datetime('start_time').notNullable()
      tbl.time('duration', { precision: 6 }).notNullable()
      tbl.string('class_intensity_level').notNullable()
      tbl.string('class_city').notNullable()
      tbl.integer('attendee_count').notNullable()
      tbl.integer('max_attendees').notNullable().defaultTo(30)
  })
  .createTable('users', tbl => {
    tbl.increments();
    tbl
      .string('username', 255)
      .notNullable()
      .unique();
    tbl
      .string('email', 255)
      .notNullable()
      .unique();
    tbl.string('password', 255).notNullable();
    tbl.string('role').notNullable();
    tbl.timestamps(true, true);
  })

  .createTable('attendees', tbl => {
    tbl.increments();
    tbl
      .integer('user_id')
      .references('id')
      .inTable('users')
      .unsigned()
      .notNullable()
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl
      .integer('class_id')
      .references('id')
      .inTable('classes')
      .unsigned()
      .notNullable()
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('attendees')
    .dropTableIfExists('users')
    .dropTableIfExists('classes')
};
