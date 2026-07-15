"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { ServiceType } from "@prisma/client";

interface PortfolioData {
  title: string;
  slug: string;
  description: string;
  images: string[];
  location: string;
  serviceType: ServiceType;
  area: number;
  duration: string;
  completedAt: Date;
  testimonial?: {
    name: string;
    role: string;
    content: string;
    rating: number;
    image?: string;
  } | null;
}

export async function createPortfolio(data: PortfolioData) {
  try {
    const portfolio = await prisma.portfolio.create({
      data: {
        title: data.title,
        slug: data.slug,
        description: data.description,
        images: data.images,
        location: data.location,
        serviceType: data.serviceType,
        area: data.area,
        duration: data.duration,
        completedAt: data.completedAt,
        ...(data.testimonial && {
          testimonial: {
            create: {
              name: data.testimonial.name,
              role: data.testimonial.role,
              content: data.testimonial.content,
              rating: data.testimonial.rating,
              image: data.testimonial.image,
            }
          }
        })
      }
    });

    revalidatePath("/admin/portfolios");
    revalidatePath("/portfolio");
    return { success: true, portfolio };
  } catch (error: any) {
    console.error("Failed to create portfolio:", error);
    if (error.code === 'P2002' && error.meta?.target?.includes('slug')) {
      return { success: false, error: "Slug URL already exists. Please choose a different one." };
    }
    return { success: false, error: "Failed to create portfolio." };
  }
}

export async function updatePortfolio(id: string, data: PortfolioData) {
  try {
    // Check if portfolio has an existing testimonial
    const existingPortfolio = await prisma.portfolio.findUnique({
      where: { id },
      include: { testimonial: true }
    });

    const portfolio = await prisma.portfolio.update({
      where: { id },
      data: {
        title: data.title,
        slug: data.slug,
        description: data.description,
        images: data.images,
        location: data.location,
        serviceType: data.serviceType,
        area: data.area,
        duration: data.duration,
        completedAt: data.completedAt,
      }
    });

    // Handle testimonial update/create/delete
    if (data.testimonial) {
      if (existingPortfolio?.testimonial) {
        await prisma.testimonial.update({
          where: { id: existingPortfolio.testimonial.id },
          data: {
            name: data.testimonial.name,
            role: data.testimonial.role,
            content: data.testimonial.content,
            rating: data.testimonial.rating,
            image: data.testimonial.image,
          }
        });
      } else {
        await prisma.testimonial.create({
          data: {
            name: data.testimonial.name,
            role: data.testimonial.role,
            content: data.testimonial.content,
            rating: data.testimonial.rating,
            image: data.testimonial.image,
            portfolioId: id
          }
        });
      }
    } else if (existingPortfolio?.testimonial) {
      await prisma.testimonial.delete({
        where: { id: existingPortfolio.testimonial.id }
      });
    }

    revalidatePath("/admin/portfolios");
    revalidatePath("/portfolio");
    revalidatePath(`/portfolio/${data.slug}`);
    return { success: true, portfolio };
  } catch (error: any) {
    console.error("Failed to update portfolio:", error);
    if (error.code === 'P2002' && error.meta?.target?.includes('slug')) {
      return { success: false, error: "Slug URL already exists. Please choose a different one." };
    }
    return { success: false, error: "Failed to update portfolio." };
  }
}

export async function deletePortfolio(id: string) {
  try {
    await prisma.portfolio.delete({
      where: { id }
    });

    revalidatePath("/admin/portfolios");
    revalidatePath("/portfolio");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to delete portfolio:", error);
    return { success: false, error: "Failed to delete portfolio." };
  }
}
