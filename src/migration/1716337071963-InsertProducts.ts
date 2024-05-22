import { MigrationInterface, QueryRunner } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';
export class InsertProducts1716337071963 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const productsData = fs.readFileSync(
      path.join(__dirname, './products.json'),
      'utf8',
    );
    const products = JSON.parse(productsData);

    for (const product of products) {
      await queryRunner.query(`
                INSERT INTO product (id, name, description, price)
                VALUES ('${product.id}', '${product.name}', '${product.description}', ${product.price})
            `);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
