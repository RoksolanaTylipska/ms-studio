import { JsonLd } from "@/components/JsonLd";
import { Seo } from "@/components/Seo";
import ContactsClientSide from "@/features/contacts/components/ContactsClientSide";
import { contactsPageSchema } from "@/features/servicePages/seo";

function Contacts() {
  return (
    <>
      <Seo
        title="Контакти та запис на процедуру | MS STUDIO LASER Львів"
        description="Адреса, телефон і години роботи студії MS STUDIO LASER у Львові. Запишіться на лазерну епіляцію, електроепіляцію чи депіляцію онлайн або за телефоном."
        path="/contacts"
      />
      <JsonLd id="contacts-schema" data={contactsPageSchema()} />
      <ContactsClientSide />
    </>
  );
}

export default Contacts;
