type Entry = {
	slug?: string;
	[key: string]: any;
};

export const getPathsForContentType = (
	contentTypeUid: string,
	entry: Entry,
): string[] => {
	const slug = entry?.slug;
	const contentType = strapi.contentTypes[contentTypeUid];
	const isSingleType = contentType.kind === "singleType";
	let paths: string[] = [];
	const routeDependencyMap: Record<string, string[]> = {
		"api::tab.tab": ["/", "who-we-are"],
		"api::navigation-item.navigation-item": [
			"/",
			"/membership",
			"/whats-on",
			"/about",
			"/contact",
			"/metronomes",
			"/skate-park",
			"/playhut",
			"/factory-building",
			"/volunteer",
			"/mind",
			"/partnerships",
		],
		"api::price.price": ["/bookings"],
		"api::order.order": ["/bookings"],
		"api::basket.basket": ["/bookings"],
		"api::page.page": ["/" + slug, "/"],
		"api::user.user": ["/bookings"],
		"api::event.event": [
			"/whats-on/" + slug,
			"/",
			"/playhut",
			"/metronomes",
			"/mind",
			"/factory-building",
			"/skate-park",
			"/wildlife-garden",
		],
		"api::organisation.organisation": [
			"/",
			"/membership",
			"/whats-on",
			"/about",
			"/contact",
			"/metronomes",
			"/skate-park",
			"/playhut",
			"/factory-building",
			"/volunteer",
			"/mind",
			"/partnerships",
		],
		"api::person.person": [
			"/",
			"/membership",
			"/whats-on",
			"/about",
			"/contact",
			"/metronomes",
			"/skate-park",
			"/playhut",
			"/factory-building",
			"/volunteer",
			"/mind",
			"/partnerships",
		],
		"api::footer-menu.footer-menu": [
			"/",
			"/membership",
			"/whats-on",
			"/about",
			"/contact",
			"/metronomes",
			"/skate-park",
			"/playhut",
			"/factory-building",
			"/volunteer",
			"/mind",
			"/partnerships",
			,
		],
		"api::footer.footer": [
			"/",
			"/membership",
			"/whats-on",
			"/about",
			"/contact",
			"/metronomes",
			"/skate-park",
			"/playhut",
			"/factory-building",
			"/volunteer",
			"/mind",
			"/partnerships",
		],
		"api::navigation.navigation": [
			"/",
			"/membership",
			"/whats-on",
			"/about",
			"/contact",
			"/metronomes",
			"/skate-park",
			"/playhut",
			"/factory-building",
			"/volunteer",
			"/mind",
			"/partnerships",
		],
		"api::theme-colour.theme-colour": [
			"/",
			"/membership",
			"/whats-on",
			"/about",
			"/contact",
			"/metronomes",
			"/skate-park",
			"/playhut",
			"/factory-building",
			"/volunteer",
			"/mind",
			"/partnerships",
		],
		"api::email-setting.email-setting": [
			"/",
			"/membership",
			"/whats-on",
			"/about",
			"/contact",
			"/metronomes",
			"/skate-park",
			"/playhut",
			"/factory-building",
			"/volunteer",
			"/mind",
			"/partnerships",
		],
	};

	if (isSingleType && slug) {
		paths = [`/${slug}`];
	} else if (routeDependencyMap[contentTypeUid]) {
		paths = routeDependencyMap[contentTypeUid];
	} else {
		const routeName = contentTypeUid.split("::")[1]?.split(".")[0];
		paths = [`/${routeName}`];
	}

	if (!paths.includes("/")) {
		paths.push("/");
	}

	return paths;
};
