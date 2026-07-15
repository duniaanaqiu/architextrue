"use server";

import { prisma } from "@/lib/prisma";

export async function getCategoriesAndTags() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' }
    });
    const tags = await prisma.tag.findMany({
      orderBy: { name: 'asc' }
    });
    return { categories, tags };
  } catch (error) {
    console.error("Failed to fetch categories and tags:", error);
    return { categories: [], tags: [] };
  }
}
