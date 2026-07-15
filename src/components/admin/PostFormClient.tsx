"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Send, Image as ImageIcon, Loader2, Sparkles } from "lucide-react";
import Link from "next/link";
import { Editor } from "./Editor";
import { createPost } from "../../../app/admin/posts/actions";
import Image from "next/image";

import { CategoryFormModal } from "./CategoryFormModal";
import { TagFormModal } from "./TagFormModal";
import { Plus } from "lucide-react";

interface Category {
  id: string;
  name: string;
}

interface Tag {
  id: string;
  name: string;
}

interface PostFormClientProps {
  categories: Category[];
  tags: Tag[];
  authorId: string;
}

export function PostFormClient({ categories, tags, authorId }: PostFormClientProps) {
  const router = useRouter();
  
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [featuredImage, setFeaturedImage] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGeneratingMeta, setIsGeneratingMeta] = useState(false);
  const [error, setError] = useState("");

  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    
    if (slug === "" || slug === generateSlug(title)) {
      setSlug(generateSlug(newTitle));
    }
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  };

  const handleTagToggle = (tagId: string) => {
    setSelectedTags(prev => 
      prev.includes(tagId) 
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
  };

  const handleGenerateFullArticle = async () => {
    const topic = window.prompt("Masukkan topik artikel yang ingin di-generate oleh AI:");
    if (!topic) return;

    setIsGenerating(true);
    try {
      const res = await fetch("/api/ai/generate-article", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });
      
      const data = await res.json();
      if (res.ok) {
        setTitle(data.title || "");
        setSlug(data.slug || "");
        setExcerpt(data.metaDescription || "");
        setContent(data.content || "");
      } else {
        alert(data.error || "Gagal meng-generate artikel.");
      }
    } catch (err) {
      alert("Terjadi kesalahan sistem saat menghubungi AI.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateMeta = async () => {
    if (!content) {
      alert("Tulis konten artikel terlebih dahulu sebelum men-generate meta deskripsi!");
      return;
    }

    setIsGeneratingMeta(true);
    try {
      const res = await fetch("/api/ai/generate-meta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      
      const data = await res.json();
      if (res.ok) {
        setExcerpt(data.metaDescription || "");
      } else {
        alert(data.error || "Gagal meng-generate meta deskripsi.");
      }
    } catch (err) {
      alert("Terjadi kesalahan sistem saat menghubungi AI.");
    } finally {
      setIsGeneratingMeta(false);
    }
  };

  const handleSubmit = async (isPublished: boolean) => {
    if (!title || !slug || !content || !categoryId) {
      setError("Please fill in all required fields (Title, Slug, Category, Content).");
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const result = await createPost({
        title,
        slug,
        excerpt: excerpt || title,
        content,
        featuredImage: featuredImage || undefined,
        isPublished,
        categoryId,
        tagIds: selectedTags,
        authorId,
      });

      if (result.success) {
        router.push("/admin/posts");
        router.refresh();
      } else {
        setError(result.error || "Something went wrong.");
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (err) {
      setError("An unexpected error occurred.");
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto pb-12">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <Link 
          href="/admin/posts"
          className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-body"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Articles
        </Link>
        <div className="flex gap-3">
          <button
            onClick={() => handleSubmit(false)}
            disabled={isSubmitting}
            className="flex items-center gap-2 px-6 py-2.5 bg-surface text-primary border border-surface-container rounded-xl font-body font-semibold hover:bg-surface-container-low transition-colors cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Draft
          </button>
          <button
            onClick={() => handleSubmit(true)}
            disabled={isSubmitting}
            className="flex items-center gap-2 px-6 py-2.5 bg-primary text-on-primary rounded-xl font-body font-semibold hover:bg-primary/90 transition-colors cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            Publish Now
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-xl text-error font-body text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          
          <div className="flex justify-start">
            <button
              onClick={handleGenerateFullArticle}
              disabled={isGenerating}
              className="flex items-center gap-2 px-6 py-3 bg-tertiary-container/30 text-tertiary hover:bg-tertiary-container/50 border border-tertiary/20 rounded-xl font-body font-semibold transition-colors cursor-pointer disabled:opacity-50"
            >
              {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
              AI: Generate Full Article
            </button>
          </div>

          <div className="bg-surface border border-surface-container rounded-2xl p-6">
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              placeholder="Article Title..."
              className="w-full text-4xl font-display font-bold text-primary placeholder:text-outline-variant/50 focus:outline-none bg-transparent"
            />
            
            <div className="flex flex-col mt-4">
              <label className="text-sm font-semibold text-primary mb-1">URL Slug</label>
              <div className="flex items-center text-sm font-body">
                <span className="text-on-surface-variant">architextrue.com/blog/</span>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="flex-1 bg-transparent border-b border-surface-container focus:border-primary focus:outline-none text-primary pb-1 ml-1"
                />
              </div>
            </div>
          </div>

          <div className="bg-surface border border-surface-container rounded-2xl p-6">
            <label className="text-sm font-semibold text-primary mb-2 block">Content</label>
            <Editor content={content} onChange={setContent} />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-surface border border-surface-container rounded-2xl p-6">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-primary">Meta Description</label>
              <button
                type="button"
                onClick={handleGenerateMeta}
                disabled={isGeneratingMeta}
                className="flex items-center gap-1.5 text-xs font-semibold text-tertiary hover:text-tertiary/80 transition-colors cursor-pointer disabled:opacity-50"
              >
                {isGeneratingMeta ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                AI: Generate Meta Desc
              </button>
            </div>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Tulis ringkasan singkat atau meta description untuk SEO..."
              className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-xl p-4 font-body text-primary placeholder:text-outline focus:outline-none focus:border-primary resize-none h-28"
            />
          </div>

          <div className="bg-surface border border-surface-container rounded-2xl p-6">
            <h3 className="font-semibold text-primary mb-4">Cover Image</h3>
            {featuredImage ? (
              <div className="relative aspect-video rounded-xl overflow-hidden group">
                <Image src={featuredImage} alt="Cover" fill className="object-cover" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button 
                    onClick={() => setFeaturedImage("")}
                    className="px-4 py-2 bg-error text-on-error rounded-lg text-sm font-semibold cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <div className="border-2 border-dashed border-outline-variant/50 rounded-xl p-6 flex flex-col items-center justify-center text-center">
                <ImageIcon className="w-8 h-8 text-outline mb-2" />
                <p className="text-sm text-on-surface-variant mb-4">
                  Tempel URL gambar dari Media Gallery di sini.
                </p>
                <input 
                  type="text"
                  placeholder="https://utfs.io/f/..."
                  value={featuredImage}
                  onChange={(e) => setFeaturedImage(e.target.value)}
                  className="w-full text-sm p-2 border border-surface-container rounded-lg focus:outline-none focus:border-primary bg-surface-container-lowest text-primary"
                />
              </div>
            )}
          </div>

          <div className="bg-surface border border-surface-container rounded-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-primary">Category <span className="text-error">*</span></h3>
              <button
                type="button"
                onClick={() => setIsCategoryModalOpen(true)}
                className="p-1 rounded-md text-tertiary hover:bg-tertiary-container/30 transition-colors cursor-pointer"
                title="Add Category"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="relative group">
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full p-3 bg-surface-container-lowest border border-outline-variant/50 rounded-xl font-body text-primary focus:outline-none focus:border-primary cursor-pointer appearance-none"
              >
                <option value="" disabled>Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id} className="text-primary bg-surface py-2">{cat.name}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-outline group-hover:text-primary transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>

          <div className="bg-surface border border-surface-container rounded-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-primary">Tags</h3>
              <button
                type="button"
                onClick={() => setIsTagModalOpen(true)}
                className="p-1 rounded-md text-tertiary hover:bg-tertiary-container/30 transition-colors cursor-pointer"
                title="Add Tag"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => {
                const isSelected = selectedTags.includes(tag.id);
                return (
                  <button
                    key={tag.id}
                    onClick={() => handleTagToggle(tag.id)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer border ${
                      isSelected 
                        ? 'bg-primary border-primary text-on-primary' 
                        : 'bg-surface-container-lowest border-surface-container text-on-surface hover:border-primary/50'
                    }`}
                  >
                    {tag.name}
                  </button>
                );
              })}
              {tags.length === 0 && (
                <p className="text-sm text-outline w-full text-center py-2">Belum ada tag. Buat di menu Tags.</p>
              )}
            </div>
          </div>

        </div>
      </div>
      
      <CategoryFormModal 
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
      />
      
      <TagFormModal 
        isOpen={isTagModalOpen}
        onClose={() => setIsTagModalOpen(false)}
      />
    </div>
  );
}
