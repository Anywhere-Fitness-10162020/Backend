exports.seed = function(knex) {
    // Template for inserting seed entries --> I just removed the intitial return function
    return knex('users').insert([
      { username: 'Todd', email: 'todd@test.com', password: 'toddmurphy', role: 'instructor' }, 
      { username: 'Liam', email: 'liam@test.com', password: 'liammurphy', role: 'attendeee' },
      { username: 'Jackie', email: 'jackie@test.com', password: 'jackiehowatt', role: 'attendee' },
      { username: 'Don', email: 'don@test.com', password: 'donmurphy', role: 'instructor' },
      { username: 'Alicia', email: 'alicia@test.com', password: 'aliciarobinson', role: 'attendee' },
      { username: 'Jacob', email: 'jacob@test.com', password: 'jacobwashbur', role: 'instructor' },
      { username: 'Gabriel', email: 'gabriel@test.com', password: 'gabrielanguiano', role: 'attendee' },
      { username: 'Kevin', email: 'kevin@test.com', password: 'kevingarnett', role: 'instructor' },
      { username: 'Derek', email: 'derek@test.com', password: 'derekroche', role: 'attendee' },
      { username: 'John', email: 'johnwick@test.com', password: 'johnwick', role: 'instructor' }
    ]);
  };