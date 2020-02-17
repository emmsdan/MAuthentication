const SocialMediaConnectSchema = (DataTypes) => {
  return  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
    },
    social: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  };
};

module.exports = SocialMediaConnectSchema;
