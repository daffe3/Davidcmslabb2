import { getProject } from "@/lib/api";
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug");

  if (!secret || !slug) {
    return new Response("Missing parameters", { status: 400 });
  }

  if (secret !== process.env.CONTENTFUL_PREVIEW_SECRET) {
    return new Response("Invalid token", { status: 401 });
  }

  const project = await getProject(slug);

  if (!project) {
    return new Response("Article not found", { status: 404 });
  }

  draftMode().enable();
  redirect(`/project/${project.slug}`);
}
