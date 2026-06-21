"use client";

import { useTranslations } from "next-intl";
import { ReactNode } from "react";

interface TipTapNode {
  type: string;
  attrs?: Record<string, any>;
  content?: TipTapNode[];
  marks?: { type: string }[];
  text?: string;
}

function applyMarks(text: string, marks: { type: string }[] = []): ReactNode {
  let node: ReactNode = text;
  for (const mark of marks) {
    if (mark.type === "bold")
      node = <strong className="font-semibold">{node}</strong>;
    else if (mark.type === "italic") node = <em>{node}</em>;
    else if (mark.type === "strike") node = <s>{node}</s>;
    else if (mark.type === "code")
      node = (
        <code className="bg-gray-200 text-darkGray px-1 rounded text-[13px]">
          {node}
        </code>
      );
  }
  return node;
}

function renderNode(node: TipTapNode, index: number): ReactNode {
  if (node.type === "text") {
    return <span key={index}>{applyMarks(node.text ?? "", node.marks)}</span>;
  }

  const children = node.content?.map((child, i) => renderNode(child, i));

  switch (node.type) {
    case "doc":
      return <>{children}</>;
    case "paragraph":
      return (
        <p
          key={index}
          className="text-[15px] lg:text-[16px] leading-relaxed mb-3"
        >
          {children}
        </p>
      );
    case "heading":
      if (node.attrs?.level === 2)
        return (
          <h2
            key={index}
            className="text-[20px] lg:text-[22px] font-bold mt-6 mb-2"
          >
            {children}
          </h2>
        );
      if (node.attrs?.level === 3)
        return (
          <h3
            key={index}
            className="text-[18px] lg:text-[20px] font-semibold mt-5 mb-2"
          >
            {children}
          </h3>
        );
      return (
        <h4
          key={index}
          className="text-[16px] lg:text-[18px] font-semibold mt-4 mb-1"
        >
          {children}
        </h4>
      );
    case "bulletList":
      return (
        <ul key={index} className="ml-[35px] list-disc mb-3 space-y-1">
          {children}
        </ul>
      );
    case "orderedList":
      return (
        <ol key={index} className="ml-[35px] list-decimal mb-3 space-y-1">
          {children}
        </ol>
      );
    case "listItem":
      return (
        <li key={index} className="text-[15px] lg:text-[16px]">
          {children}
        </li>
      );
    case "blockquote":
      return (
        <blockquote
          key={index}
          className="border-l-4 border-brightOrange pl-4 italic text-slateGray my-4"
        >
          {children}
        </blockquote>
      );
    case "hardBreak":
      return <br key={index} />;
    case "horizontalRule":
      return <hr key={index} className="border-slateGray my-4" />;
    case "image":
      return (
        <img
          key={index}
          src={node.attrs?.src}
          alt={node.attrs?.alt ?? ""}
          className="w-full max-h-[500px] object-contain my-4"
        />
      );
    default:
      return <span key={index}>{children}</span>;
  }
}

function isDocEmpty(doc: TipTapNode): boolean {
  if (!doc.content || doc.content.length === 0) return true;
  if (doc.content.length === 1) {
    const only = doc.content[0];
    return (
      only.type === "paragraph" && (!only.content || only.content.length === 0)
    );
  }
  return false;
}

interface Props {
  article?: { uk: object | null; en: object | null } | null;
  locale: string;
}

const DinoV2PageArticle = ({ article, locale }: Props) => {
  const tPage = useTranslations("dinoV2.page");
  const content = (locale === "en" ? article?.en : article?.uk) as
    | TipTapNode
    | null
    | undefined;

  if (!content || isDocEmpty(content)) return null;

  return (
    <div className="border-b-4 pb-3 mb-3 md:pb-5 md:mb-5">
      {/* <h2 className="text-[20px] lg:text-[24px] font-semibold mb-3 text-center">
        {tPage("article")}
      </h2> */}
      {renderNode(content, 0)}
    </div>
  );
};

export default DinoV2PageArticle;
