"use strict";

const { get } = require("@adonisjs/framework/src/Route/Manager");

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.group(() => {
  Route.post("/register_company", "UserController.create");
  Route.post("/sessions", "SessionController.create");
}).prefix("api/v1");

Route.group(() => {
  Route.get("teste", "");
  Route.get("", "");
  Route.post("/unity", "UnityController.create");
  Route.put("", "");
  Route.delete("", "");
})
  .prefix("api/v1")
  .middleware("auth");

// estrutura dos cruds
// Route.group(() => {
//   Route.get("teste", "");
//   Route.get("", "");
//   Route.post("", "");
//   Route.put("", "");
//   Route.delete("", "");
// })
//   .prefix("api/v1")
//   .middleware("auth");
