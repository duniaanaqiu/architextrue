"use client";

import { useState, useEffect } from "react";
import { PlusCircle, Pencil, Trash2, Tags, Loader2 } from "lucide-react";
import { getTags, deleteTag } from "./actions";
import { TagFormModal } from "@/components/admin/TagFormModal";

type Tag = {
  id: string;
  name: string;
  slug: string;
  _count: { posts: number };
  createdAt: Date;
};

export default function TagsPage() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTag, setEditingTag] = useState<Tag | null>(null);

  const fetchTags = async () => {
    setIsLoading(true);
    try {
      const data = await getTags();
      setTags(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const handleCreate = () => {
    setEditingTag(null);
    setIsModalOpen(true);
  };

  const handleEdit = (tag: Tag) => {
    setEditingTag(tag);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Apakah Anda yakin ingin menghapus tag "${name}"?`)) return;
    
    try {
      const res = await deleteTag(id);
      if (res.error) {
        alert(res.error);
      } else {
        fetchTags(); // Refresh table
      }
    } catch (error) {
      alert("Terjadi kesalahan saat menghapus.");
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    fetchTags(); // Refresh after create/edit
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-primary mb-2 flex items-center gap-3">
            <Tags className="w-8 h-8 text-tertiary" />
            Tags
          </h1>
          <p className="font-body text-on-surface-variant">
            Kelola tag untuk mengelompokkan artikel secara lebih spesifik.
          </p>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-on-primary rounded-xl font-body font-semibold hover:bg-primary/90 transition-colors cursor-pointer shrink-0"
        >
          <PlusCircle className="w-5 h-5" />
          Create New Tag
        </button>
      </div>

      <div className="bg-surface border border-outline-variant/50 rounded-3xl overflow-hidden shadow-sm">
        {isLoading ? (
          <div className="p-12 flex justify-center items-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary/50" />
          </div>
        ) : tags.length === 0 ? (
          <div className="p-12 text-center">
            <Tags className="w-12 h-12 text-outline mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold text-primary mb-1">No Tags Found</h3>
            <p className="text-on-surface-variant text-sm">Create your first tag to group your articles specifically.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left font-body">
              <thead className="bg-surface-container-lowest border-b border-outline-variant/50">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold text-primary">Tag Name</th>
                  <th className="px-6 py-4 text-sm font-semibold text-primary">Slug</th>
                  <th className="px-6 py-4 text-sm font-semibold text-primary">Articles Count</th>
                  <th className="px-6 py-4 text-sm font-semibold text-primary text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/30">
                {tags.map((tag) => (
                  <tr key={tag.id} className="hover:bg-surface-container-lowest/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-primary">
                      {tag.name}
                    </td>
                    <td className="px-6 py-4 text-on-surface-variant text-sm">
                      <span className="px-2.5 py-1 bg-surface-container rounded-md font-mono text-xs">
                        {tag.slug}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-on-surface-variant text-sm">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/5 text-primary font-medium">
                        {tag._count.posts}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(tag)}
                          className="p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-lg transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(tag.id, tag.name)}
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

      <TagFormModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        initialData={editingTag}
      />
    </div>
  );
}
