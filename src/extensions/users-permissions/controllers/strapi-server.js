"use strict";

const { ApplicationError } = require("@strapi/utils").errors;

module.exports = (plugin) => {
  const originalRegister = plugin.controllers.auth.register;

  plugin.controllers.auth.register = async (ctx) => {
    try {
      return await originalRegister(ctx);
    } catch (err) {
      strapi.log.error("Custom register error:", err);

      if (err instanceof ApplicationError) {
        return ctx.badRequest("Email or Username already taken", {
          error: {
            name: "EmailTaken",
            message: err.message,
            status: 400,
          },
        });
      }

      // Optional: handle other types of known errors here
      return ctx.internalServerError("An unknown error occurred", {
        error: {
          name: "UnknownError",
          message: err.message,
          status: 500,
        },
      });
    }
  };

  return plugin;
};
