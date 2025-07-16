import type { Core } from '@strapi/strapi';

const register = ({ strapi }: { strapi: Core.Strapi }) => {
	strapi.customFields.register({
		name: 'react-icons-picker',
		plugin: 'react-icons-picker',
		type: 'string',
		inputSize: {
			default: 6,
			isResizable: true,
		},
	});
};

export default register;
