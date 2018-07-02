'use strict';
const fs = require('fs-extra')

module.exports = {
  up: (queryInterface, Sequelize) => {
    // Countries
    let countries = require('../countries.json')
    countries = countries.map((country) => {
      return {
        name: country.name,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    })

    return queryInterface.bulkInsert('Countries', countries, {})
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Countries', null, {});
  }
};
