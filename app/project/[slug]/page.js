import Head from "next/head"; 
import { getProject } from "@/lib/api";
import "../../globals.css";

export default async function ProjectPage({ params }) {
  const { slug } = params;
  const project = await getProject(slug);

  if (!project) {
    return <div>Projektet hittades inte. Vänligen kontrollera att länken är korrekt.</div>;
  }

  return (
    <div className="project-details">
      <Head>
        <meta name="description" content={project.titel || "Inget titel tillgängligt"} />
        <meta property="og:title" content={project.titel || "Projekt"} />
        <meta property="og:image" content={project.image?.url || "/default-image.jpg"} />
      </Head>

      <h1>{project.titel}</h1>

      <p>{project.shortDescription || "Ingen beskrivning tillgänglig"}</p>

      {project.image && (
        <div className="project-image">
          <img src={project.image.url} alt={project.image.description || project.titel} />
        </div>
      )}

      <p>{project.category?.name || "Ingen kategori"}</p>

      {project.link && (
        <a href={project.link} target="_blank" rel="noopener noreferrer">
          Besök extern länk
        </a>
      )}
    </div>
  );
}
