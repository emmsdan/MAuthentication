const { UserSchema } = require('../schema');

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable(
      'Users',
      {
        ...UserSchema(Sequelize),
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      },
      { freezeTableName: true }
    ),
  down: (queryInterface) => queryInterface.dropTable('User'),
};
