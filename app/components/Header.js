export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex justify-between items-center text-white">
        <a href="/" className="text-xl font-bold">Start</a>
        <div>
          <a href="/projects" className="ml-4">All Project</a>
        </div>
      </div>
    </nav>
  );
}