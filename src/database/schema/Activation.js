const authSettingSchema = require('../../settings/auth').authSchema;

const ActivationSchema = (DataTypes) => {
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
    },
    token: {
      type: DataTypes.STRING
    },
    ...authSettingSchema(DataTypes)
  };
};

module.exports = ActivationSchema;
