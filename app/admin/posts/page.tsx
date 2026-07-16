import Link from "next/link";
import { Plus, Edit, Trash2, ExternalLink, FileText } from "lucide-react";
import { prisma } from "@/lib/prisma";

// Add this to prevent static generation errors if there's no DB connection during build
export const dynamic = "force-dynamic";

export default async function AdminPostsPage() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      categories: true,
      author: true,
    }
  });

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-primary mb-2 flex items-center gap-3">
            <FileText className="w-8 h-8 text-tertiary" />
            Articles
          </h1>
          <p className="font-body text-on-surface-variant mt-1">
            Kelola semua artikel blog dan berita perusahaan Anda.
          </p>
        </div>
        <Link 
          href="/admin/posts/create"
          className="flex items-center gap-2 px-6 py-3 bg-primary text-on-primary rounded-xl font-body font-semibold hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Create New Article
        </Link>
      </div>

      <div className="bg-surface border border-outline-variant/50 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-body">
            <thead className="bg-surface-container-lowest border-b border-outline-variant/50">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-primary whitespace-nowrap">Title</th>
                <th className="px-6 py-4 text-sm font-semibold text-primary whitespace-nowrap">Status</th>
                <th className="px-6 py-4 text-sm font-semibold text-primary whitespace-nowrap">Date</th>
                <th className="px-6 py-4 text-sm font-semibold text-primary whitespace-nowrap text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30">
              {posts.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center">
                    <FileText className="w-12 h-12 text-outline mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-semibold text-primary mb-1">Belum ada Artikel</h3>
                    <p className="text-on-surface-variant text-sm">Klik "Create New Article" untuk mulai menulis.</p>
                  </td>
                </tr>
              ) : (
                posts.map((post) => (
                  <tr key={post.id} className="hover:bg-surface-container-lowest/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-primary mb-1 line-clamp-1">{post.title}</div>
                      <div className="text-sm text-on-surface-variant line-clamp-1 hidden sm:block">
                        {post.slug}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        post.isPublished 
                          ? "bg-green-100 text-green-700" 
                          : "bg-amber-100 text-amber-700"
                      }`}>
                        {post.isPublished ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-on-surface-variant whitespace-nowrap">
                      {new Date(post.createdAt).toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "short",
                        day: "numeric"
                      })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {post.isPublished && (
                          <Link 
                            href={`/blog/${post.slug}`}
                            target="_blank"
                            className="p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-lg transition-colors cursor-pointer"
                            title="View Public Page"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                        )}
                        <Link 
                          href={`/admin/posts/${post.id}/edit`}
                          className="p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-lg transition-colors cursor-pointer"
                          title="Edit Article"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button 
                          className="p-2 text-on-surface-variant hover:text-error hover:bg-error/10 rounded-lg transition-colors cursor-pointer"
                          title="Delete Article"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
