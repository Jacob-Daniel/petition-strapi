import Handlebars from "handlebars";
import fs from "fs"; // Regular fs for sync operations
import path from "path";
import wkhtmltopdf from "wkhtmltopdf";
import { factories } from "@strapi/strapi";
import { renderRichText } from "../../../utils/renderRichText";
export default factories.createCoreService(
	"api::petition.petition",
	({ strapi }) => ({
		async generatePetitionPdf(docID) {
			try {
				const result = await strapi.db.connection.raw(
					`SELECT 
  json_build_object(
    'id', p.id,
    'title', p.title,
    'demand', p.demand,
    'reason', p.reason,
    'signatures_count', p.signatures_count,
    'created_at', p.created_at,
    'target', json_build_object(
      'id', t.id,
      'name', t.name
    ),
    'created_by', json_build_object(
      'username', creator.username,
      'email', creator.email,
      'last_name', creator.last_name
    )
  ) AS petition,

  (
    SELECT json_agg(
      json_build_object(
        'signature_id', s.id,
        'signature_date', s.created_at,
        'postcode', s.postcode,
        'first_name', s.first_name,
        'last_name', s.last_name,
        'email', s.email,
        'comment', s.comment,
        'user', CASE
          WHEN s.anonymize THEN NULL
          ELSE json_build_object(
            'id', u.id,
            'username', u.username,
            'email', u.email
          )
        END
      )
    )
    FROM signatures s
    JOIN signatures_petition_lnk spl ON s.id = spl.signature_id
    LEFT JOIN signatures_user_lnk sul ON s.id = sul.signature_id
    LEFT JOIN up_users u ON sul.user_id = u.id
    WHERE spl.petition_id = p.id
  ) AS signatures

FROM petitions p
LEFT JOIN petitions_created_by_user_lnk pcu ON p.id = pcu.petition_id
LEFT JOIN up_users creator ON pcu.user_id = creator.id

LEFT JOIN petitions_target_lnk ptl ON p.id = ptl.petition_id
LEFT JOIN targets t ON ptl.target_id = t.id

WHERE p.document_id = ? AND p.published_at IS NOT NULL
LIMIT 1;
				`,
					[docID],
				);

				if (!result?.rows?.length) {
					strapi.log.error("No petition found");
					return null;
				}

				const { petition, signatures = [] } = result.rows[0];

				// Prepare template data
				const templateData = {
					created_by:
						petition.created_by.username + " " + petition.created_by.last_name,
					created_by_email: petition.created_by.email,
					created_at: new Date(petition.created_at).toISOString().split("T")[0],
					target: petition.target.name,
					title: petition.title,
					demand: renderRichText(petition.demand),
					reason: renderRichText(petition.reason),
					signatures_count: petition.signatures_count || "no count found",
					signatures: signatures.map((sig) => ({
						first_name: sig.first_name || "not found",
						last_name: sig.last_name || "not found",
						email: sig.email || "not found",
						postcode: sig.postcode || "not found",
					})),
				};

				// Read template
				const templatePath = path.join(
					strapi.dirs.app.root,
					"src",
					"templates",
					"petition.html",
				);
				const templateHtml = fs.readFileSync(templatePath, "utf8");

				// Generate PDF
				const template = Handlebars.compile(templateHtml);
				const compiledHtml = template(templateData);

				const filePath = path.join(
					strapi.dirs.app.root,
					"public",
					"pdfs",
					`petition-${docID}.pdf`,
				);

				// Ensure directory exists
				if (!fs.existsSync(path.dirname(filePath))) {
					fs.mkdirSync(path.dirname(filePath), { recursive: true });
				}

				// Generate PDF
				await this.generatePdf(compiledHtml, filePath);

				return `/pdfs/petition-${docID}.pdf`;
			} catch (err) {
				strapi.log.error("PDF generation failed:", err);
				throw err;
			}
		},

		async generatePdf(htmlContent, outputPath) {
			return new Promise<void>((resolve, reject) => {
				const stream = fs.createWriteStream(outputPath);
				wkhtmltopdf(htmlContent, {
					pageSize: "A4",
					orientation: "Portrait", // Changed from Landscape
				}).pipe(stream);

				stream.on("finish", () => resolve());
				stream.on("error", reject);
			});
		},
	}),
);
