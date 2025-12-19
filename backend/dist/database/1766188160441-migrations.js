"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migrations1766188160441 = void 0;
class Migrations1766188160441 {
    name = 'Migrations1766188160441';
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fullName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "gender" character varying NOT NULL, "active" boolean NOT NULL DEFAULT true, "deleteAt" TIMESTAMP, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "user"`);
    }
}
exports.Migrations1766188160441 = Migrations1766188160441;
//# sourceMappingURL=1766188160441-migrations.js.map