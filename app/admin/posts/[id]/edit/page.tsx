import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { PostFormClient } from "@/components/admin/PostFormClient";

export const dynamic = "force-dynamic";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    redirect("/login");
  }

  // Fetch categories, tags, and the specific post
  const [categories, tags, post] = await Promise.all([
    prisma.category.findMany({
      orderBy: { name: 'asc' },
      select: { id: true, name: true }
    }),
    prisma.tag.findMany({
      orderBy: { name: 'asc' },
      select: { id: true, name: true }
    }),
    prisma.post.findUnique({
      where: { id: resolvedParams.id },
      include: {
        categories: true,
        tags: true,
      }
    })
  ]);

  if (!post) {
    notFound();
  }

  return (
    <div className="p-4 sm:p-8">
      <PostFormClient 
        categories={categories} 
        tags={tags} 
        authorId={session.user.id}
        post={post}
      />
    </div>
  );
}
