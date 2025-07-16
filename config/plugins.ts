export default ({
	env,
}: {
	env: (
		key: string,
		defaultValue?: string,
	) => string | number | boolean | string[];
}) => {
	// Helper functions for parsing environment variables
	const parseIntEnv = (key: string, defaultValue: number): number => {
		const value = env(key);
		return value !== undefined ? parseInt(value as string, 10) : defaultValue;
	};

	const parseBoolEnv = (key: string, defaultValue: boolean): boolean => {
		const value = env(key);
		return value !== undefined ? value === "true" : defaultValue;
	};

	return {
		"webp-converter": {
			enabled: true,
			config: {},
		},
		seo: {
			enabled: true,
		},
		"react-icons-picker": {
			enabled: true,
			resolve: "./src/plugins/react-icons-picker",
		},
		"strapi-analytics": {
			enabled: false,
		},
		"file-system": {
			enabled: true,
		},
		"users-permissions": {
			enabled: true,
			config: {
				register: {
					allowedFields: ["mobile"],
				},
			},
		},
		"video-field": {
			enabled: true,
		},
		email: {
			config: {
				provider: "nodemailer",
				providerOptions: {
					host: env("MAIL_HOST") as string,
					port: parseIntEnv("MAIL_PORT", 587),
					secure: parseBoolEnv("MAIL_SSL", false),
					auth: {
						user: env("MAIL_USER") as string,
						pass: env("MAIL_PASS") as string,
					},
				},
				settings: {
					defaultFrom: env("MAIL_EMAIL", "noreply@strapiadmin.co.uk") as string,
					defaultReplyTo: env(
						"MAIL_EMAIL",
						"noreply@strapiadmin.co.uk",
					) as string,
				},
			},
		},
	};
};
