"use client";

import { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { BlogCard } from "./BlogCard";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface PostProps {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: string | null;
  publishedAt: Date | null;
  readingTime: number;
  categories: Category[];
}

interface BlogListClientProps {
  initialPosts: PostProps[];
  categories: Category[];
}

export function BlogListClient({ initialPosts, categories }: BlogListClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isSearching, setIsSearching] = useState(false);

  // Debounced search could be added here, but for client-side filtering on a small set, synchronous is fine.
  
  const filteredPosts = initialPosts.filter((post) => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCategory = 
      selectedCategory === "all" || 
      post.categories.some((cat) => cat.slug === selectedCategory);

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-12">
      {/* Search & Filters */}
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-outline group-focus-within:text-primary transition-colors">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari artikel seputar arsitektur, desain, atau tips renovasi..."
            className="w-full pl-12 pr-4 py-4 bg-surface-container-lowest border-2 border-surface-container rounded-2xl font-body text-primary placeholder:text-outline focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300 shadow-sm"
          />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
              selectedCategory === "all"
                ? "bg-primary text-on-primary shadow-md transform scale-105"
                : "bg-surface border border-surface-container text-on-surface hover:border-primary/50 hover:bg-surface-container-low"
            }`}
          >
            Semua Artikel
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                selectedCategory === cat.slug
                  ? "bg-primary text-on-primary shadow-md transform scale-105"
                  : "bg-surface border border-surface-container text-on-surface hover:border-primary/50 hover:bg-surface-container-low"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-surface-container-lowest rounded-3xl border border-surface-container">
          <Search className="w-12 h-12 text-outline mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-display font-semibold text-primary mb-2">Pencarian Tidak Ditemukan</h3>
          <p className="text-on-surface-variant font-body max-w-md mx-auto">
            Maaf, kami tidak dapat menemukan artikel yang cocok dengan kata kunci "{searchQuery}" di kategori yang dipilih. Coba gunakan kata kunci lain.
          </p>
          <button 
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
            }}
            className="mt-6 px-6 py-2.5 bg-primary/10 text-primary font-semibold rounded-full hover:bg-primary/20 transition-colors"
          >
            Reset Pencarian
          </button>
        </div>
      )}
    </div>
  );
}
