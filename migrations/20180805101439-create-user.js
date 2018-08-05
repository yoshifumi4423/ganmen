'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      birthday: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      gender: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: ['man', 'woman']
      },
      countryId: {
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
    }).then(() => {
      return queryInterface.addIndex('Users', {
        fields: ['email'],
        unique: true
      }).then(queryInterface.addConstraint('Users', ['countryId'], {
        type: 'foreign key',
        references: {
          table: 'Countries',
          field: 'id'
        }
      }))
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users')
  }
}