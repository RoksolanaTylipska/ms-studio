const BOT_CONFIG = {
  appointment: {
    token: process.env.TELEGRAM_APPOINTMENT_TOKEN,
    chatId: process.env.TELEGRAM_APPOINTMENT_CHAT_ID,
  },
  feedback: {
    token: process.env.TELEGRAM_FEEDBACK_TOKEN,
    chatId: process.env.TELEGRAM_FEEDBACK_CHAT_ID,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message, messageType } = req.body;
  const config = BOT_CONFIG[messageType];

  if (!message || !config?.token || !config?.chatId) {
    return res.status(400).json({ error: "Invalid request" });
  }

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${config.token}/sendMessage?chat_id=${config.chatId}&text=${encodeURIComponent(
        message
      )}`
    );

    if (!response.ok) {
      throw new Error(`Telegram API error: ${response.status}`);
    }

    res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Error sending telegram message:", error.message);
    res.status(500).json({ error: "Failed to send message" });
  }
}
