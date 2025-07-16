import { StrapiApp } from '@strapi/strapi/admin';
import { PLUGIN_ID } from './pluginId';
import * as yup from 'yup';
import { AnySchema } from 'yup';

export default {
	register(app: StrapiApp) {
		app.customFields.register({
			name: 'react-icons-picker',
			pluginId: PLUGIN_ID,
			type: 'json',
			options: {
				base: [
					{
						sectionTitle: {
							id: 'react-icons-picker.section.format',
							defaultMessage: 'Format',
						},
						items: [
							{
								intlLabel: {
									id: 'react-icons-picker.icon.label',
									defaultMessage: 'Icon',
									description: 'React Icon Picker',
								},
								description: {
									id: 'react-icons-picker.icon.description', // unique id for description
									defaultMessage: 'The icon name from react-icons', // default message for the description
								},
								name: 'options.icon' as any, // This should match the CustomFieldOptionName type
								type: 'text', // or whatever type is appropriate,
								defaultValue: 'text',
							},
						],
					},
				],
				validator: () => ({
					icon: yup.string().required({
						id: 'options.react-icons-picker.icon.error',
						defaultMessage: 'The icon is required',
					}),
				}),
			},
			intlLabel: {
				id: 'react-icons-picker.label',
				defaultMessage: 'Icon Picker',
			},
			intlDescription: {
				id: 'react-icons-picker.description',
				defaultMessage: 'Select an icon',
			},
			components: {
				Input: async () => {
					const component = await import('./components/ReactIconPicker');
					// Cast the component to any or unknown first to avoid TypeScript errors
					return { default: component.default as any };
				},
			},
		});
	},
};
