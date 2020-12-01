import { MigrationInterface, QueryRunner } from "typeorm";

export class createUsersTable1606860594743 implements MigrationInterface {
  name = "createUsersTable1606860594743";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "posts" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "identifier" character varying NOT NULL, "title" character varying NOT NULL, "slug" character varying NOT NULL, "body" text, "subName" character varying NOT NULL, "username" character varying, CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_152316363d20c399f934c4f74b" ON "posts" ("identifier") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_54ddf9075260407dcfdd724857" ON "posts" ("slug") `
    );
    await queryRunner.query(
      `ALTER TABLE "posts" ADD CONSTRAINT "FK_42377e3f89a203ca74d117e5961" FOREIGN KEY ("username") REFERENCES "users"("username") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "posts" DROP CONSTRAINT "FK_42377e3f89a203ca74d117e5961"`
    );
    await queryRunner.query(`DROP INDEX "IDX_54ddf9075260407dcfdd724857"`);
    await queryRunner.query(`DROP INDEX "IDX_152316363d20c399f934c4f74b"`);
    await queryRunner.query(`DROP TABLE "posts"`);
  }
}
