import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="p-4 bg-gray-900 text-white flex gap-4">
      <Link href="/">Home</Link>
      <Link href="/app/projects">Projects</Link>
      <Link href="/app/contact">Contact</Link>
    </nav>
  );
};

export default Navbar;