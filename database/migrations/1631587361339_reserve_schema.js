"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ReserveSchema extends Schema {
  up() {
    this.create("reserves", (table) => {
      table.increments();
      table.integer("user_id");
      table.integer("unity_id");
      table.datetime("date");
      table.integer("desk");
      table.timestamps();
    });
  }

  down() {
    this.drop("reserves");
  }
}

module.exports = ReserveSchema;
