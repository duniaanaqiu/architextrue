import Link from "next/link";
import { FileText, PlusCircle, ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic"; // Force HMR rebuild

export default async function AdminDashboardPage() {
  const postsCount = await prisma.post.count();
  const publishedCount = await prisma.post.count({ where: { isPublished: true } });
  const draftCount = postsCount - publishedCount;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="font-display text-4xl font-bold text-primary mb-2">Welcome back, Admin!</h1>
        <p className="font-body text-on-surface-variant text-lg">
          Berikut adalah ringkasan aktivitas dan konten di website Architextrue.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface border border-outline-variant/50 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-body font-semibold text-outline">Total Articles</h3>
            <div className="p-3 bg-blue-100 text-blue-700 rounded-xl">
              <FileText className="w-6 h-6" />
            </div>
          </div>
          <div>
            <div className="text-4xl font-display font-bold text-primary mb-1">{postsCount}</div>
            <p className="font-body text-sm text-outline">Artikel di database</p>
          </div>
        </div>

        <div className="bg-surface border border-outline-variant/50 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-body font-semibold text-outline">Published</h3>
            <div className="p-3 bg-green-100 text-green-700 rounded-xl">
              <FileText className="w-6 h-6" />
            </div>
          </div>
          <div>
            <div className="text-4xl font-display font-bold text-primary mb-1">{publishedCount}</div>
            <p className="font-body text-sm text-outline">Artikel tayang publik</p>
          </div>
        </div>

        <div className="bg-surface border border-outline-variant/50 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-body font-semibold text-outline">Drafts</h3>
            <div className="p-3 bg-amber-100 text-amber-700 rounded-xl">
              <FileText className="w-6 h-6" />
            </div>
          </div>
          <div>
            <div className="text-4xl font-display font-bold text-primary mb-1">{draftCount}</div>
            <p className="font-body text-sm text-outline">Menunggu dipublikasikan</p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="font-display text-2xl font-semibold text-primary mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link 
            href="/admin/posts/create"
            className="flex items-center justify-between p-6 bg-surface-container-lowest border border-outline-variant/50 hover:border-primary/30 rounded-2xl transition-all group shadow-sm hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-tertiary-container/20 text-tertiary rounded-xl group-hover:scale-110 transition-transform">
                <PlusCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-body font-semibold text-primary">Tulis Artikel Baru</h3>
                <p className="font-body text-sm text-outline">Buat konten dengan bantuan AI</p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-outline group-hover:text-primary transition-colors group-hover:translate-x-1" />
          </Link>
          
          <Link 
            href="/admin/posts"
            className="flex items-center justify-between p-6 bg-surface-container-lowest border border-outline-variant/50 hover:border-primary/30 rounded-2xl transition-all group shadow-sm hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary-container/20 text-primary rounded-xl group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-body font-semibold text-primary">Kelola Artikel</h3>
                <p className="font-body text-sm text-outline">Lihat dan edit semua artikel</p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-outline group-hover:text-primary transition-colors group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
