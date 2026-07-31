import { Client } from "@line/bot-sdk";

const client = new Client({
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
});

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(200).json({
      status: "Wedding LINE OA Webhook is running"
    });
  }

  const events = req.body.events;

  for (const event of events) {

    if (event.type === "message" && event.message.type === "text") {

      await client.replyMessage(
        event.replyToken,
        {
          type: "text",
          text: "ขอบคุณที่ติดต่อ Wedding LINE OA 💍\nระบบกำลังเตรียมข้อมูลสำหรับงานแต่งงานของเรา"
        }
      );

    }

  }

  res.status(200).json({
    status: "ok"
  });
}
