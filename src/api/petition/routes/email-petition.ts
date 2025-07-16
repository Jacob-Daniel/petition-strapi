"use strict";

export default {
	type: "content-api", // Specifies this is for the API, not admin panel
	routes: [
		{
			method: "POST",
			path: "/petitions/send-confirmation-email",
			handler: "petition.sendConfirmationEmail",
			config: {
				policies: [],
				middlewares: [],
			},
		},
	],
};
