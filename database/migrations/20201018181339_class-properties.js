const { table } = require("../database/connection");

exports.up = function(knex) {
    return knex.schema.table('classes', tbl => {
        tbl.string('type').notNullable().defaultTo('general')
        tbl.integer('attendees').notNullable().defaultTo(0)
        tbl.integer('max_attendees').notNullable().defaultTo(1)
    })
};

exports.down = function(knex) {
    return knex.schema.table('classes', tbl => {
        tbl.dropColumns('type', 'attendees', 'max_attendees')
    })
};
