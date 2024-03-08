import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { config } from '../../../app/config';

@Injectable()
export class CheckUserService {
  constructor() {}

  async createTokenCookie(data: JwtPayload, expiry: string) {
    return sign(data, config.cookieKey, { expiresIn: expiry });
  }

  async verifyTokenCookie(token: string) {
    const payload = verify(token, config.cookieKey);
    if (typeof payload == 'string')
      throw new HttpException(`Token not verified`, HttpStatus.NOT_FOUND);
    if (!payload) {
      throw new HttpException(
        `Code not valid please change`,
        HttpStatus.NOT_FOUND,
      );
    }
    return payload;
  }
}
