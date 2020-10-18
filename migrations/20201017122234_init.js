exports.up = function(knex) {
    // for seeds, make sure this order matches
    // 'users' table
    return (
      knex.schema
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
        }) //end of 'users' table
  
        // 'classes' table
        .createTable('classes', tbl => {
          tbl.increments();
  
          tbl.string('class_name', 255).notNullable();
  
          tbl.string('class_duration', 255).notNullable();
  
          tbl.string('class_intensity_level', 25).notNullable();
  
          tbl.string('class_city', 75).notNullable();
  
          tbl.date('class_date');
  
          tbl.string('start_time');
  
          tbl.datetime('class_timezone');
        }) // end of 'classes' table
  
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
        }) //end of 'attendees' table
    );
  };
  
  exports.down = function(knex) {
    //make sure to reverser order from above
    return knex.schema
      .dropTableIfExists('attendees')
      .dropTableIfExists('classes')
      .dropTableIfExists('users');
  };