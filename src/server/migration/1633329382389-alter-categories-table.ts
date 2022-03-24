import { MigrationInterface, QueryRunner } from 'typeorm';

export class alterCategoriesTable1633329382389 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE categories ADD COLUMN category_parent int(255)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // reverts things made in "up" method
    await queryRunner.query(`ALTER TABLE categories DROP COLUMN category_parent`);
  }
}
