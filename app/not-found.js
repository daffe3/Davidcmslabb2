"use client";
import "./globals.css"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-center px-4">
      <h2 className="text-5xl font-bold text-red-600 mb-4">404</h2>
      <p className="text-xl text-gray-700 mb-6">Oj då! Sidan kunde inte hittas.</p>
      <a
        href="/"
        className="inline-block bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition"
      >
        Gå till startsidan
      </a>
    </div>
  );
}
