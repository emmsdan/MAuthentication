import jwt from 'jsonwebtoken';

import { getEnv } from '@utils/utils';
import settings from '@global_settings';

class JWTStrategyClass {
  async sign(payload) {
    this.__privateKey = getEnv('SECURITY_KEY_EMMSDAN');
    this.__expiresIn = settings.securityKey.expiresIn;
    this.__token = jwt.sign(payload, this.__privateKey,  { expiresIn: 60 * 60 });
    return this.__token;
  }
  async verify(token) {
    return await jwt.verify(token, this.__privateKey, { algorithms: ['RS256'] });
  }
  async decode(token){
    return jwt.decode(token, {complete: true});
  }
}

export const JWTStrategy = new JWTStrategyClass();
