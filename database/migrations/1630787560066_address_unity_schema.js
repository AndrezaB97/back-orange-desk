"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AddressUnitySchema extends Schema {
  up() {
    this.create("address_unities", (table) => {
      table.increments();
      table.integer("unity_id");
      table.string("zip_code").notNullable();
      table.string("road").notNullable();
      table.string("district").notNullable();
      table.string("city").notNullable();
      table.string("state").notNullable();
      table.integer("number").notNullable();
      table.string("complement");
      table.timestamps();
    });
  }

  down() {
    this.drop("address_unities");
  }
}

module.exports = AddressUnitySchema;
