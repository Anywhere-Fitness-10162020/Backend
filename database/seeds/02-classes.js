exports.seed = function(knex) {
    // Inserts seed entries for 'classes'
    return knex('classes').insert([
      { class_name: 'yoga at sunrise', class_duration: '45 minutes', class_intensity_level: 'low', class_city: 'San Francisco', class_date: 'February 15, 2020', start_time: '7am' },
      { class_name: 'running the hills of san fran', class_duration: '1.5 hours', class_intensity_level: 'high', class_city: 'San Francisco', class_date: 'February 16, 2020', start_time: '6am' },
      { class_name: 'mma beginner training', class_duration: '2 hours', class_intensity_level: 'medium', class_city: 'Los Angeles', class_date: 'February 16, 2020', start_time: '6:30pm' },
      { class_name: 'boxing fundamentals', class_duration: '1 hour', class_intensity_level: 'low', class_city: 'San Diego', class_date: 'February 15, 2020', start_time: '6am' },
      { class_name: 'hot yoga', class_duration: '45 minutes', class_intensity_level: 'high', class_city: 'Hollywood', class_date: 'February 17, 2020', start_time: '4:30pm' },
      { class_name: 'half marathon running technique', class_duration: '2 hours', class_intensity_level: 'medium', class_city: 'Miami', class_date: 'February 17, 2020', start_time: '8am' },
      { class_name: 'karate fundamentals', class_duration: '1.5 hours', class_intensity_level: 'low', class_city: 'Orlando', class_date: 'February 15, 2020', start_time: '10am' },
      { class_name: 'brazialian jui jitsu white to blue belt rolling practice', class_duration: '3 hours', class_intensity_level: 'high', class_city: 'Miami', class_date: 'February 18, 2020', start_time: '1pm' },
      { class_name: 'beginner road racing', class_duration: '2 hours', class_intensity_level: 'medium', class_city: 'Jacksonville', class_date: 'February 20, 2020', start_time: '2pm' },
      { class_name: 'yoga on the beach', class_duration: '45 minutes', class_intensity_level: 'high', class_city: 'Orlando', class_date: 'February 19, 2020', start_time: '11am' }
    ]);
  };