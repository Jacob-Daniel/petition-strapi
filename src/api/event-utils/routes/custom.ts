// src/api/event-utils/routes/custom.ts
export default {
	type: "content-api", // Use 'content-api' if it's a public route
	routes: [
		{
			method: "GET",
			path: "/event-utils/filtered",
			handler: "custom.getFiltered", // controller file name + method
			config: {
				auth: false,
			},
		},
	],
};
