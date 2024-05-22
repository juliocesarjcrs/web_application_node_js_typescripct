import { Repository } from 'typeorm';
import { Sale } from '../entity/Sale';
import { AppDataSource } from '../data-source';

export class SaleService {
  private saleRepository: Repository<Sale>;

  constructor() {
    this.saleRepository = AppDataSource.getRepository(Sale);
  }

  async createSale(
    products_id: string,
    qty: number,
    users_id: string,
  ): Promise<Sale> {
    const sale = this.saleRepository.create({ products_id, qty, users_id });
    return await this.saleRepository.save(sale);
  }

  async updateSale(
    id: string,
    products_id: string,
    qty: number,
  ): Promise<Sale | null> {
    const sale = await this.saleRepository.findOne({ where: { id } });
    if (!sale) return null;

    sale.products_id = products_id;
    sale.qty = qty;

    return await this.saleRepository.save(sale);
  }

  async deleteSale(id: string): Promise<boolean> {
    const result = await this.saleRepository.delete(id);
    return result.affected !== 0;
  }

  async getAllSales(): Promise<Sale[]> {
    return await this.saleRepository
      .createQueryBuilder('sale')
      .leftJoinAndSelect('sale.product', 'product') // Carga la relación con el producto
      .leftJoinAndSelect('sale.user', 'user') // Carga la relación con el usuario
      .getMany();
  }

  async getTotalSalesValueByDay(date: string): Promise<number> {
    const result = await this.saleRepository
      .createQueryBuilder('sale')
      .leftJoinAndSelect('sale.product', 'product')
      .select('SUM(sale.qty * product.price)', 'total')
      .where('DATE(sale.sale_at) = :date', { date })
      .getRawOne();

    return result?.total ?? 0;
  }

  async getTotalSalesByMonth(year: number, month: number): Promise<number> {
    const monthString = month.toString().padStart(2, '0');

    const startDate = `${year}-${monthString}-01`;
    const endDate = `${year}-${monthString}-31`;

    const result = await this.saleRepository
      .createQueryBuilder('sale')
      .leftJoinAndSelect('sale.product', 'product')
      .select('SUM(sale.qty * product.price)', 'total')
      .where('DATE(sale.sale_at) BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .getRawOne();
    return result?.total ?? 0;
  }
}
