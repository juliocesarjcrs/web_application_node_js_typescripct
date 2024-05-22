import express from 'express';
import { RoleController } from '../controllers/role.controller';
import {
  authenticateUser,
  authorizeRoles,
} from '../middlewares/authenticateUser';
import { RolesEnum } from '../emuns/roles.enum';

const router = express.Router();
const roleController = new RoleController();

router.post(
  '/roles',
  authenticateUser,
  authorizeRoles(RolesEnum.ADMIN),
  roleController.createRole.bind(roleController),
);
router.get('/roles', roleController.getAllRoles.bind(roleController));
router.delete(
  '/roles/:id',
  authenticateUser,
  authorizeRoles(RolesEnum.ADMIN),
  roleController.deleteRole.bind(roleController),
);

export default router;
