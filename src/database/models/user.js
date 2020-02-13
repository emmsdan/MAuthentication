const { UserSchema } = require('../schema');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', UserSchema(DataTypes));
  // User.associate = (models) => {
  //   const { Activation, PasswordManager, Store, CheckoutList } = models;
  //
  //   User.hasOne(Activation, { foreignKey: 'id' });
  //   User.hasOne(PasswordManager, { foreignKey: 'id' });
  //   User.hasOne(Store, { foreignKey: 'id' });
  //   User.hasMany(CheckoutList, { foreignKey: 'id' });
  // };
  return User;
};
