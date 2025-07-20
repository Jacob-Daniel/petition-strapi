"use strict";
import fs from "fs";

import { Core } from "@strapi/strapi";

const getUserPetitions: Core.Controller["get"] = async (ctx) => {
	const user = ctx.state.user;

	if (!user) {
		return ctx.unauthorized("You must be logged in to view your petitions.");
	}

	try {
		const petitions = await strapi
			.service("api::user-petitions.user-petitions")
			.getUserPetitions(user.id);

		ctx.body = petitions;
	} catch (err) {
		ctx.throw(500, "Failed to load user petitions");
	}
};

const generatePetitionPdf: Core.Controller["generatePdf"] = async (ctx) => {
	const user = ctx.state.user;
	const { documentId } = ctx.params;

	strapi.log.info(
		`[PDF Generation] Starting for document: ${documentId}, user: ${user?.id}`,
	);

	if (!user) {
		strapi.log.warn("[PDF Generation] Unauthorized attempt");
		return ctx.unauthorized();
	}

	try {
		strapi.log.info(
			`[PDF Generation] Checking petition ownership for user ${user.id}`,
		);

		const exists = await strapi.db.query("api::petition.petition").findOne({
			where: {
				document_id: documentId,
				createdByUser: user.id,
			},
		});

		if (!exists) {
			strapi.log.warn(
				`[PDF Generation] Petition ${documentId} not found or not owned by user ${user.id}`,
			);
			return ctx.forbidden("Not your petition");
		}

		strapi.log.info(
			`[PDF Generation] Found petition, proceeding to generate PDF`,
		);

		// Add this debug log to see what's being passed to the service
		strapi.log.debug(`[PDF Generation] Calling service with params:`, {
			documentId,
			user: user.id,
			petitionData: exists,
		});

		const pdfUrl = await strapi
			.service("api::petition.petition")
			.generatePetitionPdf(documentId);

		strapi.log.info(`[PDF Generation] Successfully generated PDF at ${pdfUrl}`);

		ctx.set("Content-Type", "application/pdf");
		ctx.set(
			"Content-Disposition",
			`attachment; filename="petition-${documentId}.pdf"`,
		);
		ctx.body = fs.createReadStream(
			path.join(strapi.dirs.app.root, "public", pdfUrl),
		);
	} catch (err) {
		strapi.log.error(
			`[PDF Generation] Failed for document ${documentId}:`,
			err,
		);

		// Include more error details in the response for debugging
		ctx.throw(
			500,
			`PDF generation failed for ${documentId}. Error: ${err.message}`,
			{
				details: {
					error: err.stack,
					documentId,
					userId: user.id,
					timestamp: new Date().toISOString(),
				},
			},
		);
	}
};
export default {
	getUserPetitions,
	generatePetitionPdf,
};
