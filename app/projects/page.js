import { getAllProjects } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <main className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.sys.id} className="shadow-lg rounded-lg p-4 bg-white">
            <Image 
              src={project.projectImage.url} 
              alt={project.title} 
              width={300} 
              height={200} 
              className="rounded-lg"
            />
            <h2 className="text-xl font-semibold mt-2">{project.title}</h2>
            <p className="text-gray-500">{project.summary}</p>
            <Link href={`/projects/${project.slug}`} className="text-blue-500 mt-2 inline-block">
              Read more →
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
