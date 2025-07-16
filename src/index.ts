import { getPathsForContentType } from "./utils/routes";
import { revalidateISR } from "./services/revalidation";

import type { Core } from "@strapi/strapi";

export default {
	register({ strapi }: { strapi: Core.Strapi }) {
		Object.keys(strapi.contentTypes).forEach((contentTypeUid) => {
			strapi.db.lifecycles.subscribe({
				models: [contentTypeUid],

				async afterCreate(event) {
					// if (contentTypeUid === "api::season.season") {
					// 	await handleSeasonCreation(event);
					// }
					const { result } = event;
					const paths = getPathsForContentType(contentTypeUid, result);
					console.log(
						`Revalidating paths for (updated test) ${contentTypeUid}:`,
						paths,
					); // Add logging here
					await revalidateISR(paths);
				},

				async afterUpdate(event) {
					// if (contentTypeUid === "api::season.season") {
					// 	await handleSeasonUpdate(event);
					// }
					const { result } = event;
					const paths = getPathsForContentType(contentTypeUid, result);
					await revalidateISR(paths);
				},

				async afterDelete(event) {
					const { result } = event;
					const paths = getPathsForContentType(contentTypeUid, result);
					await revalidateISR(paths);
				},
			});
		});
	},
};
