import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateDatabase1650190252498 implements MigrationInterface {
  name = 'UpdateDatabase1650190252498';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`roles\` CHANGE \`permistions\` \`permissions\` text NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`role\``);
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`role_id\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`password_backup\` \`password_backup\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`address\` \`address\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`birthday\` \`birthday\` date NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`fullname\` \`fullname\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`phone\` \`phone\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`note\` \`note\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`roles\` CHANGE \`permissions\` \`permissions\` text NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`roles\` CHANGE \`is_can_edit\` \`is_can_edit\` tinyint NOT NULL DEFAULT 1`,
    );
    await queryRunner.query(
      `ALTER TABLE \`roles\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`roles\` CHANGE \`permissions\` \`permissions\` text NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`roles\` CHANGE \`is_can_edit\` \`is_can_edit\` tinyint NOT NULL DEFAULT 1`,
    );
    await queryRunner.query(
      `ALTER TABLE \`roles\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`password_backup\` \`password_backup\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`address\` \`address\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`birthday\` \`birthday\` date NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`fullname\` \`fullname\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`phone\` \`phone\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`note\` \`note\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sessions\` CHANGE \`agent\` \`agent\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sessions\` CHANGE \`ip\` \`ip\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sessions\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sessions\` CHANGE \`agent\` \`agent\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sessions\` CHANGE \`ip\` \`ip\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sessions\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD CONSTRAINT \`FK_a2cecd1a3531c0b041e29ba46e1\` FOREIGN KEY (\`role_id\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_a2cecd1a3531c0b041e29ba46e1\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sessions\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sessions\` CHANGE \`ip\` \`ip\` varchar(255) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sessions\` CHANGE \`agent\` \`agent\` varchar(255) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sessions\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sessions\` CHANGE \`ip\` \`ip\` varchar(255) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sessions\` CHANGE \`agent\` \`agent\` varchar(255) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`note\` \`note\` varchar(255) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`phone\` \`phone\` varchar(255) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`fullname\` \`fullname\` varchar(255) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`birthday\` \`birthday\` date NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`address\` \`address\` varchar(255) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`password_backup\` \`password_backup\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`roles\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`roles\` CHANGE \`is_can_edit\` \`is_can_edit\` tinyint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`roles\` CHANGE \`permissions\` \`permissions\` text NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`roles\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`roles\` CHANGE \`is_can_edit\` \`is_can_edit\` tinyint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`roles\` CHANGE \`permissions\` \`permissions\` text NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`note\` \`note\` varchar(255) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`phone\` \`phone\` varchar(255) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`fullname\` \`fullname\` varchar(255) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`birthday\` \`birthday\` date NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`address\` \`address\` varchar(255) NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`password_backup\` \`password_backup\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\``,
    );
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`role_id\``);
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`role\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`roles\` CHANGE \`permissions\` \`permistions\` text NULL DEFAULT 'NULL'`,
    );
  }
}
