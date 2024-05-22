import { Request, Response } from 'express';
import { ProductService } from '../services/product.service';

export class ProductController {
  private productService = new ProductService();

  async createProduct(req: Request, res: Response) {
    try {
      const product = await this.productService.createProduct(req.body);
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ message: 'Error creating product' });
    }
  }

  async getProducts(req: Request, res: Response) {
    try {
      const products = await this.productService.getProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching products' });
    }
  }

  deleteProduct = async (req: Request, res: Response) => {
    const success = await this.productService.deleteProduct(req.params.id);
    if (success) {
      res.sendStatus(204);
    } else {
      res.status(404).send('User not found');
    }
  };
}
