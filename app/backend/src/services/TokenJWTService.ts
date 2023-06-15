import * as jwt from 'jsonwebtoken';
import { TokenGenerator } from '../Interfaces/TokenGenerator';
import { IUser } from '../Interfaces/users/IUser';

export default class TokenJWTService implements TokenGenerator {
  private jwt = jwt;

  generate(user: IUser): string {
    const token = this.jwt.sign(user, process.env.JWT_SECRET || 'jwt_secret');
    return token;
  }

  verify(token: string): string | jwt.JwtPayload {
    const exists = this.jwt.verify(token, process.env.JWT_SECRET || 'jwt_secret');
    return exists;
  }

  decode(token: string): IUser {
    const decoded = this.jwt.decode(token) as IUser;
    return decoded;
  }
}
