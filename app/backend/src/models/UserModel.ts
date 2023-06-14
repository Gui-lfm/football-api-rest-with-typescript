import SequelizeUsers from '../database/models/SequelizeUsers';
import { IUser } from '../Interfaces/users/IUser';
import { IUserModel } from '../Interfaces/users/IUserModel';

export default class UserModel implements IUserModel {
  private model = SequelizeUsers;

  async findUser(email: string): Promise<IUser | null> {
    const response = await this.model.findOne({ where: { email } });
    if (!response) return null;
    return {
      id: response.id,
      username: response.username,
      role: response.role,
      email: response.role,
      password: response.password,
    };
  }
}
