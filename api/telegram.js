export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, email, message } = req.body;

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  const text = `
*Pesan Baru dari Web*:

*Nama:* ${name}
*Email:* ${email}
*Pesan:* ${message}
  `.trim();

  try {
    const telegramRes = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'Markdown'
      })
    });

    const result = await telegramRes.json();

    if (result.ok) {
      res.status(200).json({ success: true });
    } else {
      res.status(500).json({ success: false, error: result });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
