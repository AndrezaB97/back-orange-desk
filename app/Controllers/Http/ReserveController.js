"use strict";

const User = require("../../Models/User");

const { validate } = use("Validator");
const Reserve = use("App/Models/Reserve");
const Desk = use("App/Models/Desk");

class ReserveController {
  async create({ request, auth, response }) {
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

    // mudar status da mesa
    var deskDb = await Desk.query()
      .where("unity_id", data.unity_id)
      .where("number", data.desk)
      .update({ status: false });

    return reserve;
  }

  async myReserves({ auth }) {
    const authUser = await auth.getUser();

    let myReserves = await Reserve.query()
      .where("user_id", authUser.id)
      .with("unity")
      .with("unity.address")
      .fetch();

    return myReserves;
  }

  async test({ request, response }) {
    let image = "./vibrant-blue-butterfly.png";
    return response.send(image);
  }

  async deleteReserve({ params }) {
    const reserve = await Reserve.findOrFail(params.id);
    await reserve.delete();
  }
}

module.exports = ReserveController;
