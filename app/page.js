import { getHomepageData } from "@/lib/api";
import "./globals.css";

export default async function HomePage() {
  const homepage = await getHomepageData();

  return (
    <div className="min-h-screen bg-beige text-orangeAccent p-10">
      <main>
        <h1 className="text-4xl font-bold">
          {homepage?.title || "Välkommen!"}
        </h1>
        <p>{homepage?.presentationText || "Ingen text hittad."}</p>

        {homepage?.image?.url && (
          <img
            src={homepage.image.url}
            alt={homepage.image.description || "Bild"}
            className="mt-4 rounded shadow"
          />
        )}
      </main>
    </div>
  );
}
