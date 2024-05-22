import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

export class UserController {
  private userService = new UserService();

  createUser = async (req: Request, res: Response) => {
    const user = await this.userService.createUser(req.body);
    res.send(user);
  };

  getUsers = async (req: Request, res: Response) => {
    const users = await this.userService.getUsers();
    res.send(users);
  };

  getUserById = async (req: Request, res: Response) => {
    const user = await this.userService.getUserById(req.params.id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send('User not found');
    }
  };

  updateUser = async (req: Request, res: Response) => {
    const user = await this.userService.updateUser(req.params.id, req.body);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send('User not found');
    }
  };

  deleteUser = async (req: Request, res: Response) => {
    const success = await this.userService.deleteUser(req.params.id);
    if (success) {
      res.sendStatus(204);
    } else {
      res.status(404).send('User not found');
    }
  };
}
