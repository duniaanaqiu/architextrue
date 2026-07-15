import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { PostFormClient } from "@/components/admin/PostFormClient";

export const dynamic = "force-dynamic";

export default async function CreatePostPage() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    redirect("/login");
  }

  // Fetch categories and tags to populate the dropdowns/lists
  const [categories, tags] = await Promise.all([
    prisma.category.findMany({
      orderBy: { name: 'asc' },
      select: { id: true, name: true }
    }),
    prisma.tag.findMany({
      orderBy: { name: 'asc' },
      select: { id: true, name: true }
    })
  ]);

  return (
    <div className="p-4 sm:p-8">
      <PostFormClient 
        categories={categories} 
        tags={tags} 
        authorId={(session.user as any).id || "admin"} 
      />
    </div>
  );
}
