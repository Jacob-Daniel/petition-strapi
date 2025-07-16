export default {
	type: "content-api",
	routes: [
		{
			method: "POST",
			path: "/signature/send-confirmation-email",
			handler: "signature.sendConfirmationEmail",
			config: {
				policies: [],
				middlewares: [],
			},
		},
	],
};
