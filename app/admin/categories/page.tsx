"use client";

import { useState, useEffect } from "react";
import { PlusCircle, Pencil, Trash2, FolderOpen, Loader2 } from "lucide-react";
import { getCategories, deleteCategory } from "./actions";
import { CategoryFormModal } from "@/components/admin/CategoryFormModal";

type Category = {
  id: string;
  name: string;
  slug: string;
  _count: { posts: number };
  createdAt: Date;
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreate = () => {
    setEditingCategory(null);
    setIsModalOpen(true);
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Apakah Anda yakin ingin menghapus kategori "${name}"?`)) return;
    
    try {
      const res = await deleteCategory(id);
      if (res.error) {
        alert(res.error);
      } else {
        fetchCategories(); // Refresh table
      }
    } catch (error) {
      alert("Terjadi kesalahan saat menghapus.");
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    fetchCategories(); // Refresh after create/edit
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-primary mb-2 flex items-center gap-3">
            <FolderOpen className="w-8 h-8 text-tertiary" />
            Categories
          </h1>
          <p className="font-body text-on-surface-variant">
            Kelola kategori untuk mengelompokkan artikel-artikel Anda.
          </p>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-on-primary rounded-xl font-body font-semibold hover:bg-primary/90 transition-colors cursor-pointer"
        >
          <PlusCircle className="w-5 h-5" />
          Create New Category
        </button>
      </div>

      <div className="bg-surface border border-outline-variant/50 rounded-3xl overflow-hidden shadow-sm">
        {isLoading ? (
          <div className="p-12 flex justify-center items-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary/50" />
          </div>
        ) : categories.length === 0 ? (
          <div className="p-12 text-center">
            <FolderOpen className="w-12 h-12 text-outline mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold text-primary mb-1">No Categories Found</h3>
            <p className="text-on-surface-variant text-sm">Create your first category to group your articles.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left font-body">
              <thead className="bg-surface-container-lowest border-b border-outline-variant/50">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold text-primary">Category Name</th>
                  <th className="px-6 py-4 text-sm font-semibold text-primary">Slug</th>
                  <th className="px-6 py-4 text-sm font-semibold text-primary">Articles Count</th>
                  <th className="px-6 py-4 text-sm font-semibold text-primary text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/30">
                {categories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-surface-container-lowest/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-primary">
                      {cat.name}
                    </td>
                    <td className="px-6 py-4 text-on-surface-variant text-sm">
                      <span className="px-2.5 py-1 bg-surface-container rounded-md font-mono text-xs">
                        {cat.slug}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-on-surface-variant text-sm">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/5 text-primary font-medium">
                        {cat._count.posts}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(cat)}
                          className="p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-lg transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(cat.id, cat.name)}
                          className="p-2 text-on-surface-variant hover:text-error hover:bg-error/10 rounded-lg transition-colors cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <CategoryFormModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        initialData={editingCategory}
      />
    </div>
  );
}
