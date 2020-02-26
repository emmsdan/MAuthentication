const UserSchema = (DataTypes) => {
  return  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      use: 'signup',
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      use: 'as username'
    },
    phone: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
      use: 'as username'
    },
    country: {
      type: DataTypes.STRING,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
  };
};

module.exports = UserSchema;
