"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import { MediaPickerModal } from "./MediaPickerModal";
import { BubbleMenu } from '@tiptap/react/menus';
import StarterKit from '@tiptap/starter-kit';
import Document from '@tiptap/extension-document';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import { Node, mergeAttributes } from '@tiptap/core';
import {
  Bold, Italic, Heading2, Heading3, List, ListOrdered,
  ImageIcon, Link as LinkIcon, Sparkles, Loader2, MousePointerClick,
  AlignLeft, AlignCenter, AlignRight, AlignJustify
} from 'lucide-react';
import { useState, useCallback, useEffect } from 'react';
import { editWithAI } from "../../../app/admin/posts/ai-actions";

// Custom Link extension to support button classes
const CustomLink = Link.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      class: {
        default: null,
      },
    };
  },
});

// Custom Button Node Extension
const ButtonNode = Node.create({
  name: 'button',
  group: 'inline',
  inline: true,
  selectable: true,
  atom: true,

  addAttributes() {
    return {
      href: { default: '#' },
      text: { default: 'Button' },
      target: { default: '_blank' },
      rel: { default: 'noopener noreferrer' }
    }
  },

  parseHTML() {
    return [{ tag: 'a[data-type="button"]' }]
  },

  renderHTML({ HTMLAttributes }) {
    const text = HTMLAttributes.text || 'Button';
    const attrs = { ...HTMLAttributes };
    delete attrs.text; // Remove text so it doesn't become an HTML attribute

    return ['a', mergeAttributes(attrs, {
      'data-type': 'button',
      class: 'inline-block bg-primary text-white !text-white px-6 py-3 rounded-xl font-semibold no-underline !no-underline hover:bg-primary/90 transition-colors my-4 shadow-lg cursor-pointer'
    }), text];
  }
});

interface EditorProps {
  content: string;
  onChange: (html: string) => void;
}

