import { Client } from "@line/bot-sdk";

import welcome from "../assets/flex/welcome.json" with { type: "json" };
import detail from "../assets/flex/detail.json" with { type: "json" };
import activity from "../assets/flex/activity.json" with { type: "json" };
import gift from "../assets/flex/gift.json" with { type: "json" };

const client = new Client({
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
});

const flexMessages = {
  "รายละเอียด": detail,
  "กิจกรรม": activity,
  "ร่วมยินดีกับบ่าวสาว": gift,
  "hi": welcome
};

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(200).json({
      status: "Wedding LINE OA Webhook is running"
    });
  }

  const events = req.body.events;

  for (const event of events) {

    // =========================
    // Slip Image Received
    // =========================
    if (
      event.type === "message" &&
      event.message.type === "image"
    ) {

      console.log("SLIP IMAGE RECEIVED:", JSON.stringify(event));

      try {

        await client.replyMessage(
          event.replyToken,
          {
            type: "text",
            text: "ได้รับสลิปเรียบร้อยแล้วครับ 💚\n\nขอบคุณสำหรับการร่วมยินดีและคำอวยพรของคุณครับ"
          }
        );

      } catch (err) {

        console.error(
          "LINE Reply Error:",
          JSON.stringify(err.originalError?.response?.data, null, 2)
        );

      }

      continue;
    }

    if (
      event.type === "message" &&
      event.message.type === "text"
    ) {

      console.log("EVENT:", JSON.stringify(event));

      const userMessage = event.message.text.trim();
      const command = userMessage.toLowerCase();

      // =========================
      // Slip Upload Instruction
      // =========================
      if (userMessage === "ส่งสลิป") {

        try {

          await client.replyMessage(
            event.replyToken,
            {
              type: "text",
              text: "กรุณาแนบรูปสลิปการโอนเงินในแชทนี้ได้เลยครับ 💚\n\nขอบคุณสำหรับคำอวยพรและการร่วมยินดีกับเราครับ"
            }
          );

        } catch (err) {

          console.error(
            "LINE Reply Error:",
            JSON.stringify(err.originalError?.response?.data, null, 2)
          );

        }

        continue;
      }

      // =========================
      // Send Full Resolution Images
      // =========================
      if (userMessage === "เมนู") {

        await client.replyMessage(
          event.replyToken,
          {
            type: "image",
            originalContentUrl: "https://raw.githubusercontent.com/pariwats/MNTGT4EVER/main/assets/menu/menu-v1-full.png",
            previewImageUrl: "https://raw.githubusercontent.com/pariwats/MNTGT4EVER/main/assets/menu/menu-v1-full.png"
          }
        );

        continue;
      }

      if (userMessage === "แผนผังที่นั่ง") {

        await client.replyMessage(
          event.replyToken,
          {
            type: "image",
            originalContentUrl: "https://raw.githubusercontent.com/pariwats/MNTGT4EVER/main/assets/seating/seating-v1-full.png",
            previewImageUrl: "https://raw.githubusercontent.com/pariwats/MNTGT4EVER/main/assets/seating/seating-v1-full.png"
          }
        );

        continue;
      }

      if (userMessage === "กำหนดการ") {

        await client.replyMessage(
          event.replyToken,
          {
            type: "image",
            originalContentUrl: "https://raw.githubusercontent.com/pariwats/MNTGT4EVER/main/assets/detail/schedule-v2-full.png",
            previewImageUrl: "https://raw.githubusercontent.com/pariwats/MNTGT4EVER/main/assets/detail/schedule-v2-full.png"
          }
        );

        continue;
      }

      const flex =
        flexMessages[command] ||
        flexMessages[userMessage];

      if (!flex) {
        continue;
      }

      try {

        await client.replyMessage(
          event.replyToken,
          {
            type: "flex",
            altText: "Wedding Information",
            contents: flex
          }
        );

      } catch (err) {

        console.error(
          "LINE Reply Error:",
          JSON.stringify(err.originalError?.response?.data, null, 2)
        );

      }

    }

  }

  res.status(200).json({
    status: "ok"
  });

}
