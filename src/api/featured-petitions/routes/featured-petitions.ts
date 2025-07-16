const featuredEvents = {
	routes: [
		{
			method: "GET",
			path: "/featured-petitions",
			handler: "featured-petitions.getFeatured",
			config: {
				auth: false, // or true if you want auth
				// type: "content-api",
			},
		},
	],
};
export default featuredEvents;
