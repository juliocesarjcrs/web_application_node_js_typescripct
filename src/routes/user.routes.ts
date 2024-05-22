import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import {
  authenticateUser,
  authorizeRoles,
} from '../middlewares/authenticateUser';
import { RolesEnum } from '../emuns/roles.enum';

const router = Router();
const userController = new UserController();

router.post(
  '/users',
  authenticateUser,
  authorizeRoles(RolesEnum.ADMIN),
  userController.createUser,
);
router.get('/users', userController.getUsers);
router.get(
  '/users/:id',
  authenticateUser,
  authorizeRoles(RolesEnum.ADMIN, RolesEnum.EMPLOYEE, RolesEnum.EVERYONE),
  userController.getUserById,
);
router.put(
  '/users/:id',
  authenticateUser,
  authorizeRoles(RolesEnum.ADMIN, RolesEnum.EMPLOYEE),
  userController.updateUser,
);
router.delete(
  '/users/:id',
  authenticateUser,
  authorizeRoles(RolesEnum.ADMIN),
  userController.deleteUser,
);

export default router;
