import { getAboutMeData } from "@/lib/api";

export default async function AboutPage() {
  const about = await getAboutMeData();

  return (
    <main>
      <h1>Om mig</h1>
      <p>{about?.content || "Lite om mig."}</p>
    </main>
  );
}
