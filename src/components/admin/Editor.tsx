"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import { BubbleMenu } from '@tiptap/react/menus';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { 
  Bold, Italic, Heading2, Heading3, List, ListOrdered, 
  Quote, ImageIcon, Link as LinkIcon, Sparkles, Loader2, MousePointerClick
} from 'lucide-react';
import { useState, useCallback } from 'react';

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

interface EditorProps {
  content: string;
  onChange: (html: string) => void;
}

export function Editor({ content, onChange }: EditorProps) {
  const [isRewriting, setIsRewriting] = useState(false);

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

  const handleRewrite = async () => {
    if (!editor) return;
    
    const { from, to } = editor.state.selection;
    if (from === to) {
      alert("Blok/Pilih teks yang ingin di-rewrite terlebih dahulu!");
      return;
    }

    const selectedText = editor.state.doc.textBetween(from, to, ' ');
    
    setIsRewriting(true);
    try {
      const res = await fetch('/api/ai/rewrite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: selectedText }),
      });
      const data = await res.json();
      
      if (data.revisedText) {
        editor.chain().focus().deleteSelection().insertContent(data.revisedText).run();
      } else {
        alert("Gagal melakukan rewrite.");
      }
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan sistem saat rewrite.");
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
    const url = window.prompt('Button Link URL:');
    if (url === null || url === '') return;
    
    editor.chain().focus().setLink({ 
      href: url, 
      class: 'inline-block bg-primary text-on-primary px-6 py-3 rounded-xl font-semibold no-underline hover:bg-primary/90 transition-colors my-4' 
    }).run();
  }, [editor]);

  const addImage = useCallback(() => {
    if (!editor) return;
    const url = window.prompt('Image URL (Sementara pakai URL external. Integrasi UploadThing bisa menyusul via modal):');
    if (url) {
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
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded-lg transition-colors ${editor.isActive('blockquote') ? 'bg-primary/10 text-primary' : 'text-on-surface-variant hover:bg-surface-container'}`}
          title="Quote"
        >
          <Quote className="w-5 h-5" />
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
          onClick={handleRewrite}
          disabled={isRewriting}
          className="ml-auto flex items-center gap-2 px-3 py-1.5 bg-tertiary-container/30 text-tertiary hover:bg-tertiary-container/50 rounded-lg text-sm font-semibold transition-colors cursor-pointer"
          title="Block teks lalu klik ini untuk menyihirnya menjadi lebih bagus"
        >
          {isRewriting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          AI: Rewriter
        </button>
      </div>

      {/* Bubble Menu for quick actions on selection */}
      {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
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
              onClick={handleRewrite}
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
    </div>
  );
}
