export default {
	routes: [
		{
			method: "GET",
			path: "/targets",
			handler: "target.find",
			config: {
				policies: [],
			},
		},
		{
			method: "GET",
			path: "/targets/:id",
			handler: "target.findOne",
			config: {
				policies: [],
			},
		},
	],
};
