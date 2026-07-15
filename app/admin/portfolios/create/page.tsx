import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { PortfolioFormClient } from "@/components/admin/PortfolioFormClient";

export const dynamic = "force-dynamic";

export default async function CreatePortfolioPage() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="p-4 sm:p-8">
      <PortfolioFormClient />
    </div>
  );
}
