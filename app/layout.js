import Navbar from "@/app/components/Header";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>My Projects</title>
      </head>
      <body>
        <Navbar /> {}
        {children}
      </body>
    </html>
  );
}
