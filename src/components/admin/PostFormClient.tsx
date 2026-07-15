"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Send, Image as ImageIcon, Loader2, Sparkles, Plus } from "lucide-react";
import Link from "next/link";
import { Editor } from "./Editor";
import { createPost, updatePost } from "../../../app/admin/posts/actions";
import { generateFullArticle, generateMetaDesc } from "../../../app/admin/posts/ai-actions";
import Image from "next/image";

import { CategoryFormModal } from "./CategoryFormModal";
import { TagFormModal } from "./TagFormModal";
import { MediaPickerModal } from "./MediaPickerModal";
import { UploadMediaModal } from "./UploadMediaModal";

interface Category {
  id: string;
  name: string;
}

interface Tag {
  id: string;
  name: string;
}

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string | null;
  isPublished: boolean;
  categories: Category[];
  tags: Tag[];
}

interface PostFormClientProps {
  categories: Category[];
  tags: Tag[];
  authorId: string;
  post?: Post;
}

export function PostFormClient({ categories, tags, authorId, post }: PostFormClientProps) {
  const router = useRouter();
  
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [featuredImage, setFeaturedImage] = useState("");
  
  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setSlug(post.slug);
      setExcerpt(post.excerpt);
      setContent(post.content);
      setFeaturedImage(post.featuredImage || "");
      if (post.categories && post.categories.length > 0) {
        setCategoryId(post.categories[0].id);
      }
      if (post.tags) {
        setSelectedTags(post.tags.map(t => t.id));
      }
    }
  }, [post]);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGeneratingMeta, setIsGeneratingMeta] = useState(false);
  const [error, setError] = useState("");

  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);

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
      const res = await generateFullArticle(topic);
      
      if (res.success && res.data) {
        setTitle(res.data.title || "");
        setSlug(res.data.slug || "");
        setExcerpt(res.data.metaDescription || "");
        setContent(res.data.content || "");
      } else {
        alert(res.error || "Gagal meng-generate artikel.");
      }
    } catch (err: any) {
      alert(err.message || "Terjadi kesalahan sistem saat menghubungi AI.");
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
      const res = await generateMetaDesc(content);
      
      if (res.success && res.text) {
        setExcerpt(res.text);
      } else {
        alert(res.error || "Gagal meng-generate meta description.");
      }
    } catch (err: any) {
      alert(err.message || "Terjadi kesalahan sistem saat menghubungi AI.");
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
      let result;
      if (post) {
        result = await updatePost(post.id, {
          title,
          slug,
          excerpt: excerpt || title,
          content,
          featuredImage: featuredImage || undefined,
          isPublished,
          categoryId,
          tagIds: selectedTags,
        });
      } else {
        result = await createPost({
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
      }

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
    <div className="w-full max-w-6xl mx-auto pb-12">
      <div className="mb-4">
        <Link 
          href="/admin/posts"
          className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-body w-fit"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Articles
        </Link>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-xl text-error font-body text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <div className="lg:col-span-2 space-y-6">
          
          <div className="flex justify-between items-center">
            <h1 className="font-display text-2xl font-bold text-primary">
              {post ? "Edit Article" : "Create New Article"}
            </h1>
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
          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => handleSubmit(false)}
              disabled={isSubmitting}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-surface text-primary border border-surface-container rounded-xl font-body font-semibold hover:bg-surface-container-low transition-colors cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Draft
            </button>
            <button
              onClick={() => handleSubmit(true)}
              disabled={isSubmitting}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary text-on-primary rounded-xl font-body font-semibold hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              Publish Now
            </button>
          </div>

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
            <div className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-xl overflow-hidden focus-within:border-primary transition-colors">
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Tulis ringkasan singkat atau meta description untuk SEO..."
                className="w-full h-28 p-4 font-body text-primary placeholder:text-outline focus:outline-none resize-none bg-transparent block"
              />
            </div>
          </div>

          <div className="bg-surface border border-surface-container rounded-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-primary">Cover Image</h3>
              <button
                type="button"
                onClick={() => setIsMediaModalOpen(true)}
                className="p-1 rounded-md text-tertiary hover:bg-tertiary-container/30 transition-colors cursor-pointer"
                title="Add Media"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
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
              <div className="flex flex-col">
                <div 
                  className="border-2 border-dashed border-outline-variant/50 hover:border-primary/50 hover:bg-primary/5 rounded-xl p-6 flex flex-col items-center justify-center text-center transition-all cursor-pointer group"
                  onClick={() => setIsMediaPickerOpen(true)}
                >
                  <div className="w-12 h-12 rounded-full bg-surface-container group-hover:bg-primary/10 group-hover:text-primary flex items-center justify-center text-on-surface-variant transition-colors mb-3">
                    <ImageIcon className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-semibold text-primary mb-1">Pilih dari Media Gallery</p>
                  <p className="text-xs text-outline">Klik untuk membuka gallery</p>
                </div>
                
                <div className="mt-4 flex items-center gap-3">
                  <div className="h-px flex-1 bg-surface-container"></div>
                  <span className="text-[10px] font-bold text-outline tracking-wider">ATAU PASTE URL</span>
                  <div className="h-px flex-1 bg-surface-container"></div>
                </div>
                
                <input 
                  type="text"
                  placeholder="https://utfs.io/f/..."
                  value={featuredImage}
                  onChange={(e) => setFeaturedImage(e.target.value)}
                  className="mt-4 w-full text-sm p-2.5 border border-surface-container rounded-xl focus:outline-none focus:border-primary bg-surface-container-lowest text-primary placeholder:text-outline-variant"
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
              <div 
                className="w-full p-3 bg-surface-container-lowest border border-outline-variant/50 rounded-xl font-body text-primary cursor-pointer flex justify-between items-center hover:border-primary/50 transition-colors"
                onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
              >
                <span>
                  {categoryId 
                    ? categories.find(c => c.id === categoryId)?.name 
                    : <span className="text-outline">Select a category</span>}
                </span>
                <svg className={`w-5 h-5 text-outline transition-transform duration-200 ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>

              {isCategoryDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setIsCategoryDropdownOpen(false)}
                  />
                  <div className="absolute top-full left-0 right-0 mt-2 bg-surface-container-lowest border border-surface-container rounded-xl shadow-lg z-50 overflow-hidden py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                    {categories.length === 0 ? (
                      <div className="px-4 py-3 text-sm text-outline text-center">Belum ada kategori</div>
                    ) : (
                      categories.map((cat) => (
                        <div
                          key={cat.id}
                          className={`px-4 py-2.5 text-sm cursor-pointer transition-colors ${
                            categoryId === cat.id 
                              ? 'bg-primary/10 text-primary font-semibold' 
                              : 'text-on-surface hover:bg-surface-container'
                          }`}
                          onClick={() => {
                            setCategoryId(cat.id);
                            setIsCategoryDropdownOpen(false);
                          }}
                        >
                          {cat.name}
                        </div>
                      ))
                    )}
                  </div>
                </>
              )}
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

      <UploadMediaModal
        isOpen={isMediaModalOpen}
        onClose={() => setIsMediaModalOpen(false)}
        onUploadComplete={(url) => setFeaturedImage(url)}
      />

      <MediaPickerModal
        isOpen={isMediaPickerOpen}
        onClose={() => setIsMediaPickerOpen(false)}
        onSelect={(url) => setFeaturedImage(url)}
      />
    </div>
  );
}
