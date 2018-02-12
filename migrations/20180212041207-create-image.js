'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Images', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fieldname : {
        allowNull: false,
        type: Sequelize.STRING
      },
      originalname : {
        allowNull: false,
        type: Sequelize.STRING
      },
      encoding : {
        allowNull: false,
        type: Sequelize.STRING
      },
      mimetype : {
        allowNull: false,
        type: Sequelize.STRING
      },
      destination : {
        allowNull: false,
        type: Sequelize.STRING
      },
      filename : {
        allowNull: false,
        type: Sequelize.STRING
      },
      size : {
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
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Images');
  }
};
