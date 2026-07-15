import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Edit, Trash2, MapPin, Building } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function PortfoliosPage() {
  const portfolios = await prisma.portfolio.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="p-4 sm:p-8 w-full max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-primary mb-2">Portfolios</h1>
          <p className="text-on-surface-variant">Kelola proyek portofolio perusahaan Anda.</p>
        </div>
        <Link 
          href="/admin/portfolios/create"
          className="flex items-center gap-2 px-6 py-3 bg-primary text-on-primary rounded-xl font-body font-semibold hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Create New Portfolio
        </Link>
      </div>

      <div className="bg-surface border border-surface-container rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-body">
            <thead className="bg-surface-container-lowest border-b border-surface-container text-sm font-semibold text-primary">
              <tr>
                <th className="px-6 py-4">TITLE</th>
                <th className="px-6 py-4">SERVICE & LOCATION</th>
                <th className="px-6 py-4">DATE COMPLETED</th>
                <th className="px-6 py-4">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container">
              {portfolios.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-on-surface-variant">
                    Belum ada portofolio yang ditambahkan.
                  </td>
                </tr>
              ) : (
                portfolios.map((portfolio) => (
                  <tr key={portfolio.id} className="hover:bg-surface-container-lowest/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-primary">{portfolio.title}</span>
                        <span className="text-xs text-outline">{portfolio.slug}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <span className="flex items-center gap-1.5 text-sm text-primary">
                          <Building className="w-3.5 h-3.5" />
                          {portfolio.serviceType === "JASA_BANGUN_RUMAH" ? "Bangun Rumah" : "Renovasi Rumah"}
                        </span>
                        <span className="flex items-center gap-1.5 text-xs text-on-surface-variant">
                          <MapPin className="w-3.5 h-3.5" />
                          {portfolio.location}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-on-surface-variant">
                        {new Date(portfolio.completedAt).toLocaleDateString('id-ID', {
                          day: 'numeric', month: 'short', year: 'numeric'
                        })}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Link 
                          href={`/admin/portfolios/${portfolio.id}/edit`}
                          className="p-2 text-on-surface-variant hover:text-primary transition-colors"
                          title="Edit Portfolio"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button 
                          className="p-2 text-on-surface-variant hover:text-error transition-colors cursor-pointer"
                          title="Delete Portfolio"
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
