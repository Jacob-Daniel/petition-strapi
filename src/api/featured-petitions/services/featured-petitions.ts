"use strict";

import { Core } from "@strapi/strapi";

const featuredEventsService: Core.Service = {
	async getFeaturedEvents() {
		try {
			const eventpage = await strapi.documents("api::page.page").findOne({
				documentId: "yk00itwc53zlmq6b0dave6r2",
				populate: { sections: true },
			});

			const sections = eventpage?.sections ?? [];

			const featuredSection = sections.find(
				(section) => section.__component === "layout.featured",
			)as {
			  __component: "layout.featured";
			  id: number;
			  heading?: string;
			  bg_colour?: string | null;
			  content?: any[];
			  number_to_display?: number;
			} | undefined;
			
			if(!featuredSection) return null

			const number = featuredSection.number_to_display ?? 0;
		console.log(featuredSection,'feat')

			const events = await strapi.documents("api::petition.petition").findMany({
				// sort: { start_date: "asc" },
				limit: number,
				populate: {
					image: true,
					// location: { fields: ["slug", "summary"] },
				},
			});

			return {
				data: events,
				meta: {
					total: events.length,
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
