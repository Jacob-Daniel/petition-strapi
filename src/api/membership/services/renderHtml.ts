export default function renderRichTextToHtml(blocks) {
	if (!Array.isArray(blocks)) {
		throw new Error("Invalid rich text content: Expected an array");
	}

	let htmlContent = "";
	blocks.forEach((block) => {
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
				htmlContent += `<figure>`;
				if (block.url) {
					htmlContent += `<img src="${block.url}" alt="${block.alternativeText || block.name}" width="${block.width}" height="${block.height}" />`;
				}
				if (block.caption) {
					htmlContent += `<figcaption>${block.caption}</figcaption>`;
				}
				htmlContent += `</figure>`;
				break;
			}
			case "list": {
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
				break;
			}
			case "text": {
				htmlContent += `<p class="text-base md:text-md mb-4">${block.text}</p>`;
				break;
			}
			default:
				htmlContent += `<div style="border:1px solid red; padding: 10px;">there was a problem rendering text</div>`;
		}
	});

	return htmlContent;
}
