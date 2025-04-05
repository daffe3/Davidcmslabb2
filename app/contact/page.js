import { getContactData } from "@/lib/api";
import "../globals.css"

export default async function ContactPage() {
  const contact = await getContactData();

  return (
    <main>
      <h1>Kontakt</h1>
      <h2>{contact?.entryTitle || "Kontaktinformation"}</h2>
      <p>{contact?.content || "Här kan du få mitt nummer och min mail."}</p>

      {contact?.image?.url && <img src={contact.image.url} alt="Contact" />}

      {contact?.link && (
        <p>
          <a href={contact.link} target="_blank" rel="noopener noreferrer">
            {contact.link}
          </a>
        </p>
      )}

      {contact?.number && <p>Phone: {contact.number}</p>}
    </main>
  );
}
