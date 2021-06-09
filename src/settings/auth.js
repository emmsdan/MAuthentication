/* eslint no-undef: 0 */

/**
* @title LanguageService
* @description This class allows users to access api in their local language
* @author EmmsDan Inc
*/

/**                                                  /
* ---------------- FUNCTION/METHODS -----------------*
*/

/**                                                  /
* @method constructor(config) -----------------*
* @ config "is an object"
*/

var authSchema = function(DataTypes) {
  const data = {};
  data [authSettings.header.database.name] = {
    type: DataTypes.STRING,
    allowNull: false
  };
  return data;
};

var authSettings = {
  header: {
    appAuthID: { name: 'xapp-policy-id', value: 'EmmsDan Bear:: '},
    appAuthUserRequest: 'authorization',
    database: { name: 'xApp_Policy_ID' }
  },
};

module.exports = { authSettings , authSchema };
