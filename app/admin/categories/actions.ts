"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getCategories() {
  try {
    return await prisma.category.findMany({
      include: {
        _count: {
          select: { posts: true }
        }
      },
      orderBy: { createdAt: "desc" }
    });
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    throw new Error("Failed to fetch categories");
  }
}

export async function createCategory(data: { name: string; slug: string }) {
  try {
    const existing = await prisma.category.findUnique({
      where: { slug: data.slug }
    });

    if (existing) {
      return { error: "Slug sudah digunakan oleh kategori lain." };
    }

    const category = await prisma.category.create({
      data: {
        name: data.name,
        slug: data.slug
      }
    });
    
    revalidatePath("/admin/categories");
    revalidatePath("/admin/posts/create");
    return { category };
  } catch (error) {
    console.error("Failed to create category:", error);
    return { error: "Gagal membuat kategori" };
  }
}

export async function updateCategory(id: string, data: { name: string; slug: string }) {
  try {
    const existing = await prisma.category.findUnique({
      where: { slug: data.slug }
    });

    if (existing && existing.id !== id) {
      return { error: "Slug sudah digunakan oleh kategori lain." };
    }

    const category = await prisma.category.update({
      where: { id },
      data: {
        name: data.name,
        slug: data.slug
      }
    });

    revalidatePath("/admin/categories");
    revalidatePath("/admin/posts/create");
    return { category };
  } catch (error) {
    console.error("Failed to update category:", error);
    return { error: "Gagal memperbarui kategori" };
  }
}

export async function deleteCategory(id: string) {
  try {
    await prisma.category.delete({
      where: { id }
    });

    revalidatePath("/admin/categories");
    revalidatePath("/admin/posts/create");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete category:", error);
    return { error: "Gagal menghapus kategori. Kategori mungkin sedang digunakan di artikel." };
  }
}
