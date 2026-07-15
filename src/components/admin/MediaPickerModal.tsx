"use client";

import { useState, useEffect } from "react";
import { X, Image as ImageIcon, Loader2, UploadCloud, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { getMedia } from "../../../app/admin/media/actions";
import { UploadMediaModal } from "./UploadMediaModal";

interface MediaItem {
  id: string;
  url: string;
  key: string;
  name: string;
  size: number;
  type: string;
  createdAt: Date;
}

interface MediaPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect?: (url: string) => void;
  multiple?: boolean;
  onSelectMultiple?: (urls: string[]) => void;
}

export function MediaPickerModal({ isOpen, onClose, onSelect, multiple, onSelectMultiple }: MediaPickerModalProps) {
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [selectedUrls, setSelectedUrls] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const fetchMedia = async () => {
    setIsLoading(true);
    try {
      const data = await getMedia();
      setMediaList(data);
    } catch (err) {
      console.error("Failed to fetch media:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchMedia();
      setSelectedUrls([]); // Reset selection when modal opens
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={onClose}
        />
        
        {/* Modal */}
        <div className="bg-surface rounded-2xl shadow-xl w-full max-w-4xl h-[80vh] flex flex-col relative z-10 animate-in fade-in zoom-in-95 duration-200">
          
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-surface-container shrink-0">
            <div>
              <h2 className="font-display font-semibold text-xl text-primary">
                Media Gallery
              </h2>
              <p className="text-sm text-on-surface-variant">
                Pilih gambar untuk disisipkan.
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              {multiple && selectedUrls.length > 0 && (
                <button
                  onClick={() => {
                    if (onSelectMultiple) onSelectMultiple(selectedUrls);
                    onClose();
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-xl font-body font-semibold hover:bg-primary/90 transition-colors cursor-pointer mr-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Gunakan {selectedUrls.length} Gambar
                </button>
              )}
              <button
                onClick={() => setIsUploadModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-xl font-body font-semibold hover:bg-primary/90 transition-colors cursor-pointer"
              >
                <UploadCloud className="w-4 h-4" />
                Upload Baru
              </button>
              <button
                onClick={onClose}
                className="p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {isLoading ? (
              <div className="w-full h-full flex flex-col items-center justify-center text-primary">
                <Loader2 className="w-8 h-8 animate-spin mb-4" />
                <p className="font-body font-medium">Memuat gallery...</p>
              </div>
            ) : mediaList.length === 0 ? (
              <div className="w-full h-full flex flex-col items-center justify-center text-on-surface-variant text-center">
                <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center mb-4">
                  <ImageIcon className="w-8 h-8 text-outline" />
                </div>
                <h3 className="font-display font-semibold text-lg text-primary mb-2">Gallery Kosong</h3>
                <p className="max-w-sm mb-6">Belum ada media yang di-upload. Klik tombol Upload Baru untuk menambahkan gambar.</p>
                <button
                  onClick={() => setIsUploadModalOpen(true)}
                  className="px-6 py-3 bg-primary text-on-primary rounded-xl font-body font-semibold hover:bg-primary/90 transition-colors cursor-pointer"
                >
                  Upload Gambar Pertama
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {mediaList.map((media) => (
                  <div 
                    key={media.id} 
                    className={`relative aspect-square rounded-xl overflow-hidden group border-2 cursor-pointer bg-surface-container-lowest transition-all ${selectedUrls.includes(media.url) ? 'border-primary ring-2 ring-primary/20 scale-95' : 'border-surface-container'}`}
                    onClick={() => {
                      if (multiple) {
                        setSelectedUrls(prev => 
                          prev.includes(media.url) 
                            ? prev.filter(u => u !== media.url)
                            : [...prev, media.url]
                        );
                      } else {
                        if (onSelect) onSelect(media.url);
                        onClose();
                      }
                    }}
                  >
                    <Image 
                      src={media.url} 
                      alt={media.name} 
                      fill 
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105" 
                    />
                    
                    {multiple && selectedUrls.includes(media.url) && (
                      <div className="absolute inset-0 bg-primary/20 flex items-center justify-center backdrop-blur-[1px]">
                        <CheckCircle2 className="w-8 h-8 text-white drop-shadow-md" />
                      </div>
                    )}
                    
                    {!multiple && (
                      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all bg-surface/90 text-primary px-3 py-1.5 rounded-lg text-sm font-semibold shadow-sm backdrop-blur-sm">
                          Pilih Gambar
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

      <UploadMediaModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUploadComplete={(url) => {
          if (multiple) {
            setSelectedUrls(prev => [...prev, url]);
            fetchMedia(); // Refresh list so new image appears
            setIsUploadModalOpen(false);
          } else {
            if (onSelect) onSelect(url);
            setIsUploadModalOpen(false);
            onClose();
          }
        }}
      />
    </>
  );
}
