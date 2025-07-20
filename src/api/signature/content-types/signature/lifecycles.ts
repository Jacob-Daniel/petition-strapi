// import nodemailer from "nodemailer";

// const sendSignatureConfirmation = async (email, details) => {
// 	console.log(
// 		process.env.MAIL_USER,
// 		process.env.DATABASE_HOST,
// 		process.env.MAIL_HOST,
// 		"SMPT JD",
// 	);
// 	const transporter = nodemailer.createTransport({
// 		host: process.env.MAIL_HOST,
// 		port: Number(process.env.MAIL_PORT),
// 		secure: process.env.MAIL_SSL === "true",
// 		auth: {
// 			user: process.env.MAIL_USER,
// 			pass: process.env.MAIL_PASS,
// 		},
// 	});

// 	const mailOptions = {
// 		from: process.env.MAIL_FROM,
// 		to: email,
// 		subject: "Signature Confirmation",
// 		text: `Dear ${details.first_name}, your Signature is confirmed. Details: ${JSON.stringify(details, null, 2)}`,
// 		html: `<p>Dear ${details.first_name}, your Signature is confirmed.</p><pre>${JSON.stringify(details, null, 2)}</pre>`,
// 	};

// 	return transporter.sendMail(mailOptions);
// };

export default {
	async afterCreate(event) {
		const { result } = event;

		try {
			const petition = await strapi.db.query("api::petition.petition").findOne({
				where: {
					documentId: result?.petitionId || result.petitionId, // Handle both relation formats
				},
				select: ["documentId", "signatures_count"],
			});

			if (petition) {
				await strapi.db.query("api::petition.petition").update({
					where: { documentId: petition.documentId },
					data: {
						signatures_count: (petition.signatures_count || 0) + 1,
					},
				});
			}
		} catch (err) {
			strapi.log.error("Failed to update signatures count:", err);
		}

		// try {
		// 	const signature = await strapi.entityService.findOne(
		// 		"api::signature.signature",
		// 		result.id,
		// 	);

		// 	if (!signature || !signature.email) {
		// 		strapi.log.warn("Signature created but missing email.");
		// 		return;
		// 	}

		// 	await sendSignatureConfirmation(signature.email, signature);
		// 	strapi.log.info(`Signature confirmation sent to ${signature.email}`);
		// } catch (error) {
		// 	strapi.log.error("Error in afterCreate lifecycle:", error);
		// }
	},
};
