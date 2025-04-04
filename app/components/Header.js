export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex justify-between items-center text-white">
        <a href="/" className="text-xl font-bold">Start</a>
        <div>
          <a href="/projects" className="ml-4">Alla Projekt</a>
        </div>
        <div>
          <a href="/about" className="ml-4">Om mig</a>
        </div>
        <div>
          <a href="/contact" className="ml-4">Kontakt</a>
        </div>
      </div>
    </nav>
  );
}
