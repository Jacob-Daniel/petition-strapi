export default {
	async afterCreate(event) {
		try {
			const { result } = event;
			console.log(result, "res");
			if (result.status === "published") {
				const response = await strapi
					.service("api::petition.petition")
					.sendPetitionConfirmation(result.documentId);

				if (!response.success) {
					strapi.log.error("Petition email failed:", response.error);
				}
			} else {
				strapi.log.info(
					`Petition ${result.id} created but not marked as published.`,
				);
			}
		} catch (error) {
			strapi.log.error("afterCreate email send error:", error);
		}
	},
};
