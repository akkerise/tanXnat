import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserRefactoring1649312311756 implements MigrationInterface {
  name = 'UserRefactoring1649312311756';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`roles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`slug\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`permistions\` text NULL, \`is_can_edit\` tinyint NOT NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`create_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`sessions\` (\`id\` int NOT NULL AUTO_INCREMENT, \`user_id\` varchar(255) NOT NULL, \`agent\` varchar(255) NULL, \`ip\` varchar(255) NULL, \`token\` varchar(255) NOT NULL, \`refresh_token\` varchar(255) NOT NULL, \`create_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`users\` (\`id\` varchar(36) NOT NULL, \`username\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`password\` varchar(255) NOT NULL, \`role\` varchar(255) NOT NULL, \`password_backup\` varchar(255) NOT NULL, \`address\` varchar(255) NULL, \`birthday\` date NULL, \`fullname\` varchar(255) NULL, \`phone\` varchar(255) NULL, \`note\` varchar(255) NULL, \`create_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_fe0bb3f6520ee0469504521e71\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_fe0bb3f6520ee0469504521e71\` ON \`users\``,
    );
    await queryRunner.query(`DROP TABLE \`users\``);
    await queryRunner.query(`DROP TABLE \`sessions\``);
    await queryRunner.query(`DROP TABLE \`roles\``);
  }
}
