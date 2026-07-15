"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createPost(data: {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  isPublished: boolean;
  categoryId: string;
  tagIds: string[];
  authorId: string; // the admin's ID
}) {
  try {
    // Ensure admin user exists in DB to satisfy foreign key constraint
    let adminUser = await prisma.user.findUnique({ where: { id: data.authorId } });
    if (!adminUser) {
      adminUser = await prisma.user.create({
        data: {
          id: data.authorId,
          email: "admin@architextrue.com",
          name: "Administrator",
          role: "ADMIN"
        }
      });
    }

    // Calculate reading time roughly (200 words per minute)
    const wordCount = data.content.replace(/<[^>]*>?/gm, '').split(/\s+/).length;
    const readingTime = Math.max(1, Math.ceil(wordCount / 200));

    const post = await prisma.post.create({
      data: {
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        content: data.content,
        featuredImage: data.featuredImage,
        isPublished: data.isPublished,
        readingTime,
        authorId: data.authorId,
        categories: {
          connect: { id: data.categoryId }
        },
        tags: {
          connect: data.tagIds.map(id => ({ id }))
        }
      }
    });

    revalidatePath("/admin/posts");
    revalidatePath("/blog");
    return { success: true, post };
  } catch (error: any) {
    console.error("Failed to create post:", error);
    // Check for unique slug error
    if (error.code === 'P2002' && error.meta?.target?.includes('slug')) {
      return { success: false, error: "Slug URL already exists. Please choose a different one." };
    }
    return { success: false, error: "Failed to create post." };
  }
}

export async function updatePost(
  id: string,
  data: {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    featuredImage?: string;
    isPublished: boolean;
    categoryId: string;
    tagIds: string[];
  }
) {
  try {
    // Calculate reading time roughly (200 words per minute)
    const wordCount = data.content.replace(/<[^>]*>?/gm, '').split(/\s+/).length;
    const readingTime = Math.max(1, Math.ceil(wordCount / 200));

    const post = await prisma.post.update({
      where: { id },
      data: {
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        content: data.content,
        featuredImage: data.featuredImage,
        isPublished: data.isPublished,
        readingTime,
        categories: {
          set: [], // Clear existing relations
          connect: { id: data.categoryId }
        },
        tags: {
          set: [], // Clear existing relations
          connect: data.tagIds.map(tagId => ({ id: tagId }))
        }
      }
    });

    revalidatePath("/admin/posts");
    revalidatePath("/blog");
    revalidatePath(`/blog/${data.slug}`);
    return { success: true, post };
  } catch (error: any) {
    console.error("Failed to update post:", error);
    if (error.code === 'P2002' && error.meta?.target?.includes('slug')) {
      return { success: false, error: "Slug URL already exists. Please choose a different one." };
    }
    return { success: false, error: "Failed to update post." };
  }
}
