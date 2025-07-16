"use strict";

import { Core } from "@strapi/strapi";

const getUserPetitions: Core.Controller["get"] = async (ctx) => {
	const user = ctx.state.user;

	if (!user) {
		return ctx.unauthorized("You must be logged in to view your petitions.");
	}

	try {
		const petitions = await strapi
			.service("api::user-petitions.user-petitions")
			.getUserPetitions(user.id);

		ctx.body = petitions;
	} catch (err) {
		ctx.throw(500, "Failed to load user petitions");
	}
};

export default {
	getUserPetitions,
};
