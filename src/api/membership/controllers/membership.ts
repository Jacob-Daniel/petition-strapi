import nodemailer from "nodemailer";
import { errors } from "@strapi/utils";
const { ApplicationError } = errors;
import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::membership.membership", {
	async create(ctx) {
		try {
			const { email } = ctx.request.body.data;

			const existingMember = await strapi.db
				.query("api::membership.membership")
				.findOne({
					where: { email, publishedAt: { $notNull: true } },
				});

			if (existingMember) {
				throw new ApplicationError("Membership Email already exists", {
					field: "email",
					code: "duplicate",
				});
			}

			const response = await strapi.entityService.create(
				"api::membership.membership",
				{
					data: ctx.request.body.data,
				},
			);

			ctx.send(response);
		} catch (error) {
			if (error instanceof ApplicationError) {
				ctx.status = 400; // Bad Request
				ctx.send({
					error: {
						status: ctx.status,
						name: error.name,
						message: error.message,
						details: error.details || {},
					},
				});
			} else {
				strapi.log.error("Error in create controller:", error);
				ctx.status = 500; // Internal Server Error
				ctx.send({
					error: {
						status: 500,
						name: "InternalServerError",
						message: "An unexpected error occurred.",
					},
				});
			}
		}
	},
	async afterCreate(event) {
		console.log("start after created");
		try {
			const { result } = event;
			const membership = await strapi.entityService.findOne(
			  "api::membership.membership",
			  result.id,
			);
			if (!membership || !membership.email) {
				strapi.log.warn("membership created but missing details or user info.");
				return;
			}
			const { email } = membership;
			const details = membership;
			await sendMembershipConfirmation(email, membership);
			strapi.log.info(`Membership confirmation sent to ${email}`);
		} catch (error) {
			strapi.log.error("Error sending confirmation email:", error);
		}
	},
	async sendConfirmationEmail(ctx) {
		try {
			const { orderDocumentId } = ctx.request.body;

			const result = await strapi
				.service("api::membership.membership")
				.sendMembershipConfirmation(orderDocumentId);

			if (!result.success) {
				return ctx.badRequest(result.error);
			}

			ctx.send({ message: "Email sent successfully" });
		} catch (error) {
			strapi.log.error("Email sending failed:", error);
			return ctx.internalServerError(`Email sending failed: ${error.message}`);
		}
	},
});

const sendMembershipConfirmation = async (email, details) => {
	const transporter = nodemailer.createTransport({
		host: process.env.SMTP_HOST,
		port: Number(process.env.SMTP_PORT),
		secure: process.env.SMTP_SECURE === "true",
		auth: {
			user: process.env.SMTP_USER,
			pass: process.env.SMTP_PASS,
		},
	});

	const mailOptions = {
		from: process.env.SMTP_FROM,
		to: email,
		subject: "Membership Confirmation",
		text: `Dear ${details.first_name}, your membership is confirmed. Details: ${JSON.stringify(details, null, 2)}`,
		html: `<p>Dear ${details.first_name}, your membership is confirmed.</p><pre>${JSON.stringify(details, null, 2)}</pre>`,
	};

	return transporter.sendMail(mailOptions);
};
