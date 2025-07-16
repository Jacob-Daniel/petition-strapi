"use strict";

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
	"api::petition.petition",
	({ strapi }) => ({
		async create(ctx) {
			const response = await super.create(ctx);

			const bookingId = ctx.request.body.data.booking;

			if (bookingId) {
				const result = strapi.service("api::petition.petition");
				if (!result.success) {
					strapi.log.error("Failed to mark booking as paid");
				}
			}

			return response;
		},
		async sendConfirmationEmail(ctx) {
			try {
				const { petitionDocumentId } = ctx.request.body;

				const result = await strapi
					.service("api::petition.petition")
					.sendPetitionConfirmation(petitionDocumentId);

				if (!result.success) {
					return ctx.badRequest(result.error);
				}

				ctx.send({ message: "Email sent successfully" });
			} catch (error) {
				strapi.log.error("Email sending failed:", error);
				return ctx.internalServerError(
					`Email sending failed: ${error.message}`,
				);
			}
		},
	}),
);
