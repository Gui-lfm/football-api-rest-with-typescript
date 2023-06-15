import * as jwt from 'jsonwebtoken';
import { IUser } from './users/IUser';

export interface TokenGenerator {
  generate(user: IUser): string
  verify(token: string): string | jwt.JwtPayload
}
