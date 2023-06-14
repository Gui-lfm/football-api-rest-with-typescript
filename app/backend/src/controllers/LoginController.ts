import { Request, Response } from 'express';
import LoginService from '../services/LoginService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class LoginController {
  constructor(
    private loginService = new LoginService(),
  ) {}

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const serviceResponse = await this.loginService.login(email, password);
    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }

    res.status(200).json(serviceResponse.data);
  }
}
