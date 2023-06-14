import { NextFunction, Request, Response } from 'express';

class Validations {
  static validateLogin(req: Request, res: Response, next: NextFunction): Response | void {
    const login = req.body;
    const requiredKeys = ['email', 'password'];
    const notFoundKeys = requiredKeys.find((key) => !(key in login));

    if (notFoundKeys) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    next();
  }
}

export default Validations;