export function Editor({ content, onChange }: EditorProps) {
  const [isRewriting, setIsRewriting] = useState(false);
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] }
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
        HTMLAttributes: {
          class: 'rounded-xl max-w-full h-auto my-4 border border-surface-container shadow-sm',
        },
      }),
      CustomLink.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-primary font-medium hover:underline cursor-pointer',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      ButtonNode,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none focus:outline-none min-h-[400px] px-6 py-6 font-body text-on-surface-variant',
      },
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  const handleRewrite = async () => {
    if (!editor) return;

    const { from, to } = editor.state.selection;
    if (from === to) {
      alert("Blok/Pilih teks yang ingin di-rewrite terlebih dahulu!");
      return;
    }

    const selectedText = editor.state.doc.textBetween(from, to, ' ');

    const instruction = window.prompt("Instruksi AI (contoh: 'Perbaiki tata bahasa', 'Buat lebih panjang', 'Jadikan format poin-poin'):", "Perbaiki penulisan teks ini agar lebih menarik dan profesional.");
    if (!instruction) return;

    setIsRewriting(true);
    try {
      const res = await editWithAI(selectedText, instruction);

      if (res.success && res.text) {
        editor.chain().focus().deleteSelection().insertContent(res.text).run();
      } else {
        alert(res.error || "Gagal melakukan rewrite teks.");
      }
    } catch (err: any) {
      alert(err.message || "Terjadi kesalahan sistem saat rewrite.");
    } finally {
      setIsRewriting(false);
    }
  };

  const setLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL:', previousUrl);

    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  const setButton = useCallback(() => {
    if (!editor) return;
    const text = window.prompt("Teks Tombol (misal: Hubungi Kami):", "Konsultasi Gratis");
    if (!text) return;
    const href = window.prompt("Link Tujuan (URL):", "https://wa.me/...");
    if (!href) return;

    editor.chain().focus().insertContent({
      type: 'button',
      attrs: { text, href }
    }).run();
  }, [editor]);

  const addImage = useCallback(() => {
    setIsMediaPickerOpen(true);
  }, []);

  const handleImageSelect = useCallback((url: string) => {
    if (editor && url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="border border-surface-container rounded-2xl overflow-hidden bg-surface flex flex-col">
      {/* Toolbar */}
      <div className="bg-white border-b border-surface-container p-2 flex flex-wrap items-center gap-1">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded-lg transition-colors ${editor.isActive('bold') ? 'bg-primary/10 text-primary' : 'text-on-surface-variant hover:bg-surface-container'}`}
          title="Bold"
        >
          <Bold className="w-5 h-5" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded-lg transition-colors ${editor.isActive('italic') ? 'bg-primary/10 text-primary' : 'text-on-surface-variant hover:bg-surface-container'}`}
          title="Italic"
        >
          <Italic className="w-5 h-5" />
        </button>

        <div className="w-px h-6 bg-surface-container mx-1"></div>

        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded-lg transition-colors ${editor.isActive('heading', { level: 2 }) ? 'bg-primary/10 text-primary' : 'text-on-surface-variant hover:bg-surface-container'}`}
          title="Heading 2"
        >
          <Heading2 className="w-5 h-5" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`p-2 rounded-lg transition-colors ${editor.isActive('heading', { level: 3 }) ? 'bg-primary/10 text-primary' : 'text-on-surface-variant hover:bg-surface-container'}`}
          title="Heading 3"
        >
          <Heading3 className="w-5 h-5" />
        </button>

        <div className="w-px h-6 bg-surface-container mx-1"></div>

        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded-lg transition-colors ${editor.isActive('bulletList') ? 'bg-primary/10 text-primary' : 'text-on-surface-variant hover:bg-surface-container'}`}
          title="Bullet List"
        >
          <List className="w-5 h-5" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded-lg transition-colors ${editor.isActive('orderedList') ? 'bg-primary/10 text-primary' : 'text-on-surface-variant hover:bg-surface-container'}`}
          title="Ordered List"
        >
          <ListOrdered className="w-5 h-5" />
        </button>

        <div className="w-px h-6 bg-surface-container mx-1"></div>

        <button
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={`p-2 rounded-lg transition-colors ${editor.isActive({ textAlign: 'left' }) ? 'bg-primary/10 text-primary' : 'text-on-surface-variant hover:bg-surface-container'}`}
          title="Align Left"
        >
          <AlignLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={`p-2 rounded-lg transition-colors ${editor.isActive({ textAlign: 'center' }) ? 'bg-primary/10 text-primary' : 'text-on-surface-variant hover:bg-surface-container'}`}
          title="Align Center"
        >
          <AlignCenter className="w-5 h-5" />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={`p-2 rounded-lg transition-colors ${editor.isActive({ textAlign: 'right' }) ? 'bg-primary/10 text-primary' : 'text-on-surface-variant hover:bg-surface-container'}`}
          title="Align Right"
        >
          <AlignRight className="w-5 h-5" />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          className={`p-2 rounded-lg transition-colors ${editor.isActive({ textAlign: 'justify' }) ? 'bg-primary/10 text-primary' : 'text-on-surface-variant hover:bg-surface-container'}`}
          title="Align Justify"
        >
          <AlignJustify className="w-5 h-5" />
        </button>

        <div className="w-px h-6 bg-surface-container mx-1"></div>

        <button
          onClick={setLink}
          className={`p-2 rounded-lg transition-colors ${editor.isActive('link') ? 'bg-primary/10 text-primary' : 'text-on-surface-variant hover:bg-surface-container'}`}
          title="Add Link"
        >
          <LinkIcon className="w-5 h-5" />
        </button>

        <button
          onClick={setButton}
          className={`p-2 rounded-lg transition-colors text-on-surface-variant hover:bg-surface-container`}
          title="Add Button"
        >
          <MousePointerClick className="w-5 h-5" />
        </button>

        <button
          onClick={addImage}
          className="p-2 rounded-lg transition-colors text-on-surface-variant hover:bg-surface-container"
          title="Add Image"
        >
          <ImageIcon className="w-5 h-5" />
        </button>

        <div className="w-px h-6 bg-surface-container mx-1"></div>

        <button
          onClick={() => handleRewrite()}
          disabled={isRewriting}
          className="ml-auto flex items-center gap-2 px-3 py-1.5 bg-tertiary-container/30 text-tertiary hover:bg-tertiary-container/50 rounded-lg text-sm font-semibold transition-colors cursor-pointer"
          title="Block teks lalu klik ini untuk menyihirnya menjadi lebih bagus"
        >
          {isRewriting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          AI
        </button>
      </div>

      {/* Bubble Menu for quick actions on selection */}
      {editor && (
        <BubbleMenu editor={editor}>
          <div className="flex bg-surface shadow-lg border border-surface-container rounded-lg overflow-hidden">
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`p-2 hover:bg-surface-container ${editor.isActive('bold') ? 'text-primary' : 'text-on-surface-variant'}`}
            >
              <Bold className="w-4 h-4" />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`p-2 hover:bg-surface-container ${editor.isActive('italic') ? 'text-primary' : 'text-on-surface-variant'}`}
            >
              <Italic className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleRewrite()}
              className="p-2 bg-tertiary text-on-tertiary hover:opacity-90 flex items-center gap-1"
            >
              <Sparkles className="w-4 h-4" />
            </button>
          </div>
        </BubbleMenu>
      )}

      {/* Editor Content Area */}
      <div className="flex-1 bg-white cursor-text">
        <EditorContent editor={editor} />
      </div>
      
      <MediaPickerModal
        isOpen={isMediaPickerOpen}
        onClose={() => setIsMediaPickerOpen(false)}
        onSelect={handleImageSelect}
      />
    </div>
  );
}
