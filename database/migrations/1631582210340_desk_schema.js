"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class DeskSchema extends Schema {
  up() {
    this.create("desks", (table) => {
      table.increments();
      table.integer("number");
      table.timestamps();
    });
  }

  down() {
    this.drop("desks");
  }
}

module.exports = DeskSchema;
