import jwt from 'jsonwebtoken';

import { getEnv } from '@utils/utils';
import settings from '@global_settings';

class JWTStrategyClass {
  constructor() {
    this.__privateKey = getEnv('SECURITY_KEY_EMMSDAN');
  }
  async sign(payload) {
    this.__expiresIn = settings.securityKey.expiresIn;
    this.__token = jwt.sign(payload, this.__privateKey,  { expiresIn: '30h' });
    return this.__token;
  }
  async verify(token) {
    return await jwt.verify(token, this.__privateKey);
  }
  async decode(token){
    return jwt.decode(token, {complete: true});
  }
}

export const JWTStrategy = new JWTStrategyClass();
