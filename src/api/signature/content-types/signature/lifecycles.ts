export default {
	async afterCreate(event) {
		const { result } = event;

		try {
			const fullEntry = await strapi.db
				.query("api::signature.signature")
				.findOne({
					where: { id: result.id },
					populate: { petitions: true },
				});

			const petition = fullEntry.petitions?.[0]; // assuming one petition per signature for now

			if (petition) {
				await strapi.db.query("api::petition.petition").update({
					where: { id: petition.id },
					data: {
						signaturesCount: (petition.signaturesCount || 0) + 1,
						last_signature: new Date().toISOString(),
					},
				});
				strapi.log.info("Updated petition signature count");
			} else {
				strapi.log.warn("No petition found for signature", result.id);
			}
		} catch (err) {
			strapi.log.error("Failed to update petition signature count:", err);
		}
	},
};
