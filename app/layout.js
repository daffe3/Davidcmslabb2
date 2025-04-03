import Navbar from "@/app/components/header"; 

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Min Webbsida</title>
      </head>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
