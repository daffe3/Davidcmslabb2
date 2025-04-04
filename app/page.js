import { getHomepageData } from "@/lib/api";

export default async function HomePage() {
  const homepage = await getHomepageData();

  return (
    <main className="min-h-screen p-10 bg-gray-100">
      <h1 className="text-4xl font-bold">{homepage?.title || "Välkommen!"}</h1>
      <p>{homepage?.presentationText || "Ingen text hittad."}</p>
      <img></img>
    </main>
  );
}
