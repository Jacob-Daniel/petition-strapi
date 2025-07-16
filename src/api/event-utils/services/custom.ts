export default ({ strapi }) => ({
	async getFilteredEvents(dateParam?: string) {
		try {
			const now = new Date();
			let queryDate = dateParam ? new Date(dateParam) : now;

			// Set to local midnight (00:00:00.000)
			queryDate.setHours(0, 0, 0, 0);

			const filters: any = {};

			if (dateParam) {
				const nextDay = new Date(queryDate);
				nextDay.setDate(nextDay.getDate() + 1);

				filters.start_date = {
					$gte: queryDate, // local start of day
					$lt: nextDay, // local start of next day
				};
			} else {
				filters.start_date = {
					$gte: queryDate,
				};
			}

			const data = await strapi.documents("api::event.event").findMany({
				where: filters,
				orderBy: [{ start_date: "asc" }],
				populate: {
					image: true,
					location: { fields: ["*"] },
				},
				status: "published",
			});

			return {
				data,
				meta: {
					total: data.length,
				},
			};
		} catch (error) {
			console.error("Error fetching filtered events:", error);
			return {
				data: [],
				meta: {
					total: 0,
					error: true,
					message: "Failed to fetch events",
				},
			};
		}
	},
});
