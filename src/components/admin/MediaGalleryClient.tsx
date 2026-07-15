"use client";

import { useState } from "react";
import { Image as ImageIcon, PlusCircle, Copy, Trash2, Check, Loader2 } from "lucide-react";
import Image from "next/image";
import { UploadMediaModal } from "./UploadMediaModal";
import { deleteMedia } from "../../../app/admin/media/actions";

interface MediaItem {
  id: string;
  url: string;
  key: string;
  name: string;
  size: number;
  type: string;
  createdAt: Date;
}

interface MediaGalleryClientProps {
  initialMedia: MediaItem[];
}

export function MediaGalleryClient({ initialMedia }: MediaGalleryClientProps) {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleCopy = async (id: string, url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Failed to copy URL:", err);
    }
  };

  const handleDelete = async (id: string, key: string) => {
    if (!confirm("Are you sure you want to delete this media? This action cannot be undone.")) return;
    
    setDeletingId(id);
    const result = await deleteMedia(id, key);
    setDeletingId(null);
    
    if (!result.success) {
      alert(result.error || "Failed to delete media.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-primary mb-2 flex items-center gap-3">
            <ImageIcon className="w-8 h-8 text-tertiary" />
            Media Library
          </h1>
          <p className="font-body text-on-surface-variant mt-1">
            Manage all your uploaded images and files.
          </p>
        </div>
        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-on-primary rounded-xl font-body font-semibold hover:bg-primary/90 transition-colors cursor-pointer"
        >
          <PlusCircle className="w-5 h-5" />
          Upload New Media
        </button>
      </div>

      <div className="bg-surface border border-surface-container rounded-2xl p-6 min-h-[400px]">
        {initialMedia.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <ImageIcon className="w-12 h-12 text-outline mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold text-primary mb-1">No Media Found</h3>
            <p className="text-on-surface-variant text-sm mb-6">Upload your first image to start building your gallery.</p>
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="px-6 py-2.5 bg-secondary text-on-secondary rounded-xl font-body font-medium hover:bg-secondary/90 transition-colors cursor-pointer"
            >
              Upload Now
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {initialMedia.map((media) => (
              <div key={media.id} className="group bg-surface-container-lowest border border-surface-container rounded-xl overflow-hidden hover:border-primary/30 transition-all shadow-sm hover:shadow-md relative">
                
                {/* Image Thumbnail */}
                <div className="relative aspect-square bg-surface-container-low w-full flex items-center justify-center overflow-hidden">
                  <Image 
                    src={media.url} 
                    alt={media.name} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                  />
                  
                  {/* Actions Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button
                      onClick={() => handleCopy(media.id, media.url)}
                      className="p-2 bg-surface text-primary hover:bg-primary hover:text-on-primary rounded-full transition-colors cursor-pointer shadow-sm"
                      title="Copy URL"
                    >
                      {copiedId === media.id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => handleDelete(media.id, media.key)}
                      disabled={deletingId === media.id}
                      className="p-2 bg-surface text-error hover:bg-error hover:text-on-error rounded-full transition-colors cursor-pointer shadow-sm disabled:opacity-50"
                      title="Delete Image"
                    >
                      {deletingId === media.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Details */}
                <div className="p-3">
                  <p className="text-sm font-semibold text-primary truncate" title={media.name}>
                    {media.name}
                  </p>
                  <div className="flex items-center justify-between mt-1 text-xs text-on-surface-variant">
                    <span>{formatBytes(media.size)}</span>
                    <span>
                      {new Date(media.createdAt).toLocaleDateString("id-ID", {
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                      })}
                    </span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

      <UploadMediaModal 
        isOpen={isUploadModalOpen} 
        onClose={() => setIsUploadModalOpen(false)} 
      />
    </div>
  );
}
