"use strict";

const User = use("App/Models/User");
const AddressUser = use("App/Models/AddressUser");
const { validate } = use("Validator");

class UserController {
  async create({ request }) {
    const rules = {
      slug: "required|string|max:80|unique:users,slug",
      username: "required|string|max:80|unique:users,username",
      email: "required|email|unique:users,email",
      password: "required|confirmed",
      phone: "required|string|unique:users,phone",
      "address.zip_code": "required|min:9",
      "address.road": "required|string|max:255",
      "address.district": "required|string|max:255",
      "address.city": "required|string|max:255",
      "address.state": "required|string|max:255",
      "address.number": "required|integer",
      "address.complement": "string|max:255",
    };

    const validation = await validate(request.all(), rules);

    if (validation.fails()) {
      return validation.messages();
    }

    const data = request.only([
      "slug",
      "username",
      "email",
      "password",
      "phone",
    ]);

    const user = await User.create(data);

    var addressData = request.all().address;

    addressData.user_id = user.id;

    user.address = await AddressUser.create(addressData);

    return user;
  }
}

module.exports = UserController;
