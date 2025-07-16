import type { Data } from "@strapi/strapi";

export default function renderRichTextToHtml(
	blocks: Data.ContentType<"api::email-setting.email-setting"> | null,
) {
	if (!Array.isArray(blocks.email_body)) {
		throw new Error("Invalid rich text content: Expected an array");
	}
	let htmlContent = "";
	blocks.email_body.forEach((block) => {
		switch (block.type) {
			case "paragraph": {
				htmlContent += '<p class="text-base md:text-md mb-4">';
				block.children.forEach((child) => {
					if (child.type === "text") {
						htmlContent += child.text;
					} else if (child.type === "link" && child.children) {
						const linkText = child.children[0]?.text || "Link";
						const href = child.url || "#";
						htmlContent += `<a href="${href}" rel="noopener noreferrer" class="text-orange-700 underline">${linkText}</a>`;
					}
				});
				htmlContent += "</p>";
				break;
			}
			case "heading": {
				const headingTag = `h${block.level}`;
				htmlContent += `<${headingTag} class="text-md font-bold md:text-xl lg:text-2xl first-letter:capitalize md:leading-8 xl:mb-3">`;
				block.children.forEach((child) => {
					if (child.type === "text") {
						htmlContent += child.text;
					}
				});
				htmlContent += `</${headingTag}>`;
				break;
			}
			case "image": {
				if (
					"url" in block &&
					typeof block.url === "string" &&
					"alternativeText" in block &&
					typeof block.alternativeText === "string" &&
					"width" in block &&
					typeof block.width === "string" &&
					"height" in block &&
					typeof block.height === "string"
				) {
					htmlContent += `<figure>`;
					const alt = block.alternativeText || "";
					const width = block.width ? ` width="${block.width}"` : "";
					const height = block.height ? ` height="${block.height}"` : "";

					htmlContent += `<img src="${block.url}" alt="${alt}"${width}${height} class="mb-4 rounded" />`;
					htmlContent += `</figure>`;
				}

				break;
			}
			case "list": {
				if ("ordered" in block && typeof block.ordered === "string") {
					const listTag = block.ordered ? "ol" : "ul";
					htmlContent += `<${listTag} class="list-disc ms-5 leading-6 mb-4">`;
					block.children.forEach((item) => {
						htmlContent += `<li class="md:text-md">`;
						item.children.forEach((child) => {
							if (child.type === "text") {
								htmlContent += child.text;
							}
						});
						htmlContent += `</li>`;
					});
					htmlContent += `</${listTag}>`;
				}
				break;
			}
			case "quote": {
				if ("quote" in block && typeof block.quote === "string") {
					htmlContent += `<i class="text-base md:text-md mb-4">${block.quote}</i>`;
				}
				break;
			}
			default:
				htmlContent += `<div style="border:1px solid red; padding: 10px;">there was a problem rendering text</div>`;
		}
	});

	return htmlContent;
}
