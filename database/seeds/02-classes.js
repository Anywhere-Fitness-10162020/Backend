exports.seed = function(knex) {
    // Inserts seed entries for 'classes'
    return knex('classes').insert([
      { class_name: 'yoga at sunrise', type: 'yoga', class_duration: '00:45:00', class_intensity_level: 'low', class_city: 'San Francisco', start_time: '2020-10-21 09:00:00', attendee_count: 0, max_attendees: 30 },
      { class_name: 'running the hills of san fran', type: 'running', class_duration: '01:30:00', class_intensity_level: 'high', class_city: 'San Francisco', start_time: '2020-10-22 09:00:00', attendee_count: 0, max_attendees: 30 },
      { class_name: 'mma beginner training', type: 'martial arts', class_duration: '02:00:00', class_intensity_level: 'medium', class_city: 'Los Angeles', start_time: '2020-10-23 15:30:00', attendee_count: 0, max_attendees: 30 },
      { class_name: 'boxing fundamentals', type: 'martial arts', class_duration: '01:00:00', class_intensity_level: 'low', class_city: 'San Diego', start_time: '2020-10-24 09:00:00', attendee_count: 0, max_attendees: 30 },
      { class_name: 'hot yoga', type: 'yoga', class_duration: '00:45:00', class_intensity_level: 'high', class_city: 'Hollywood', start_time: '2020-10-25 09:00:00', attendee_count: 0, max_attendees: 30 },
      { class_name: 'half marathon running technique', type: 'running', class_duration: '02:00:00', class_intensity_level: 'medium', class_city: 'Miami', start_time: '2020-10-26 16:00:00', attendee_count: 0, max_attendees: 30 },
      { class_name: 'karate fundamentals', type: 'martial arts', class_duration: '01:30:00', class_intensity_level: 'low', class_city: 'Orlando', start_time: '2020-10-27 09:30:00', attendee_count: 0, max_attendees: 30 },
      { class_name: 'brazialian jui jitsu white to blue belt rolling practice', type: 'martial arts', class_duration: '03:00:00', class_intensity_level: 'high', class_city: 'Miami', start_time: '2020-10-28 09:00:00', attendee_count: 0, max_attendees: 30 },
      { class_name: 'beginner road racing', type: 'biking', class_duration: '02:00:00', class_intensity_level: 'medium', class_city: 'Jacksonville', start_time: '2020-10-29 09:00:00', attendee_count: 0, max_attendees: 30 },
      { class_name: 'yoga on the beach', type: 'yoga', class_duration: '00:45:00', class_intensity_level: 'high', class_city: 'Orlando', start_time: '2020-10-30 06:00:00', attendee_count: 0, max_attendees: 30 }
    ]);
  };