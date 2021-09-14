"use strict";

const Unity = use("App/Models/Unity");
const AddressUnity = use("App/Models/AddressUnity");
const { validate } = use("Validator");

class UnityController {
  async index() {
    return Unity.query().with("address").fetch();
  }

  async create({ auth, response, request }) {
    const rules = {
      total_capacity: "required|integer",
      percent_allowed: "required|integer",
      capacity_allowed: "required|integer",
      is_main: "required|boolean",
      "address.zip_code": "required|string|min:9",
      "address.road": "required|string|max:200",
      "address.district": "required|string|max:200",
      "address.city": "required|string|max:200",
      "address.state": "required|string|max:200",
      "address.number": "required|integer",
      "address.complement": "required|string|max:200",
    };

    const validation = await validate(request.all(), rules);

    if (validation.fails()) {
      return validation.messages();
    }

    var unityData = request.only([
      "total_capacity",
      "percent_allowed",
      "capacity_allowed",
      "is_main",
    ]);

    const unity = await Unity.create(unityData);

    var addressData = request.all().address;

    addressData.unity_id = unity.id;

    const address = await AddressUnity.create(addressData);

    unity.address = address;

    return unity;
  }

  async show({ params }) {
    return Unity.query().where("id", params.id).with("address").first();
  }
}

module.exports = UnityController;
