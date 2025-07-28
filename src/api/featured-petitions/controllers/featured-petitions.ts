"use strict";

import { Core } from "@strapi/strapi";

const getFeatured: Core.Controller["get"] = async (ctx) => {
	const tagSlug = ctx.query.tagSlug || null;
	try {
		const petitions = await strapi
			.service("api::featured-petitions.featured-petitions")
			.getFeaturedEvents({ tagSlug });

		ctx.body = petitions;
	} catch (err) {
		ctx.throw(500, "Failed to load featured petitions");
	}
};

export default {
	getFeatured,
};
