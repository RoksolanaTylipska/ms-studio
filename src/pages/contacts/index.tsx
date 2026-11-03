import { Seo } from "@/components/Seo";
import ContactsClientSide from "@/features/contacts/components/ContactsClientSide";

function Contacts() {
  return (
    <>
      <Seo
        title="Контакти та запис на процедуру | MS Laser Львів"
        description="Адреса, телефон і години роботи студії MS Laser у Львові. Запишіться на лазерну епіляцію, електроепіляцію чи депіляцію онлайн або за телефоном."
        path="/contacts"
      />
      <ContactsClientSide />
    </>
  );
}

export default Contacts;
