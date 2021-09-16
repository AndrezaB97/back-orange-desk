"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Unity extends Model {
  address() {
    return this.hasOne("App/Models/AddressUnity");
  }

  desks() {
    return this.hasMany("App/Models/Desk");
  }

  reserve() {
    return this.hasMany("App/Models/Reserve");
  }
}

module.exports = Unity;
