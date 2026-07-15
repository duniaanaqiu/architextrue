"use client";

import { X } from "lucide-react";
import { UploadDropzone } from "@/utils/uploadthing";
import { useRouter } from "next/navigation";

interface UploadMediaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UploadMediaModal({ isOpen, onClose }: UploadMediaModalProps) {
  const router = useRouter();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="bg-surface rounded-2xl shadow-xl w-full max-w-lg overflow-hidden relative z-10 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-6 border-b border-surface-container">
          <h2 className="font-display font-semibold text-xl text-primary">
            Upload New Media
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6">
          <p className="text-on-surface-variant mb-6 text-sm">
            Tarik dan lepas gambar ke area di bawah ini, atau klik untuk memilih file dari perangkat Anda. (Maksimal 4MB per gambar)
          </p>
          <UploadDropzone
            endpoint="imageUploader"
            appearance={{
              button: "bg-primary text-on-primary hover:bg-primary/90 font-body rounded-xl px-4 py-2 !cursor-pointer mt-4",
              label: "text-primary font-body font-semibold hover:text-primary/80 cursor-pointer",
              allowedContent: "text-on-surface-variant text-sm mt-2",
              container: "border-2 border-dashed border-outline-variant/50 rounded-2xl bg-surface-container-lowest p-8 cursor-pointer",
            }}
            content={{
              label: "Tarik dan lepas gambar ke sini",
              allowedContent: "Mendukung format gambar maksimal 4MB",
            }}
            onClientUploadComplete={(res) => {
              router.refresh();
              onClose();
            }}
            onUploadError={(error: Error) => {
              alert(`Upload Error: ${error.message}`);
            }}
          />
        </div>
      </div>
    </div>
  );
}
