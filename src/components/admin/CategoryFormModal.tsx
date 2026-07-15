"use client";

import { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import { createCategory, updateCategory } from "../../../app/admin/categories/actions";

interface CategoryFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: { id: string; name: string; slug: string } | null;
}

export function CategoryFormModal({ isOpen, onClose, initialData }: CategoryFormModalProps) {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setSlug(initialData.slug);
    } else {
      setName("");
      setSlug("");
    }
    setError("");
  }, [initialData, isOpen]);

  // Auto-generate slug from name if slug is not manually edited
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    
    // Only auto-update slug if we're creating new, or if user hasn't explicitly un-linked them
    if (!initialData) {
      setSlug(
        newName
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "")
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !slug.trim()) return;

    setIsLoading(true);
    setError("");

    try {
      let res;
      if (initialData) {
        res = await updateCategory(initialData.id, { name, slug });
      } else {
        res = await createCategory({ name, slug });
      }

      if (res.error) {
        setError(res.error);
      } else {
        onClose();
      }
    } catch (err) {
      setError("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-primary/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-surface rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-6 border-b border-surface-container">
          <h2 className="font-display font-semibold text-xl text-primary">
            {initialData ? "Edit Category" : "New Category"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-error/10 text-error text-sm rounded-lg border border-error/20">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-primary">Category Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={handleNameChange}
              className="w-full px-4 py-3 bg-surface border border-outline-variant/50 rounded-xl font-body text-primary placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
              placeholder="Contoh: Arsitektur"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="slug" className="text-sm font-medium text-primary">URL Slug</label>
            <input
              id="slug"
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full px-4 py-3 bg-surface border border-outline-variant/50 rounded-xl font-body text-primary placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
              placeholder="arsitektur"
              required
            />
            <p className="text-xs text-on-surface-variant">
              Gunakan huruf kecil, angka, dan tanda hubung (-).
            </p>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-5 py-2.5 rounded-xl font-medium text-on-surface-variant hover:bg-surface-container transition-colors disabled:opacity-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-5 py-2.5 rounded-xl font-medium bg-primary text-on-primary hover:bg-primary/90 transition-colors flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              {initialData ? "Save Changes" : "Create Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
