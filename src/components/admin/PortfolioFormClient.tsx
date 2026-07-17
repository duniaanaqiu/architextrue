"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Loader2, Image as ImageIcon, Plus, Trash2, CalendarIcon, MapPin, Building, Clock, Star } from "lucide-react";
import Link from "next/link";
import { Editor } from "./Editor";
import Image from "next/image";
import { MediaPickerModal } from "./MediaPickerModal";
import { createPortfolio, updatePortfolio } from "../../../app/admin/portfolios/actions";

interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
  image?: string | null;
}

interface Portfolio {
  id: string;
  title: string;
  slug: string;
  description: string;
  images: string[];
  location: string;
  serviceType: "JASA_BANGUN_RUMAH" | "JASA_RENOVASI_RUMAH";
  area: number;
  duration: string;
  completedAt: Date;
  testimonial?: Testimonial | null;
}

interface PortfolioFormClientProps {
  portfolio?: Portfolio;
}

export function PortfolioFormClient({ portfolio }: PortfolioFormClientProps) {
  const router = useRouter();
  
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [location, setLocation] = useState("");
  const [serviceType, setServiceType] = useState<"JASA_BANGUN_RUMAH" | "JASA_RENOVASI_RUMAH">("JASA_BANGUN_RUMAH");
  const [area, setArea] = useState<string>("");
  const [duration, setDuration] = useState("");
  const [completedAt, setCompletedAt] = useState("");

  // Testimonial State
  const [hasTestimonial, setHasTestimonial] = useState(false);
  const [testiName, setTestiName] = useState("");
  const [testiRole, setTestiRole] = useState("");
  const [testiContent, setTestiContent] = useState("");
  const [testiRating, setTestiRating] = useState("5");
  const [testiImage, setTestiImage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
  const [isTestiMediaPickerOpen, setIsTestiMediaPickerOpen] = useState(false);
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);
  
  const [fieldErrors, setFieldErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (portfolio) {
      setTitle(portfolio.title);
      setSlug(portfolio.slug);
      setDescription(portfolio.description);
      setImages(portfolio.images);
      setLocation(portfolio.location);
      setServiceType(portfolio.serviceType);
      setArea(portfolio.area.toString());
      setDuration(portfolio.duration);
      setCompletedAt(new Date(portfolio.completedAt).toISOString().split('T')[0]);

      if (portfolio.testimonial) {
        setHasTestimonial(true);
        setTestiName(portfolio.testimonial.name);
        setTestiRole(portfolio.testimonial.role);
        setTestiContent(portfolio.testimonial.content);
        setTestiRating(portfolio.testimonial.rating.toString());
        setTestiImage(portfolio.testimonial.image || "");
      }
    }
  }, [portfolio]);

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

  const handleSubmit = async () => {
    const errors: Record<string, boolean> = {};
    if (!title) errors.title = true;
    if (!slug) errors.slug = true;
    if (!description || description === '<p></p>') errors.description = true;
    if (images.length === 0) errors.images = true;
    if (!location) errors.location = true;
    if (!area) errors.area = true;
    if (!duration) errors.duration = true;
    if (!completedAt) errors.completedAt = true;

    if (hasTestimonial) {
      if (!testiName) errors.testiName = true;
      if (!testiRole) errors.testiRole = true;
      if (!testiContent) errors.testiContent = true;
      if (!testiRating) errors.testiRating = true;
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setError("Please fill in all required fields marked in red.");
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setFieldErrors({});
    setIsSubmitting(true);
    setError("");

    const data = {
      title,
      slug,
      description,
      images,
      location,
      serviceType,
      area: parseInt(area),
      duration,
      completedAt: new Date(completedAt),
      testimonial: hasTestimonial ? {
        name: testiName,
        role: testiRole,
        content: testiContent,
        rating: parseInt(testiRating),
        image: testiImage || undefined
      } : null
    };

    try {
      let result;
      if (portfolio) {
        result = await updatePortfolio(portfolio.id, data);
      } else {
        result = await createPortfolio(data);
      }

      if (result.success) {
        router.push("/admin/portfolios");
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

  const removeImage = (indexToRemove: number) => {
    setImages(images.filter((_, idx) => idx !== indexToRemove));
  };

  return (
    <div className="w-full max-w-6xl mx-auto pb-12">
      <div className="mb-4">
        <Link 
          href="/admin/portfolios"
          className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-body w-fit"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Portfolios
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
              {portfolio ? "Edit Portfolio" : "Create New Portfolio"}
            </h1>
          </div>

          {/* MAIN INFO */}
          <div className="bg-surface border border-surface-container rounded-2xl p-6">
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              placeholder="Project Title..."
              className={`w-full text-4xl font-display font-bold placeholder:text-outline-variant/50 focus:outline-none bg-transparent ${fieldErrors.title ? 'text-error placeholder:text-error/50' : 'text-primary'}`}
            />
            
            <div className="flex flex-col mt-4">
              <label className="text-sm font-semibold text-primary mb-1">URL Slug</label>
              <div className="flex items-center text-sm font-body">
                <span className="text-on-surface-variant">architextrue.com/portfolio/</span>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="project-slug"
                  className={`flex-1 focus:outline-none bg-transparent ml-1 placeholder:text-outline-variant ${fieldErrors.slug ? 'text-error border-b border-error' : 'text-primary'}`}
                />
              </div>
            </div>
          </div>

          {/* CONTENT / DESCRIPTION */}
          <div className="bg-surface border border-surface-container rounded-2xl p-6">
            <h3 className={`font-semibold mb-4 ${fieldErrors.description ? 'text-error' : 'text-primary'}`}>Project Description</h3>
            <div className={`min-h-[400px] rounded-lg ${fieldErrors.description ? 'border border-error' : ''}`}>
              <Editor content={description} onChange={setDescription} />
            </div>
          </div>

          {/* GALLERY */}
          <div className="bg-surface border border-surface-container rounded-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className={`font-semibold ${fieldErrors.images ? 'text-error' : 'text-primary'}`}>Project Gallery</h3>
              <button
                type="button"
                onClick={() => setIsMediaPickerOpen(true)}
                className="p-1 rounded-md text-tertiary hover:bg-tertiary-container/30 transition-colors cursor-pointer flex items-center gap-1 text-sm font-semibold pr-3"
              >
                <Plus className="w-4 h-4" /> Add Images
              </button>
            </div>
            
            {images.length === 0 ? (
              <div className="flex flex-col">
                <div 
                  className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-center transition-all cursor-pointer group ${fieldErrors.images ? 'border-error/50 hover:border-error bg-error/5' : 'border-outline-variant/50 hover:border-primary/50 hover:bg-primary/5'}`}
                  onClick={() => setIsMediaPickerOpen(true)}
                >
                  <div className="w-12 h-12 rounded-full bg-surface-container group-hover:bg-primary/10 group-hover:text-primary flex items-center justify-center text-on-surface-variant transition-colors mb-3">
                    <ImageIcon className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-semibold text-primary mb-1">Pilih dari Media Gallery</p>
                  <p className="text-xs text-outline">Pilih satu atau lebih gambar</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {images.map((img, idx) => (
                  <div key={idx} className="relative aspect-video rounded-xl overflow-hidden group border border-surface-container">
                    <Image src={img} alt={`Gallery ${idx+1}`} fill className="object-cover" />
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/40 transition-colors" />
                    <button
                      onClick={() => removeImage(idx)}
                      className="absolute top-2 right-2 p-1.5 bg-error text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-error/90"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    {idx === 0 && (
                      <div className="absolute bottom-2 left-2 px-2 py-1 bg-surface/90 backdrop-blur-sm text-[10px] font-bold text-primary rounded-md">
                        COVER
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* TESTIMONIAL */}
          <div className="bg-surface border border-surface-container rounded-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-primary">Client Testimonial</h3>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={hasTestimonial} onChange={(e) => setHasTestimonial(e.target.checked)} className="sr-only peer" />
                <div className="w-11 h-6 bg-surface-container peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            
            {hasTestimonial && (
              <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className={`text-sm font-semibold mb-1 ${fieldErrors.testiName ? 'text-error' : 'text-primary'}`}>Client Name</label>
                    <input type="text" value={testiName} onChange={e => setTestiName(e.target.value)} className={`p-2 border rounded-lg focus:outline-none text-sm bg-surface-container-lowest ${fieldErrors.testiName ? 'border-error focus:border-error' : 'border-surface-container focus:border-primary'}`} />
                  </div>
                  <div className="flex flex-col">
                    <label className={`text-sm font-semibold mb-1 ${fieldErrors.testiRole ? 'text-error' : 'text-primary'}`}>Role (Contoh: Pemilik Rumah)</label>
                    <input type="text" value={testiRole} onChange={e => setTestiRole(e.target.value)} className={`p-2 border rounded-lg focus:outline-none text-sm bg-surface-container-lowest ${fieldErrors.testiRole ? 'border-error focus:border-error' : 'border-surface-container focus:border-primary'}`} />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className={`text-sm font-semibold mb-1 ${fieldErrors.testiContent ? 'text-error' : 'text-primary'}`}>Feedback / Message</label>
                  <textarea value={testiContent} onChange={e => setTestiContent(e.target.value)} className={`p-2 border rounded-lg focus:outline-none text-sm bg-surface-container-lowest min-h-[100px] ${fieldErrors.testiContent ? 'border-error focus:border-error' : 'border-surface-container focus:border-primary'}`} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className={`text-sm font-semibold mb-1 ${fieldErrors.testiRating ? 'text-error' : 'text-primary'}`}>Rating (1-5)</label>
                    <input type="number" min="1" max="5" value={testiRating} onChange={e => setTestiRating(e.target.value)} className={`p-2 border rounded-lg focus:outline-none text-sm bg-surface-container-lowest ${fieldErrors.testiRating ? 'border-error focus:border-error' : 'border-surface-container focus:border-primary'}`} />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm font-semibold text-primary mb-1">Client Avatar URL (Optional)</label>
                    <div className="flex gap-2">
                      <input type="text" value={testiImage} onChange={e => setTestiImage(e.target.value)} className="flex-1 p-2 border border-surface-container rounded-lg focus:outline-none focus:border-primary text-sm bg-surface-container-lowest" />
                      <button type="button" onClick={() => setIsTestiMediaPickerOpen(true)} className="px-3 py-2 bg-surface-container rounded-lg hover:bg-surface-container-high transition-colors"><ImageIcon className="w-4 h-4" /></button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* SIDEBAR PROPERTIES */}
        <div className="space-y-6">
          <div className="bg-surface border border-surface-container rounded-2xl p-6">
            <h3 className="font-semibold text-primary mb-4">Project Details</h3>
            
            <div className="space-y-4">
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-primary mb-1 flex items-center gap-1.5"><Building className="w-4 h-4" /> Service Type</label>
                <div className="relative group">
                  <div 
                    className="w-full p-3 bg-surface-container-lowest border border-surface-container rounded-xl font-body text-primary cursor-pointer flex justify-between items-center hover:border-primary/50 transition-colors"
                    onClick={() => setIsServiceDropdownOpen(!isServiceDropdownOpen)}
                  >
                    <span>
                      {serviceType === "JASA_BANGUN_RUMAH" ? "Jasa Bangun Rumah" : "Jasa Renovasi Rumah"}
                    </span>
                    <svg className={`w-5 h-5 text-outline transition-transform duration-200 ${isServiceDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>

                  {isServiceDropdownOpen && (
                    <>
                      <div 
                        className="fixed inset-0 z-40" 
                        onClick={() => setIsServiceDropdownOpen(false)}
                      />
                      <div className="absolute top-full left-0 right-0 mt-2 bg-surface-container-lowest border border-surface-container rounded-xl shadow-lg z-50 overflow-hidden py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                        <div
                          className={`px-4 py-2.5 text-sm cursor-pointer transition-colors ${
                            serviceType === "JASA_BANGUN_RUMAH" 
                              ? 'bg-primary/10 text-primary font-semibold' 
                              : 'text-on-surface hover:bg-surface-container'
                          }`}
                          onClick={() => {
                            setServiceType("JASA_BANGUN_RUMAH");
                            setIsServiceDropdownOpen(false);
                          }}
                        >
                          Jasa Bangun Rumah
                        </div>
                        <div
                          className={`px-4 py-2.5 text-sm cursor-pointer transition-colors ${
                            serviceType === "JASA_RENOVASI_RUMAH" 
                              ? 'bg-primary/10 text-primary font-semibold' 
                              : 'text-on-surface hover:bg-surface-container'
                          }`}
                          onClick={() => {
                            setServiceType("JASA_RENOVASI_RUMAH");
                            setIsServiceDropdownOpen(false);
                          }}
                        >
                          Jasa Renovasi Rumah
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="flex flex-col">
                <label className={`text-sm font-semibold mb-1 flex items-center gap-1.5 ${fieldErrors.location ? 'text-error' : 'text-primary'}`}><MapPin className="w-4 h-4" /> Location</label>
                <input type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder="Contoh: Sleman, Yogyakarta" className={`p-2.5 border rounded-lg focus:outline-none text-sm bg-surface-container-lowest ${fieldErrors.location ? 'border-error focus:border-error' : 'border-surface-container focus:border-primary'}`} />
              </div>

              <div className="flex flex-col">
                <label className={`text-sm font-semibold mb-1 flex items-center gap-1.5 ${fieldErrors.area ? 'text-error' : 'text-primary'}`}>Luas Area (m²)</label>
                <input type="number" value={area} onChange={e => setArea(e.target.value)} placeholder="Contoh: 150" className={`p-2.5 border rounded-lg focus:outline-none text-sm bg-surface-container-lowest ${fieldErrors.area ? 'border-error focus:border-error' : 'border-surface-container focus:border-primary'}`} />
              </div>

              <div className="flex flex-col">
                <label className={`text-sm font-semibold mb-1 flex items-center gap-1.5 ${fieldErrors.duration ? 'text-error' : 'text-primary'}`}><Clock className="w-4 h-4" /> Duration</label>
                <input type="text" value={duration} onChange={e => setDuration(e.target.value)} placeholder="Contoh: 6 bulan" className={`p-2.5 border rounded-lg focus:outline-none text-sm bg-surface-container-lowest ${fieldErrors.duration ? 'border-error focus:border-error' : 'border-surface-container focus:border-primary'}`} />
              </div>

              <div className="flex flex-col">
                <label className={`text-sm font-semibold mb-1 flex items-center gap-1.5 ${fieldErrors.completedAt ? 'text-error' : 'text-primary'}`}><CalendarIcon className="w-4 h-4" /> Completed Date</label>
                <input type="date" value={completedAt} onChange={e => setCompletedAt(e.target.value)} className={`p-2.5 border rounded-lg focus:outline-none text-sm bg-surface-container-lowest ${fieldErrors.completedAt ? 'border-error focus:border-error' : 'border-surface-container focus:border-primary'}`} />
              </div>
            </div>
          </div>

          <div className="bg-surface border border-surface-container rounded-2xl p-6">
            <button
              onClick={() => handleSubmit()}
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-on-primary hover:bg-primary/90 border border-transparent rounded-xl font-body font-semibold transition-all cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              {isSubmitting ? "Saving..." : "Save Portfolio"}
            </button>
          </div>
        </div>
      </div>

      <MediaPickerModal
        isOpen={isMediaPickerOpen}
        onClose={() => setIsMediaPickerOpen(false)}
        multiple={true}
        onSelectMultiple={(urls) => setImages(prev => [...prev, ...urls])}
      />

      <MediaPickerModal
        isOpen={isTestiMediaPickerOpen}
        onClose={() => setIsTestiMediaPickerOpen(false)}
        onSelect={(url) => setTestiImage(url)}
      />
    </div>
  );
}
