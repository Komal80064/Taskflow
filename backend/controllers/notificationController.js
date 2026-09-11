const webpush = require("web-push");
const PushSubscription = require("../models/pushSubscription");

webpush.setVapidDetails(
  process.env.VAPID_SUBJECT,
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY,
);

const sendTestNotification = async (req, res) => {
  try {
    const subscription = await PushSubscription.findOne({
      userId: req.userId,
    });

    if (!subscription) {
      return res.status(404).json({
        message: "Push subscription not found",
      });
    }

    const payload = JSON.stringify({
      title: "TaskFlow Reminder 🔔",
      body: "This is a test push notification.",
      url: "/",
    });

    await webpush.sendNotification(
      {
        endpoint: subscription.endpoint,
        keys: subscription.keys,
      },
      payload,
    );

    res.status(200).json({
      message: "Test notification sent successfully",
    });
  } catch (error) {
    console.error("Send notification error:", error);
    console.error("Status:", error.statusCode);
    console.error("Body:", error.body);

    // Subscription has expired or been unsubscribed
    if (error.statusCode === 410) {
      try {
        await PushSubscription.deleteOne({
          userId: req.userId,
        });

        console.log("Expired push subscription removed from database");
      } catch (deleteError) {
        console.error("Failed to remove expired subscription:", deleteError);
      }

      return res.status(410).json({
        message: "Push subscription expired. Please subscribe again.",
      });
    }

    res.status(500).json({
      message: "Failed to send notification",
    });
  }
};

module.exports = {
  sendTestNotification,
};
