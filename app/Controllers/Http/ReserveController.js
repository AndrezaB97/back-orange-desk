"use strict";

const User = require("../../Models/User");

const { validate } = use("Validator");
const Reserve = use("App/Models/Reserve");

class ReserveController {
  async create({ request, auth, response }) {
    // table.integer("user_id");
    // table.integer("unity_id");
    // table.date("date");
    // table.integer("desk");
    const rules = {
      unity_id: "required|integer",
      date: "required|date",
      desk: "required|integer",
    };

    const validation = await validate(request.all(), rules);

    if (validation.fails()) {
      return response.status(400).send(validation.messages());
    }

    const data = request.only(["unity_id", "date", "desk"]);

    const authUser = await auth.getUser();

    data.user_id = authUser.id;

    var reserve = await Reserve.create(data);

    return reserve;
  }
}

module.exports = ReserveController;
