import { MigrationInterface, QueryRunner } from "typeorm";

export class Base1695655131707 implements MigrationInterface {
    name = 'Base1695655131707'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "books" ("id" int NOT NULL IDENTITY(1,1), "ISBN" nvarchar(255), "bookTitle" nvarchar(255), "yearOfPublication" int, "publisher" nvarchar(255), "isActive" bit NOT NULL CONSTRAINT "DF_5a593ac583cbd3b633dd3f88b46" DEFAULT 0, "createdAt" datetime2 NOT NULL CONSTRAINT "DF_bf20a3d4cdb6c6218a4e7c59ae1" DEFAULT getdate(), "updatedAt" datetime2 CONSTRAINT "DF_b68dbacc71f6da16a6403323077" DEFAULT getdate(), "deletedAt" datetime2, CONSTRAINT "UQ_a5dcb40d5802b60362ff72d62d1" UNIQUE ("ISBN"), CONSTRAINT "PK_f3f2f25a099d24e12545b70b022" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" int NOT NULL IDENTITY(1,1), "firstName" nvarchar(255), "lastName" nvarchar(255), "email" nvarchar(255), "sex" tinyint NOT NULL CONSTRAINT "DF_28fe52f2cfc187cc8ada48d5e1e" DEFAULT 0, "age" int, "password" nvarchar(255) NOT NULL, "role" nvarchar(255) NOT NULL CONSTRAINT "DF_ace513fa30d485cfd25c11a9e4a" DEFAULT 'USER', "isActive" bit NOT NULL CONSTRAINT "DF_409a0298fdd86a6495e23c25c66" DEFAULT 0, "createdAt" datetime2 NOT NULL CONSTRAINT "DF_204e9b624861ff4a5b268192101" DEFAULT getdate(), "updatedAt" datetime2 CONSTRAINT "DF_0f5cbe00928ba4489cc7312573b" DEFAULT getdate(), "deletedAt" datetime2, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users_books_books" ("usersId" int NOT NULL, "booksId" int NOT NULL, CONSTRAINT "PK_b8d511491d9455cc79cf593a447" PRIMARY KEY ("usersId", "booksId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b9bbcf2f5d44ae9d0ed1c8f1bd" ON "users_books_books" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ca5d98ba04edb903ab679a01d3" ON "users_books_books" ("booksId") `);
        await queryRunner.query(`ALTER TABLE "users_books_books" ADD CONSTRAINT "FK_b9bbcf2f5d44ae9d0ed1c8f1bd7" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_books_books" ADD CONSTRAINT "FK_ca5d98ba04edb903ab679a01d3e" FOREIGN KEY ("booksId") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`INSERT INTO "users" ("firstName", "lastName", "email", "sex", "age", "password", "role", "isActive", "createdAt", "updatedAt", "deletedAt") VALUES ('john', 'doe', 'admin@mail.com', 0, 34, '$2a$10$wQjkZwLcwBxfWmZuDJBICu7eCfY9Z1A9YQP68Gg.Z3rrrM8XetIF2', 'ADMIN', '1', '2023-09-25 22:28:49.5500000', '2023-09-25 22:28:49.5500000', NULL)`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_books_books" DROP CONSTRAINT "FK_ca5d98ba04edb903ab679a01d3e"`);
        await queryRunner.query(`ALTER TABLE "users_books_books" DROP CONSTRAINT "FK_b9bbcf2f5d44ae9d0ed1c8f1bd7"`);
        await queryRunner.query(`DROP INDEX "IDX_ca5d98ba04edb903ab679a01d3" ON "users_books_books"`);
        await queryRunner.query(`DROP INDEX "IDX_b9bbcf2f5d44ae9d0ed1c8f1bd" ON "users_books_books"`);
        await queryRunner.query(`DROP TABLE "users_books_books"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "books"`);
    }

}
