import express, { Request, NextFunction, Response } from 'express';
import { UserService } from '../services/user.service';
import { RolesEnum } from '../emuns/roles.enum';

const userService = new UserService();
export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const userId = req.headers['auth'] as string;
  if (!userId) {
    res.status(401).send('Unauthorized');
  } else {
    next();
  }
};

export const authorizeRoles = (...allowedRoles: RolesEnum[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.headers['auth'] as string;
    const user = await userService.getUserById(userId);
    if (!user || !allowedRoles.includes(user.role.name)) {
      res.status(403).send('Forbidden');
      return;
    }
    next();
  };
};
