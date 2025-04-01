import { InputData } from "@/features/home/components/Feedback/types/inputsData";

export enum MessageType {
  APPOINTMENT = "appointment",
  FEEDBACK = "feedback",
}

export const getMessage = (input: InputData, messageType: string): string => {
  const { name, phone } = input;

  if (messageType === "appointment") {
    return `Нова заявка на запис!
👤 Ім'я: ${name}
📞 Телефон: ${phone}`;
  }

  if (messageType === "feedback" && "service" in input) {
    const { rating, feedback, service, source, master } = input;

    return `На сайті новий відгук!
👤 Ім'я: ${name}
📞 Телефон: ${phone}
🎀 Послуга: ${service}
⭐️ Оцінка: ${rating ?? ""}
👩 Майстер: ${master ?? ""}
🔗 Джерело: ${source ?? ""}
💬 Відгук: ${feedback ?? ""}`;
  }

  return "Невідомий тип повідомлення";
};
