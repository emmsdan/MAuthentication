const {
  UserSchema,
  SocialMediaConnectSchema,
  PasswordManagerSchema,
  ActivationSchema,
  InitiatorSchema
} = require('../schema');

module.exports = {
  up: (queryInterface, Sequelize) =>{
    const createAt = {
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    };
    const user = queryInterface.createTable(
      'Users',
      {
        ...UserSchema(Sequelize),
        ...createAt
      });

    const activation = queryInterface.createTable(
      'Activations',
      {
        ...ActivationSchema(Sequelize),
        ...createAt
      });

    const initiator = queryInterface.createTable(
      'Initiators',
      {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.INTEGER,
          autoIncrement: true,
          unique: true
        },
        ...InitiatorSchema(Sequelize),
        ...createAt
      },  {
        freezeTableName: true,
      });

    const password = queryInterface.createTable(
      'PasswordManagers',
      {
        ...PasswordManagerSchema(Sequelize),
        ...createAt
      });

    const social = queryInterface.createTable(
      'SocialMediaConnect',
      {
        ...SocialMediaConnectSchema(Sequelize),
        ...createAt
      });
    return Promise.all([user, password, activation, social, initiator]);
  },
  down: (queryInterface) => Promise.all([
    queryInterface.dropTable('Users'), queryInterface.dropTable('PasswordManagers'), queryInterface.dropTable('Activations'), queryInterface.dropTable('Initiator'), queryInterface.dropTable('SocialMediaConnect')]),
};
