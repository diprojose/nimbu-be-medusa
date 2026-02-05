import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20260120212829 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "post" add column "content" text not null default '';`);
    this.addSql(`alter table "post" alter column "content" drop default;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "post" drop column "content";`);
  }

}
