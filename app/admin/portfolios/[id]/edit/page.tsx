import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { PortfolioFormClient } from "@/components/admin/PortfolioFormClient";

export const dynamic = "force-dynamic";

export default async function EditPortfolioPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    redirect("/login");
  }

  const portfolio = await prisma.portfolio.findUnique({
    where: { id: resolvedParams.id },
    include: {
      testimonial: true
    }
  });

  if (!portfolio) {
    notFound();
  }

  return (
    <div className="p-4 sm:p-8">
      <PortfolioFormClient portfolio={portfolio} />
    </div>
  );
}
