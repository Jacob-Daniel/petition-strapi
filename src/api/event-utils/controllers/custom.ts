// src/api/event-utils/controllers/custom.ts
export default {
	async getFiltered(ctx) {
		try {
			const { date } = ctx.query;
			const events = await strapi
				.service("api::event-utils.custom")
				.getFilteredEvents(date);

			ctx.body = events;
		} catch (error) {
			strapi.log.error("Error in getFiltered:", error);
			ctx.body = { error: "Unable to fetch filtered events" };
		}
	},
};
