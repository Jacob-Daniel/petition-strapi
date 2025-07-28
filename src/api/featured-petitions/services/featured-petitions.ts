"use strict";

import { Core } from "@strapi/strapi";

const featuredEventsService: Core.Service = {
	async getFeaturedEvents({ tagSlug }: { tagSlug?: string }) {
		try {
			const homepage = await strapi.documents("api::page.page").findOne({
				documentId: "yk00itwc53zlmq6b0dave6r2",
				populate: { sections: true },
			});

			const sections = homepage?.sections ?? [];

			const featuredSection = sections.find(
				(section) => section.__component === "layout.featured",
			) as
				| {
						__component: "layout.featured";
						id: number;
						heading?: string;
						bg_colour?: string | null;
						content?: any[];
						number_to_display?: number;
				  }
				| undefined;

			if (!featuredSection) return null;

			const number = featuredSection.number_to_display ?? 0;

			const filters = tagSlug
				? { tags: { slug: { $eq: tagSlug } } }
				: undefined;

			const petitions = await strapi
				.documents("api::petition.petition")
				.findMany({
					filters,
					limit: number,
					populate: {
						image: true,
					},
				});

			return {
				data: petitions,
				meta: {
					total: petitions.length,
				},
			};
		} catch (error) {
			strapi.log.error("Error fetching featured petitions:", error);
			return {
				data: [],
				error: "Unable to fetch featured petitions",
			};
		}
	},
};

export default featuredEventsService;
