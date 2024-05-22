import { Router } from 'express';
import { SaleController } from '../controllers/sale.controller';
import {
  authenticateUser,
  authorizeRoles,
} from '../middlewares/authenticateUser';
import { RolesEnum } from '../emuns/roles.enum';

const router = Router();
const saleController = new SaleController();

router.post('/sales', saleController.createSale.bind(saleController));
router.put(
  '/sales/:id',
  authenticateUser,
  authorizeRoles(RolesEnum.ADMIN),
  saleController.updateSale.bind(saleController),
);
router.delete(
  '/sales/:id',
  authenticateUser,
  authorizeRoles(RolesEnum.ADMIN),
  saleController.deleteSale.bind(saleController),
);
router.get('/sales', saleController.getAllSales.bind(saleController));
router.get(
  '/sales/total/:date',
  authenticateUser,
  authorizeRoles(RolesEnum.ADMIN),
  saleController.getTotalSalesValueByDay.bind(saleController),
);
router.get(
  '/sales/total/:year/:month',
  authenticateUser,
  authorizeRoles(RolesEnum.ADMIN),
  saleController.getTotalSalesByMonth.bind(saleController),
);

export default router;
