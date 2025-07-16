export default {
	routes: [
		{
			method: "GET",
			path: "/tags",
			handler: "tag.find",
			config: {
				policies: [],
			},
		},
		{
			method: "GET",
			path: "/tags/:id",
			handler: "tag.findOne",
			config: {
				policies: [],
			},
		},
	],
};
