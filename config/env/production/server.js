module.exports = ({ env }) => ({
	host: env("HOST", "0.0.0.0"),
	port: env.int("PORT"),
	url: env("PUBLIC_URL", "https://mgcontrol.jacobdaniel.co.uk"),
	app: {
		keys: env.array("APP_KEYS"),
		apiTokenSalt: env("API_TOKEN_SALT"),
		adminJwtSecret: env("ADMIN_JWT_SECRET"),
		transferTokenSalt: env("TRANSFER_TOKEN_SALT"),
		jwtSecret: env("JWT_SECRET"),

		// User API token
		strapiUserApiToken: env("STRAPI_USER_API_TOKEN"),

		// Additional environment variables
		strapiApiUser: env("STRAPI_API_USER"),
		strapiApiUserPwd: env("STRAPI_API_USER_PWD"),
		strapiUserId: env("STRAPI_USER_ID"),
	},
	webhooks: {
		populateRelations: env.bool("WEBHOOKS_POPULATE_RELATIONS", false),
	},
});
