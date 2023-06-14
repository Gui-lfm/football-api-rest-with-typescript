import { IUser } from './IUser';

export interface IUserModel {
  findUser(email: IUser['email']): Promise<IUser | null>;
}
