import { MigrationInterface, QueryRunner } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';

export class InsertRoles1716327787656 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const rolesData = fs.readFileSync(
      path.join(__dirname, './roles.json'),
      'utf8',
    );
    const roles = JSON.parse(rolesData);

    for (const role of roles) {
      await queryRunner.query(`
                    INSERT INTO role (id, name)
                    VALUES ('${role.id}', '${role.name}')
                `);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "role" WHERE "name" IN ('admin', 'employee', 'everyone')`,
    );
  }
}
