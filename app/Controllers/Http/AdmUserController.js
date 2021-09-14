"use strict";
const Env = use("Env");

class AdmUserController {
  async authadm({ response, request }) {
    if (request.username == "admin" && request.password == "admin") {
      return response.status(200).send({ access_token: Env.get("ADM_KEY") });
    } else {
      response.status(401).send({ message: "Usuário ou senha incorretos" });
    }
  }
}

module.exports = AdmUserController;
