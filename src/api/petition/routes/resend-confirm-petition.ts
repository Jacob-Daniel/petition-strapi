export default {
	routes: [
		{
			method: "POST",
			path: "/petitions/resend-confirmation",
			handler: "petition.sendConfirmationEmail",
			config: {
				policies: ["admin::isAuthenticatedAdmin"],
			},
		},
	],
};
