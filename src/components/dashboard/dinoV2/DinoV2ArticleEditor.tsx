"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TiptapImage from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";

type Lang = "uk" | "en";

const btn = (active: boolean) =>
  `px-2 py-1 text-[12px] sm:text-[13px] font-medium border border-transparent duration-150 ${
    active
      ? "bg-brightOrange text-white"
      : "bg-[#2a2a3e] text-white hover:bg-slateGray"
  }`;

function Toolbar({
  editor,
  onImageClick,
}: {
  editor: ReturnType<typeof useEditor>;
  onImageClick: () => void;
}) {
  if (!editor) return null;
  return (
    <div className="flex flex-wrap gap-1 p-2 bg-darkPurple border-b-2 border-brightOrange">
      <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={btn(editor.isActive("bold"))}>B</button>
      <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={btn(editor.isActive("italic"))}>I</button>
      <button type="button" onClick={() => editor.chain().focus().toggleStrike().run()} className={btn(editor.isActive("strike"))}>S</button>
      <span className="w-px bg-slateGray mx-1" />
      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={btn(editor.isActive("heading", { level: 2 }))}>H2</button>
      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={btn(editor.isActive("heading", { level: 3 }))}>H3</button>
      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()} className={btn(editor.isActive("heading", { level: 4 }))}>H4</button>
      <span className="w-px bg-slateGray mx-1" />
      <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={btn(editor.isActive("bulletList"))}>• Список</button>
      <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={btn(editor.isActive("orderedList"))}>1. Список</button>
      <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={btn(editor.isActive("blockquote"))}>❝ Цитата</button>
      <span className="w-px bg-slateGray mx-1" />
      <button type="button" onClick={onImageClick} className={btn(false)}>🖼 Фото</button>
    </div>
  );
}

export interface DinoV2ArticleEditorRef {
  getArticle: () => { uk: object | null; en: object | null };
}

interface Props {
  initialUk?: object | null;
  initialEn?: object | null;
}

const editorStyles = [
  "min-h-[350px] bg-white text-darkGray p-4 max-w-none",
  "[&_.ProseMirror]:outline-none [&_.ProseMirror]:min-h-[300px]",
  // placeholder
  "[&_.ProseMirror_p.is-editor-empty:first-child::before]:text-gray-400",
  "[&_.ProseMirror_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)]",
  "[&_.ProseMirror_p.is-editor-empty:first-child::before]:float-left",
  "[&_.ProseMirror_p.is-editor-empty:first-child::before]:pointer-events-none",
  // paragraph
  "[&_.ProseMirror_p]:mb-2",
  // headings
  "[&_.ProseMirror_h2]:text-[22px] [&_.ProseMirror_h2]:font-bold [&_.ProseMirror_h2]:border-b-2 [&_.ProseMirror_h2]:border-brightOrange [&_.ProseMirror_h2]:pb-1 [&_.ProseMirror_h2]:mt-5 [&_.ProseMirror_h2]:mb-2",
  "[&_.ProseMirror_h3]:text-[18px] [&_.ProseMirror_h3]:font-semibold [&_.ProseMirror_h3]:text-brightOrange [&_.ProseMirror_h3]:mt-4 [&_.ProseMirror_h3]:mb-1",
  "[&_.ProseMirror_h4]:text-[15px] [&_.ProseMirror_h4]:font-semibold [&_.ProseMirror_h4]:uppercase [&_.ProseMirror_h4]:tracking-wide [&_.ProseMirror_h4]:mt-3 [&_.ProseMirror_h4]:mb-1",
  // lists
  "[&_.ProseMirror_ul]:list-disc [&_.ProseMirror_ul]:pl-6 [&_.ProseMirror_ul]:mb-2",
  "[&_.ProseMirror_ol]:list-decimal [&_.ProseMirror_ol]:pl-6 [&_.ProseMirror_ol]:mb-2",
  "[&_.ProseMirror_li]:mb-1",
  // blockquote
  "[&_.ProseMirror_blockquote]:border-l-4 [&_.ProseMirror_blockquote]:border-brightOrange [&_.ProseMirror_blockquote]:pl-4 [&_.ProseMirror_blockquote]:italic [&_.ProseMirror_blockquote]:text-gray-500 [&_.ProseMirror_blockquote]:my-3",
  // inline code
  "[&_.ProseMirror_code]:bg-gray-100 [&_.ProseMirror_code]:px-1 [&_.ProseMirror_code]:rounded [&_.ProseMirror_code]:text-[13px]",
  // hr
  "[&_.ProseMirror_hr]:border-gray-300 [&_.ProseMirror_hr]:my-4",
].join(" ");

