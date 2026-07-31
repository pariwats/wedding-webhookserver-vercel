import { Client } from "@line/bot-sdk";

import welcome from "../assets/flex/welcome.json" with { type: "json" };
import detail from "../assets/flex/detail.json" with { type: "json" };
import menu from "../assets/flex/menu.json" with { type: "json" };
import seating from "../assets/flex/seating.json" with { type: "json" };
import activity from "../assets/flex/activity.json" with { type: "json" };
import gift from "../assets/flex/gift.json" with { type: "json" };


const client = new Client({
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
});


const flexMessages = {
  "รายละเอียด": detail,
  "เมนู": menu,
  "แผนผังที่นั่ง": seating,
  "กิจกรรม": activity,
  "ร่วมยินดีกับบ่าวสาว": gift
};


export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(200).json({
      status: "Wedding LINE OA Webhook is running"
    });
  }


  const events = req.body.events;


  for (const event of events) {

    if (
      event.type === "message" &&
      event.message.type === "text"
    ) {

      console.log("EVENT:", JSON.stringify(event));


      const userMessage = event.message.text;


      const flex =
        flexMessages[userMessage] || welcome;


      await client.replyMessage(
        event.replyToken,
        {
          type: "flex",
          altText: flex.altText || "Wedding Information",
          contents: flex.contents
        }
      );

    }

  }


  res.status(200).json({
    status: "ok"
  });

}
