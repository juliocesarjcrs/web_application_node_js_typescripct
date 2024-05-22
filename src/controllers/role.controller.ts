import { Request, Response } from 'express';
import { RoleService } from '../services/role.service';

export class RoleController {
  private roleService = new RoleService();

  async createRole(req: Request, res: Response) {
    try {
      const roleData = req.body;
      const newRole = await this.roleService.createRole(roleData);
      res.status(201).json(newRole);
    } catch (error) {
      res.status(500).send('User not created');
    }
  }

  async getAllRoles(req: Request, res: Response) {
    try {
      const roles = await this.roleService.getAllRoles();
      res.status(200).json(roles);
    } catch (error) {
      res.status(500).send('Error get roles');
    }
  }

  async deleteRole(req: Request, res: Response) {
    const success = await this.roleService.deleteRole(req.params.id);
    if (success) {
      res.sendStatus(204);
    } else {
      res.status(404).send('Role not found');
    }
  }
}
