// src/utils/renderRichText.ts
import type {
  RichTextContent,
  ContentBlock,
  ListBlock,
  ListItemNode,
  InlineNode,
  TextNode,
  LinkNode,
} from "./types";

function isTextNode(node: InlineNode): node is TextNode {
  return node.type === "text";
}

function isLinkNode(node: InlineNode): node is LinkNode {
  return node.type === "link";
}

export function renderRichText(content: RichTextContent): string {
  if (!content || !Array.isArray(content)) return "No content available";

  return content
    .map((block) => {
      switch (block.type) {
        case "paragraph":
          return block.children
            .map((child) => {
              if (isTextNode(child)) {
                let text = child.text;
                if (child.bold) text = `**${text}**`;
                if (child.italic) text = `_${text}_`;
                return text;
              }
              if (isLinkNode(child)) {
                return child.children[0]?.text || "Link";
              }
              return "";
            })
            .join(" ");

        case "heading":
          return `\n${block.children
            .map((child) => child.text)
            .join("")
            .toUpperCase()}\n`;

        case "list":
          return (block as ListBlock).children
            .map(
              (item) =>
                `• ${item.children
                  .map((child) => {
                    if (isTextNode(child)) return child.text;
                    if (isLinkNode(child))
                      return child.children[0]?.text || "Link";
                    return "";
                  })
                  .join("")}`,
            )
            .join("\n");

        case "image":
          return `[Image: ${block.alternativeText || block.name}]`;

        default:
          return `[${(block as ContentBlock).type} content]`;
      }
    })
    .join("\n\n");
}
