"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getTags() {
  try {
    return await prisma.tag.findMany({
      include: {
        _count: {
          select: { posts: true }
        }
      },
      orderBy: { createdAt: "desc" }
    });
  } catch (error) {
    console.error("Failed to fetch tags:", error);
    throw new Error("Failed to fetch tags");
  }
}

export async function createTag(data: { name: string; slug: string }) {
  try {
    const existing = await prisma.tag.findUnique({
      where: { slug: data.slug }
    });

    if (existing) {
      return { error: "Slug sudah digunakan oleh tag lain." };
    }

    const tag = await prisma.tag.create({
      data: {
        name: data.name,
        slug: data.slug
      }
    });
    
    revalidatePath("/admin/tags");
    revalidatePath("/admin/posts/create");
    return { tag };
  } catch (error) {
    console.error("Failed to create tag:", error);
    return { error: "Gagal membuat tag" };
  }
}

export async function updateTag(id: string, data: { name: string; slug: string }) {
  try {
    const existing = await prisma.tag.findUnique({
      where: { slug: data.slug }
    });

    if (existing && existing.id !== id) {
      return { error: "Slug sudah digunakan oleh tag lain." };
    }

    const tag = await prisma.tag.update({
      where: { id },
      data: {
        name: data.name,
        slug: data.slug
      }
    });

    revalidatePath("/admin/tags");
    revalidatePath("/admin/posts/create");
    return { tag };
  } catch (error) {
    console.error("Failed to update tag:", error);
    return { error: "Gagal memperbarui tag" };
  }
}

export async function deleteTag(id: string) {
  try {
    await prisma.tag.delete({
      where: { id }
    });

    revalidatePath("/admin/tags");
    revalidatePath("/admin/posts/create");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete tag:", error);
    return { error: "Gagal menghapus tag. Tag mungkin sedang digunakan di artikel." };
  }
}
