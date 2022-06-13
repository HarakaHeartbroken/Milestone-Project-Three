'use strict';
require('dotenv').config()

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('users', [{
      first_name: 'John',
      last_name: 'Doe',
      email: 'example@example.com',
      created_at: new Date(),
      updated_at: new Date()
    }])

    const [users] = await queryInterface.sequelize.query(
      `SELECT user_id from users LIMIT 1;`
    );

    await queryInterface.bulkInsert('units', [
      {
        name: 'Bland McProtagonist',
        rank: 'Legionary',
        legion: 'Ultramarines',
        keywords: 'Thai, Pan-Asian',
        pic: `http://localhost:${process.env.PORT}/images/h-thai-ml-tables.jpg`,
        recruited: 41238,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        name: 'Omegius Alpharon',
        rank: 'Classifed',
        legion: 'Omega Legion',
        keywords: 'Infantry, Primarch'
        pic: `http://localhost:${process.env.PORT}/images/coffee-cat.png`,
        recruited: 39049,
        created_at: new Date(),
        updated_at: new Date()
      }
    ])

    const [units] = await queryInterface.sequelize.query(
      `SELECT unit_id from units LIMIT 1;`
    );

    // remnant from rest-rant basic skeleton, will delete after confirming site still fuctions
    // await queryInterface.bulkInsert('comments', [
    //   {
    //     unit_id: units[0].unit_id,
    //     author_id: users[0].user_id,
    //     rant: false,
    //     stars: 5.0,
    //     content: 'Wow, simply amazing food here. I highly recommend this to anyone visiting the area!',
    //     created_at: new Date(),
    //     updated_at: new Date()
    //   }
    // ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('units', null, {});
    await queryInterface.bulkDelete('comments', null, {});
  }
};