const DinoV2ArticleEditor = forwardRef<DinoV2ArticleEditorRef, Props>(
  ({ initialUk, initialEn }, ref) => {
    const [activeLang, setActiveLang] = useState<Lang>("uk");
    const fileUkRef = useRef<HTMLInputElement>(null);
    const fileEnRef = useRef<HTMLInputElement>(null);

    const editorUk = useEditor({
      extensions: [
        StarterKit,
        TiptapImage,
        Placeholder.configure({ placeholder: "Стаття українською..." }),
      ],
      content: (initialUk as any) || "",
      immediatelyRender: false,
    });

    const editorEn = useEditor({
      extensions: [
        StarterKit,
        TiptapImage,
        Placeholder.configure({ placeholder: "Article in English..." }),
      ],
      content: (initialEn as any) || "",
      immediatelyRender: false,
    });

    useImperativeHandle(ref, () => ({
      getArticle: () => ({
        uk: editorUk?.getJSON() ?? null,
        en: editorEn?.getJSON() ?? null,
      }),
    }));

    const handleImageFile =
      (editor: ReturnType<typeof useEditor>) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !editor) return;
        const reader = new FileReader();
        reader.onload = () => {
          editor
            .chain()
            .focus()
            .setImage({ src: reader.result as string })
            .run();
        };
        reader.readAsDataURL(file);
        e.target.value = "";
      };

    return (
      <div className="flex flex-col gap-0 border-2 border-darkPurple">
        {/* Lang tabs */}
        <div className="flex">
          <button
            type="button"
            onClick={() => setActiveLang("uk")}
            className={`px-6 py-2 text-[14px] font-semibold transition-colors duration-200 ${
              activeLang === "uk"
                ? "bg-brightOrange text-white"
                : "bg-darkGray text-white hover:bg-slateGray"
            }`}
          >
            УКР
          </button>
          <button
            type="button"
            onClick={() => setActiveLang("en")}
            className={`px-6 py-2 text-[14px] font-semibold transition-colors duration-200 ${
              activeLang === "en"
                ? "bg-brightOrange text-white"
                : "bg-darkGray text-white hover:bg-slateGray"
            }`}
          >
            ENG
          </button>
        </div>

        {/* UK editor */}
        <div className={activeLang === "uk" ? "flex flex-col" : "hidden"}>
          <Toolbar editor={editorUk} onImageClick={() => fileUkRef.current?.click()} />
          <EditorContent
            editor={editorUk}
            className={editorStyles}
          />
          <input ref={fileUkRef} type="file" accept="image/*" className="hidden" onChange={handleImageFile(editorUk)} />
        </div>

        {/* EN editor */}
        <div className={activeLang === "en" ? "flex flex-col" : "hidden"}>
          <Toolbar editor={editorEn} onImageClick={() => fileEnRef.current?.click()} />
          <EditorContent
            editor={editorEn}
            className={editorStyles}
          />
          <input ref={fileEnRef} type="file" accept="image/*" className="hidden" onChange={handleImageFile(editorEn)} />
        </div>
      </div>
    );
  }
);

DinoV2ArticleEditor.displayName = "DinoV2ArticleEditor";

export default DinoV2ArticleEditor;
