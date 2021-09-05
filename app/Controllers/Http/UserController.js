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

    return user;
  }
}

module.exports = UserController;
