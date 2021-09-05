"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Unity extends Model {
  user() {
    return this.belongsTo("App/Models/User");
  }

  address() {
    return this.hasOne("App/Models/AddressUnity");
  }
}

module.exports = Unity;
