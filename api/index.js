export default function handler(req, res) {
  res.status(200).json({
    status: "Wedding LINE OA Webhook is running",
    time: new Date()
  });
}
