import Link from "next/link";

export default function ProjectFilter({ categories }) {
  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold">SORTERA:</h3>
      <div className="flex gap-2 mt-2">
        {categories.map((cat) => (
         <Link key={cat.name} href={`/projects?category=${cat.name}`}>
         <button className="px-4 py-2 bg-blue-500 text-white rounded">
           {cat.name}
         </button>
       </Link>
        ))}
      </div>
    </div>
  );
}
