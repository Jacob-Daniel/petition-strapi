"use strict";

import { Core } from "@strapi/strapi";

const getFeatured: Core.Controller["get"] = async (ctx) => {
	try {
		const petitions = await strapi
			.service("api::featured-petitions.featured-petitions")
			.getFeaturedEvents();

		ctx.body = petitions;
	} catch (err) {
		ctx.throw(500, "Failed to load featured petitions");
	}
};

export default {
	getFeatured,
};
