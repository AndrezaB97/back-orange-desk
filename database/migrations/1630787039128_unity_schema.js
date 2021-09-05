"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class UnitySchema extends Schema {
  up() {
    this.create("unities", (table) => {
      table.increments();
      table.integer("total_capacity"); // 1000
      table.integer("percent_allowed"); // 30
      table.integer("capacity_allowed"); // 1000 * 0.3
      table.integer("user_id");
      table.timestamps();
    });
  }

  down() {
    this.drop("unities");
  }
}

module.exports = UnitySchema;
