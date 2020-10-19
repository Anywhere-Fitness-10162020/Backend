
exports.up = function(knex) {
  return knex.schema.table('classes', tbl => {
      tbl.string('class_timezone')
  })
};

exports.down = function(knex) {
    return knex.schema.table('classes', tbl => {
        tbl.dropColumn('class_timezone')
    })
};
