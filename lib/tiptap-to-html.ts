import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";

export const tiptapToHtml = (content: any): string => {
  if (!content) return "";

  try {
    return generateHTML(content, [
      StarterKit.configure({
        link: false,
      }),
      Link.configure({
        openOnClick: true,
        HTMLAttributes: {
          target: "_blank",
          rel: "noopener noreferrer",
        },
      }),
    ]);
  } catch (error) {
    console.error("Error converting Tiptap content to HTML:", error);
    return "<p>Ошибка отображения контента</p>";
  }
};
