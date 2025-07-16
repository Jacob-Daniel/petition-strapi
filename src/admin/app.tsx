import type { StrapiApp } from "@strapi/strapi/admin";
import {
	setPluginConfig,
	defaultHtmlPreset,
	defaultMarkdownPreset,
} from "@_sh/strapi-plugin-ckeditor";

export default {
	config: {
		locales: [
			// 'ar',
			// 'fr',
			// 'cs',
			// 'de',
			// 'dk',
			// 'es',
			// 'he',
			// 'id',
			// 'it',
			// 'ja',
			// 'ko',
			// 'ms',
			// 'nl',
			// 'no',
			// 'pl',
			// 'pt-BR',
			// 'pt',
			// 'ru',
			// 'sk',
			// 'sv',
			// 'th',
			// 'tr',
			// 'uk',
			// 'vi',
			// 'zh-Hans',
			// 'zh',
		],
	},
	bootstrap(app: StrapiApp) {
		console.log(app);
	},
	register() {
		setPluginConfig({
			presets: [defaultHtmlPreset, defaultMarkdownPreset],
		});
	},
};
