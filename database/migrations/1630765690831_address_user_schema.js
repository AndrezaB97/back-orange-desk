"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AddressUserSchema extends Schema {
  up() {
    this.create("address_users", (table) => {
      table.increments().notNullable();
      table.string("zip_code").notNullable();
      table.string("road").notNullable();
      table.string("district").notNullable();
      table.string("city").notNullable();
      table.string("state").notNullable();
      table.integer("number").notNullable();
      table.integer("user_id").notNullable();
      table.string("complement");
      table.timestamps();
    });
  }

  down() {
    this.drop("address_users");
  }
}

module.exports = AddressUserSchema;
