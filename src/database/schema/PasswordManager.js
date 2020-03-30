const authSettingSchema = require('../../settings/auth').authSchema;
const PasswordManagerSchema = (DataTypes) => {
  return  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
    },
    currentPass: {
      type: DataTypes.STRING,
    },
    previousPass: {
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.UUID,
    },
    __: { type: DataTypes.STRING },
    ...authSettingSchema(DataTypes)
  };
};

module.exports = PasswordManagerSchema;
