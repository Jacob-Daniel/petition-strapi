import { factories } from "@strapi/strapi";
import type { Core } from "@strapi/strapi";

export default factories.createCoreController(
  "api::page.page",
  ({ strapi }: { strapi: Core.Strapi }) => ({
    async filteredPages(ctx) {
      // Get the excluded slugs from query params or use defaults
      const excludedSlugs = ctx.query.exclude || [
        "home",
        "whats-on",
        "membership",
        "our-story",
        "who-we-are",
        "event",
      ];

      // Sanitize query to ensure security
      const sanitizedQueryParams = await this.sanitizeQuery(ctx);

      // Type assertion to ensure TypeScript knows this is an object
      const existingFilters = (sanitizedQueryParams.filters || {}) as Record<
        string,
        any
      >;

      // Call the service with our custom filter
      const { results, pagination } = await strapi
        .service("api::page.page")
        .find({
          ...sanitizedQueryParams,
          filters: {
            ...existingFilters,
            slug: {
              $notIn: Array.isArray(excludedSlugs)
                ? excludedSlugs
                : [excludedSlugs],
            },
          },
          fields: ["documentId", "slug", "id"],
        });

      // Sanitize the output
      const sanitizedResults = await this.sanitizeOutput(results, ctx);

      // Return the standard response format
      return this.transformResponse(sanitizedResults, { pagination });
    },
  }),
);
