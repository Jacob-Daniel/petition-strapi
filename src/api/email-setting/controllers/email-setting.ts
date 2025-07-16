"use strict";

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
	"api::email-setting.email-setting",
	({ strapi }) => ({
		async sendTest(ctx) {
			console.log(ctx, "ctx");
			try {
				const { email, input } = ctx.request.body;
				if (!email || !input) {
					return ctx.badRequest("Missing email or input");
				}

				const response = await strapi
					.service("api::email-setting.email-setting")
					.sendTestEmail(email, input);

				return ctx.send(response);
			} catch (error) {
				return ctx.internalServerError(error.message);
			}
		},
	}),
);
