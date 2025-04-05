import { getAboutMeData } from "@/lib/api";
import "../globals.css"

export default async function AboutPage() {
  const about = await getAboutMeData();

  return (
    <main>
      <h1>Om mig</h1>
      <h2>{about?.bio || "Bio not available"}</h2>
      <section>
        <h3>Education</h3>
        <p>{about?.education || "No education details available"}</p>
      </section>
      <section>
        <h3>Experience</h3>
        <p>{about?.experience || "No experience details available"}</p>
      </section>
    </main>
  );
}
