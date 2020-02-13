const fs = require('fs');
const path = require('path');

const entities = {};
const basename = path.basename(__filename);

fs.readdirSync(__dirname)
  .filter((file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
  .forEach(file => {
    const schema = require('./' + file);
    entities[schema.name] = schema;
  });

module.exports =  entities;
