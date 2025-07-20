// src/utils/types.ts
export interface RichTextContent extends Array<ContentBlock> {}

export type ContentBlock =
  | ParagraphBlock
  | HeadingBlock
  | ListBlock
  | ImageBlock;

export interface ParagraphBlock {
  type: "paragraph";
  children: InlineNode[];
  key?: string;
}

export interface HeadingBlock {
  type: "heading";
  level: number;
  children: TextNode[];
  key?: string;
}

export interface ListBlock {
  type: "list";
  ordered: boolean;
  children: ListItemNode[];
  key?: string;
}

export interface ListItemNode {
  type: "list-item";
  children: InlineNode[];
  key?: string;
}

export interface ImageBlock {
  type: "image";
  url: string;
  alternativeText?: string;
  name?: string;
  width?: number;
  height?: number;
  caption?: string;
  key?: string;
}

export type InlineNode = TextNode | LinkNode;

export interface TextNode {
  type: "text";
  text: string;
  bold?: boolean;
  italic?: boolean;
}

export interface LinkNode {
  type: "link";
  url: string;
  children: TextNode[];
}
