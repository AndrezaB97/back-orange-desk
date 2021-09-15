"use strict";

const Reserve = use("App/Models/Reserve");
const Unity = use("App/Models/Unity");
const { validate } = use("Validator");

class DeskController {
  async deskAvailable({ request, response }) {
    const rules = {
      unity_id: "required|integer",
      date: "required|date",
    };

    const validation = await validate(request.all(), rules);

    if (validation.fails()) {
      return response.status(400).send(validation.messages());
    }

    const data = request.only(["unity_id", "date"]);

    let numDesk = await Reserve.query()
      .where("unity_id", data.unity_id)
      .where("date", "=", data.date)
      .count();

    let unity = await Unity.find(data.unity_id);

    let result = (await unity.capacity_allowed) - numDesk[0].count;

    return { number: result };
  }

  async desksAvailableNumber({ request, response }) {
    const rules = {
      unity_id: "required|integer",
      date: "required|date",
    };

    const validation = await validate(request.all(), rules);

    if (validation.fails()) {
      return response.status(400).send(validation.messages());
    }

    const data = request.only(["unity_id", "date"]);

    const deskInUse = await Reserve.query()
      .where("date", "=", data.date)
      .where("unity_id", data.unity_id)
      .fetch();

    let desks = [];
    for (let i = 1; i <= 40; i++) {
      desks.push(i);
    }

    let indexes = [];
    await Object.keys(deskInUse.rows).forEach((key) => {
      const index = desks.indexOf(deskInUse.rows[key].$attributes.desk);

      indexes.push(index);
    });

    for (let i = 0; i < indexes.length; i++) {
      for (let j = 0; j < desks.length; j++) {
        if (indexes[i] == desks[j]) {
          desks.splice(i, 1);
        }
      }
    }

    return desks;
  }
}

module.exports = DeskController;
