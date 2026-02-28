import { redirect } from "next/navigation";

export default async function KoRedirectPage({
  params
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  const suffix = slug && slug.length > 0 ? `/${slug.join("/")}` : "";
  redirect(`/en${suffix}`);
}
