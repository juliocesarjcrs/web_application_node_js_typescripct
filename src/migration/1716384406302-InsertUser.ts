import { MigrationInterface, QueryRunner } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';
export class InsertUser1716384406302 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const usersData = fs.readFileSync(
      path.join(__dirname, './users.json'),
      'utf8',
    );
    const users = JSON.parse(usersData);

    for (const user of users) {
      await queryRunner.query(`
                    INSERT INTO user (id, document, name, last_name, roles_id)
                    VALUES ('${user.id}', '${user.document}', '${user.name}', '${user.last_name}', '${user.role_id}')
                `);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
