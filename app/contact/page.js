import { getContactData } from "@/lib/api";

export default async function ContactPage() {
  const contact = await getContactData();

  return (
    <main>
      <h1>Kontakt</h1>
      <p>{contact?.content || "Här kan du få mitt nummer och min mail."}</p>
    </main>
  );
}
