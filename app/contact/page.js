import { getContactData } from "@/lib/api";
import "../globals.css";

export default async function ContactPage() {
  const contact = await getContactData();

  console.log("Contact data:", contact);

  return (
    <main>
      <h1>Kontakt</h1>
      <p>Här finns mitt nummer och mina sociala medier.</p>

      {contact?.image?.url ? (
        <img src={contact.image.url} alt={contact.image.description || "Contact"} />
      ) : (
        <img src="/default-image.png" alt="Default contact image" />
      )}

      <div className="contact-info">
        {contact?.number && (
          <p>Telefon: {contact.number.replace('Number: ', '')}</p>
        )}

        {contact?.email ? (
          <p>
            <a href={`mailto:${contact.email}`} target="_blank" rel="noopener noreferrer">
              Maila mig
            </a>
          </p>
        ) : (
          <p>Email information is not available.</p> 
        )}

        {contact?.link && (
          <p>
            <a href={contact.link} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </p>
        )}
      </div>
    </main>
  );
}
