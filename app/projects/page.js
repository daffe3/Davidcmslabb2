import { getAllProjects } from "@/lib/api";
import Link from "next/link";
import ProjectFilter from "@/app/components/CategoryFilter";

export default async function ProjectsPage({ searchParams }) {
  const categoryFilter = searchParams?.category || null;
  const projects = await getAllProjects(5, categoryFilter);

  return (
    <main className="min-h-screen p-10 bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Alla Projekt</h1>

      {}
      <ProjectFilter />

      {}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.length > 0 ? (
          projects.map((project) => (
            <Link key={project.sys.id} href={`/project/${project.slug}`}>
              <div className="p-4 bg-white shadow rounded">
                <h2 className="text-2xl font-semibold">{project.title}</h2>
                <p className="text-gray-600">{project.summary}</p>
                <p className="text-gray-500 text-sm">{project.categoryName}</p>
              </div>
            </Link>
          ))
        ) : (
          <p>Empty.</p>
        )}
      </div>
    </main>
  );
}


