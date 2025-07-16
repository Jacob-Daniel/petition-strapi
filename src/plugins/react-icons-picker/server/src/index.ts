import type { Core } from '@strapi/strapi';
import register from './register';

// Define the plugin module type explicitly
type PluginModule = {
	register: (params: { strapi: Core.Strapi }) => void;
};

// Use the explicit type annotation
const serverModule: PluginModule = {
	register,
};

export default serverModule;
