"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class AddressUnity extends Model {
  unity() {
    return this.belongsTo("App/Models/Unity");
  }
}

module.exports = AddressUnity;
