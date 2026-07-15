import { getMedia } from "./actions";
import { MediaGalleryClient } from "@/components/admin/MediaGalleryClient";

export const dynamic = "force-dynamic";

export default async function AdminMediaPage() {
  const mediaList = await getMedia();

  return <MediaGalleryClient initialMedia={mediaList} />;
}
