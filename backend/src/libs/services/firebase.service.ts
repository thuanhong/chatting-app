import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as CONSTANT from '@src/app/constants.api';
import admin from '@src/main';
import { DecodeToken } from '@src/libs/interface/decode-token.interface';

@Injectable()
export class FirebaseAuthService {
  private getToken(authToken: string): string {
    const match = authToken.match(/^Bearer (.*)$/);
    if (!match || match.length < 2) {
      throw new UnauthorizedException(CONSTANT.INVALID_BEARER_TOKEN);
    }
    return match[1];
  }
  public async authenticate(authToken: string): Promise<DecodeToken> {
    const tokenString = this.getToken(authToken);
    try {
      const decodedToken: admin.auth.DecodedIdToken = await admin
        .auth()
        .verifyIdToken(tokenString);

      const { email, uid, name, picture } = decodedToken;

      return { email, uid, name, picture };
    } catch (err) {
      throw new UnauthorizedException(err.message);
    }
  }
}
