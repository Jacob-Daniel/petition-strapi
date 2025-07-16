export default {
	type: "content-api", // Specifies this is for the API, not admin panel
	routes: [
		{
			method: "POST",
			path: "/memberships/send-confirmation-email",
			handler: "membership.sendConfirmationEmail",
			config: {
				policies: [],
				middlewares: [],
			},
		},
	],
};
