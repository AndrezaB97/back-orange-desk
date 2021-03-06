"use strict";

const User = use("App/Models/User");
const { validate } = use("Validator");

class UserController {
  async authData({ auth }) {
    return await auth.getUser();
  }

  async index() {
    let user = await User.query().with("unities").fetch();
    return user;
  }

  async create({ request, response, auth }) {
    const rules = {
      name: "required|string|max:80",
      email: "required|string|max:80|unique:users,email",
      password: "required|confirmed",
    };

    const validation = await validate(request.all(), rules);

    if (validation.fails()) {
      return response.status(400).send(validation.messages());
    }

    const data = request.only(["name", "email", "password"]);

    const user = await User.create(data);

    const token = await auth.attempt(data.email, data.password);

    return token;
  }

  async show({ params }) {
    return User.query().where("slug", params.slug).with("unities").fetch();
  }
}

module.exports = UserController;
