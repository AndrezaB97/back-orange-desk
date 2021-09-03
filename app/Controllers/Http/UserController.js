"use strict";

const User = use("App/Models/User");
const { validate } = use("Validator");

class UserController {
  async create({ request }) {
    const rules = {
      name: "required|string|max:80",
      description: "required|string|max:80",
      slug: "required|string|max:80",
      type: "required|in:PUBLIC,PRIVATE",
    };

    const validation = await validate(request.all(), rules);

    if (validation.fails()) {
      return validation.messages();
    }

    const data = request.only(["username", "email", "password"]);

    const user = await User.create(data);

    return user;
  }
}

module.exports = UserController;
