"use strict";

import { Core } from "@strapi/strapi";

const userPetitionsService: Core.Service = {
	async getUserPetitions(userId) {
		try {
			console.log(userId, "user");
			const petitions = await strapi
				.documents("api::petition.petition")
				.findMany({
					filters: {
						createdByUser: userId,
					},
				});

			return {
				data: petitions,
				meta: {
					total: petitions.length,
				},
			};
		} catch (error) {
			strapi.log.error("Error fetching user petitions:", error);
			return {
				data: [],
				error: "Unable to fetch user petitions",
			};
		}
	},
};

export default userPetitionsService;
