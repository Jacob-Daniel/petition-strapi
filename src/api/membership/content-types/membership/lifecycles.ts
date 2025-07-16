import nodemailer from "nodemailer";

const sendMembershipConfirmation = async (email, details) => {
	console.log(
		process.env.MAIL_USER,
		process.env.DATABASE_HOST,
		process.env.MAIL_HOST,
		"SMPT JD",
	);
	const transporter = nodemailer.createTransport({
		host: process.env.MAIL_HOST,
		port: Number(process.env.MAIL_PORT),
		secure: process.env.MAIL_SSL === "true",
		auth: {
			user: process.env.MAIL_USER,
			pass: process.env.MAIL_PASS,
		},
	});

	const mailOptions = {
		from: process.env.MAIL_FROM,
		to: email,
		subject: "Membership Confirmation",
		text: `Dear ${details.first_name}, your membership is confirmed. Details: ${JSON.stringify(details, null, 2)}`,
		html: `<p>Dear ${details.first_name}, your membership is confirmed.</p><pre>${JSON.stringify(details, null, 2)}</pre>`,
	};

	return transporter.sendMail(mailOptions);
};

export default {
	async afterCreate(event) {
		try {
			const { result } = event;

			const membership = await strapi.entityService.findOne(
				"api::membership.membership",
				result.id,
			);

			if (!membership || !membership.email) {
				strapi.log.warn("Membership created but missing email.");
				return;
			}

			await sendMembershipConfirmation(membership.email, membership);
			strapi.log.info(`Membership confirmation sent to ${membership.email}`);
		} catch (error) {
			strapi.log.error("Error in afterCreate lifecycle:", error);
		}
	},
};
