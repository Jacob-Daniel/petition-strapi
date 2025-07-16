"use strict";
import type { Data } from "@strapi/strapi";
import { factories } from "@strapi/strapi";
import renderRichTextToHtml from "../services/RenderHtml"; // Import the helper function
export default factories.createCoreService(
	"api::petition.petition",
	({ strapi }) => ({
		async sendPetitionConfirmation(petitionDocumentId) {
			let emailstatus = "pending";
			try {
				const petition: Data.ContentType<"api::petition.petition"> | null =
					await strapi.documents("api::petition.petition").findOne({
						documentId: petitionDocumentId,
						populate: ["createdByUser"],
					});
				if (!petition) {
					throw new Error("Order not found");
				}

				if (petition.status !== "published") {
					emailstatus = "pending";
					throw new Error("Payment not completed, confirmation email not sent");
				}

				const siteconfig: Data.ContentType<"api::site-config.site-config"> | null =
					await strapi.documents("api::site-config.site-config").findFirst();

				if (!siteconfig) {
					throw new Error("site-config details not found");
				}

				const { createdByUser } = petition;
				const { title } = siteconfig;

				const emailsettings: Data.ContentType<"api::email-setting.email-setting"> | null =
					await strapi
						.documents("api::email-setting.email-setting")
						.findFirst();

				const htmlEmailBody = renderRichTextToHtml(emailsettings);
				const fd = (date) => {
					return new Intl.DateTimeFormat("en-GB", {
						day: "2-digit",
						month: "short",
						year: "numeric",
					}).format(new Date(date));
				};

				const emailHtml = `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
          <p>Dear ${createdByUser.username},</p>
          <p>Thank you for your booking!</p>
          <p>Petition details:</p><p>Booking Ref: ${petitionDocumentId.slice(0, 8)}</p>
          <div style="margin-bottom: 30px;">
            ${title}
          </div>        
        </div>`;
				await strapi.plugins["email"].services.email.send({
					to: createdByUser.email,
					bcc: process.env.MAIL_BCC || "",
					subject: emailsettings.email_subject || "Order Confirmation",
					html:
						emailHtml ||
						"<p>there was an error formating the htmlEmailBody</p>",
				});
				emailstatus = "sent";
				return { success: true, message: "Email sent successfully" };
			} catch (error) {
				strapi.log.error("Email send error:", error);
				emailstatus = "error";
				return { success: false, error: error.message };
			}
		},
	}),
);
