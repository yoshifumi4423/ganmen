'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Images', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      mimetype : {
        allowNull: false,
        type: Sequelize.STRING
      },
      originalUrl : {
        allowNull: false,
        type: Sequelize.STRING
      },
      thumbnailUrl : {
        allowNull: false,
        type: Sequelize.STRING
      },
      userId : {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Images')
  }
}
