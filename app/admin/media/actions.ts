"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export async function getMedia() {
  try {
    const media = await prisma.media.findMany({
      orderBy: { createdAt: "desc" },
    });
    return media;
  } catch (error) {
    console.error("Failed to fetch media:", error);
    return [];
  }
}

export async function deleteMedia(id: string, key: string) {
  try {
    // 1. Delete from UploadThing
    await utapi.deleteFiles(key);
    
    // 2. Delete from database
    await prisma.media.delete({
      where: { id },
    });
    
    revalidatePath("/admin/media");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete media:", error);
    return { success: false, error: "Failed to delete media" };
  }
}
