import Joi from '@hapi/joi';
import { isObject } from '@utils/utils';

export const UUID = Joi.string().guid({
  version: [
    'uuidv4',
    'uuidv5'
  ]
});

export const UUIDV4 = UUID;

export const STRING = Joi.string();

export const ENUM = (array) => Joi.string().trim().valid(array);

export const EMAIL = Joi.string().email();

export const NUMBER = Joi.number();

export const joify = (object, attr = [], usage = null) => {
  if (!isObject(object)) return  ('Not an Object: NaO');

  const newObject = {};
  const use = (typeof attr === 'string') ? attr : usage;
  Object.entries(object).forEach(([key, value]) => {
    if(value.use){
      const name = value.use == use && use?.search('as ') !== -1 ? use?.slice(3) : key;

      if (value.allowNull === false) {
        newObject[name] = (DataTypes[key] || DataTypes[value.type.type]).required();
      } else if(!newObject[name]){
        newObject[name] = DataTypes[key] || DataTypes[value.type.type];
      }

    }
  });
  Array.isArray(attr) && attr.forEach(key => {
    newObject[key[0]] = DataTypes[key[1]].required();
  });
  return newObject;
};

export const DataTypes = {
  'STRING': STRING,
  'string': STRING,
  'UUIDV4': UUID,
  'UUID': UUID,
  'ENUM': ENUM,
  'NUMBER': NUMBER,
  'email': STRING.email(),
  'phone': Joi.number(),
};
