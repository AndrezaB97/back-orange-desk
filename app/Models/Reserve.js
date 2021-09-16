"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Reserve extends Model {
  unity() {
    return this.belongsTo("App/Models/Unity");
  }
}

module.exports = Reserve;
