import * as jwt from 'jsonwebtoken';
import { TokenGenerator } from '../Interfaces/TokenGenerator';
import { IUser } from '../Interfaces/users/IUser';

export default class TokenJWTService implements TokenGenerator {
  private jwt = jwt;

  generate(user: IUser): string {
    const token = this.jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'jwt_secret');
    return token;
  }
}
