import { Request, Response } from 'express';
import { SaleService } from '../services/sale.service';

export class SaleController {
  private saleService = new SaleService();

  async createSale(req: Request, res: Response) {
    const { products_id, qty, users_id } = req.body;
    try {
      const sale = await this.saleService.createSale(
        products_id,
        qty,
        users_id,
      );
      res.status(201).json(sale);
    } catch (error) {
      res.status(500).json({ message: 'Error creating sale' });
    }
  }

  async updateSale(req: Request, res: Response) {
    const { id } = req.params;
    const { products_id, qty } = req.body;
    try {
      const updatedSale = await this.saleService.updateSale(
        id,
        products_id,
        qty,
      );
      if (!updatedSale)
        return res.status(404).json({ message: 'Sale not found' });
      res.json(updatedSale);
    } catch (error) {
      res.status(500).json({ message: 'Error updating sale' });
    }
  }

  async deleteSale(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const result = await this.saleService.deleteSale(id);
      if (!result) return res.status(404).json({ message: 'Sale not found' });
      res.json({ message: 'Sale deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting sale' });
    }
  }

  async getAllSales(req: Request, res: Response) {
    try {
      const sales = await this.saleService.getAllSales();
      res.json(sales);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching sales' });
    }
  }
  async getTotalSalesValueByDay(req: Request, res: Response) {
    const { date } = req.params;
    try {
      const total = await this.saleService.getTotalSalesValueByDay(date);
      res.json({ total });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching total sales value' });
    }
  }

  async getTotalSalesByMonth(req: Request, res: Response) {
    const { year, month } = req.params;

    const yearNum = parseInt(year, 10);
    const monthNum = parseInt(month, 10);

    if (isNaN(yearNum) || isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
      return res.status(400).json({ message: 'Invalid year or month' });
    }

    try {
      const total = await this.saleService.getTotalSalesByMonth(
        yearNum,
        monthNum,
      );
      res.json({ total });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching total sales value' });
    }
  }
}
