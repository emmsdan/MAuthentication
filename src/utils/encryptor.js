import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { getEnv } from '@utils/utils';

class EncryptorStrategyClass {
  constructor(passCode=null){
    this.___SECRET_CYPHER_CODE = passCode || getEnv('___SECRET_CYPHER_CODE');
    this.__algorithm = 'aes-192-cbc';
    this.__salt = 7;
  }

  cypher(data) {
    const key = crypto.createCipher('aes-128-cbc', '123c');
    let cyString = key.update(data, 'utf8', 'hex');
    cyString += key.final('hex');
    this.__cypherString = cyString;
    this.__key = key;
    return cyString;
  }

  async hash(stringValue) {
    const salt = await this.__generateSalt();
    this.__hash = await bcrypt.hash(stringValue, salt);
    return this.__hash;
  }

  async compare(rawStr, hashedStr) {
    const strictEqual = await bcrypt.compare(rawStr, hashedStr);
    return strictEqual;
  }

  async __generateSalt(){
    this.__ =  await bcrypt.genSalt(this.__salt);
    return this.__;
  }
}
const EncryptorStrategy = new EncryptorStrategyClass();
module.exports = EncryptorStrategy;
