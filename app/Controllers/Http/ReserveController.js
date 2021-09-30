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

  async test() {
    return `
    <html style="height: 100%;"><head><meta name="viewport" content="width=device-width, minimum-scale=0.1"><title>vibrant-blue-butterfly.png (1920×1600)</title></head><body style="margin: 0px; background: #0e0e0e; height: 100%" cz-shortcut-listen="true"><img style="-webkit-user-select: none;margin: auto;cursor: zoom-out;background-color: hsl(0, 0%, 90%);transition: background-color 300ms;" src="https://www.publicdomainpictures.net/pictures/290000/velka/vibrant-blue-butterfly.png" width="1920" height="1600"></body></html>
    `;
  }

  async deleteReserve({ params }) {
    const reserve = await Reserve.findOrFail(params.id);
    await reserve.delete();
  }
}

module.exports = ReserveController;
