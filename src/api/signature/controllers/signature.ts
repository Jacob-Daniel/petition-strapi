import nodemailer from "nodemailer";
import { errors } from "@strapi/utils";
const { ApplicationError } = errors;
import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::signature.signature", {
	async create(ctx) {
		try {
			const { email, petition } = ctx.request.body.data;
			const petitionDocumentId = petition?.connect?.documentId;

			if (!petitionDocumentId) {
				return ctx.badRequest("Petition documentId is required");
			}

			const petitionEntry = await strapi.db
				.query("api::petition.petition")
				.findOne({
					where: { documentId: petitionDocumentId },
					select: ["id"],
				});

			if (!petitionEntry) {
				return ctx.badRequest("Petition not found");
			}

			const petitionId = petitionEntry.id;

			const existingSignature = await strapi.db
				.query("api::signature.signature")
				.findOne({
					where: {
						email,
						petitions: {
							id: petitionId,
						},
						publishedAt: { $notNull: true },
					},
					populate: ["petitions"],
				});

			if (existingSignature) {
				throw new ApplicationError(
					"Signature email already exists for this petition",
					{
						field: "email",
						code: "duplicate",
					},
				);
			}

			const response = await strapi
				.documents("api::signature.signature")
				.create({
					data: {
						...ctx.request.body.data,
						petitions: {
							connect: [{ id: petitionId }],
						},
					},
				});

			ctx.send(response);
		} catch (error) {
			if (error instanceof ApplicationError) {
				ctx.status = 400;
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
				ctx.status = 500;
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

	async sendConfirmationEmail(ctx) {
		try {
			const { orderDocumentId } = ctx.request.body;

			const result = await strapi
				.service("api::signature.signature")
				.sendSignatureConfirmation(orderDocumentId);

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

const sendSignatureConfirmation = async (email, details) => {
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
		subject: "signature Confirmation",
		text: `Dear ${details.first_name}, your signature is confirmed. Details: ${JSON.stringify(details, null, 2)}`,
		html: `<p>Dear ${details.first_name}, your signature is confirmed.</p><pre>${JSON.stringify(details, null, 2)}</pre>`,
	};

	return transporter.sendMail(mailOptions);
};
