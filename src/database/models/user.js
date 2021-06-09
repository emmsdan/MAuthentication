const {
  UserSchema,
  SocialMediaConnectSchema,
  PasswordManagerSchema,
  ActivationSchema,
  InitiatorSchema
} = require('../schema');
const encryptor = require('../../utils/encryptor');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', UserSchema(DataTypes), {});

  const Activation = sequelize.define('Activations',
    ActivationSchema(DataTypes), {});

  const Initiator = sequelize.define('Initiator',
    InitiatorSchema(DataTypes), {});

  const PasswordManager = sequelize.define('PasswordManagers',
    PasswordManagerSchema(DataTypes), {});

  const SocialMediaConnect = sequelize.define('SocialMediaConnect',
    SocialMediaConnectSchema(DataTypes), {});

  /** ------------- Setup Relationships --___---- **/

  User.associate = (models) => {
    const { Activation, PasswordManager, SocialMediaConnect } = models;
    User.hasOne(PasswordManager);
    User.hasOne(Activation);
    User.hasOne(SocialMediaConnect, { foreignKey: 'id' });
  };

  SocialMediaConnect.associate = (models) => {
    const { User } = models;
    SocialMediaConnect.belongsTo(User, { foreignKey: 'userId' });
  };

  Initiator.associate = (models) => {
    Object.keys(models).forEach(modelName => {
      Initiator.belongsTo(models[modelName], { foreignKey: 'refTableId' });
    });
  };

  /** -------------- Setup Hooks -----____----- **/
  PasswordManager.beforeCreate(async (password) => {
    const hashedPassword = await encryptor.hash(password.currentPass);
    password.currentPass = hashedPassword;
  });

  return { User, PasswordManager, SocialMediaConnect, Activation, Initiator };
};
