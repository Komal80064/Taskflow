console.log("🔥 PUSH CONTROLLER FILE LOADED");
console.log("🔥 FILE:", __filename);

const PushSubscription = require("../models/pushSubscription");

// Save push subscription
const savePushSubscription = async (req, res) => {
  try {
    const { userId, endpoint, keys } = req.body;

    console.log("📥 Saving push subscription for user:", userId);

    if (!userId || !endpoint || !keys?.p256dh || !keys?.auth) {
      return res.status(400).json({
        message: "userId, endpoint, p256dh and auth are required",
      });
    }

    // Check if this subscription already exists
    const existingSubscription = await PushSubscription.findOne({
      endpoint,
    });

    if (existingSubscription) {
      console.log("⚠️ Push subscription already exists");

      return res.status(200).json({
        message: "Push subscription already exists",
      });
    }

    // Create new subscription
    const subscription = await PushSubscription.create({
      userId,
      endpoint,
      keys: {
        p256dh: keys.p256dh,
        auth: keys.auth,
      },
    });

    console.log("✅ Push subscription saved:", subscription._id);

    return res.status(201).json({
      message: "Push subscription saved successfully",
    });
  } catch (error) {
    console.error("❌ Save push subscription error:", error);

    return res.status(500).json({
      message: "Failed to save push subscription",
      error: error.message,
    });
  }
};


// Delete push subscription
const deletePushSubscription = async (req, res) => {
  try {
    const { userId, endpoint } = req.body;

    console.log("🗑️ Deleting push subscription for user:", userId);

    if (!userId || !endpoint) {
      return res.status(400).json({
        message: "userId and endpoint are required",
      });
    }

    const deletedSubscription =
      await PushSubscription.findOneAndDelete({
        userId,
        endpoint,
      });

    if (!deletedSubscription) {
      return res.status(404).json({
        message: "Push subscription not found",
      });
    }

    console.log("✅ Push subscription deleted");

    return res.status(200).json({
      message: "Push subscription deleted successfully",
    });
  } catch (error) {
    console.error("❌ Delete push subscription error:", error);

    return res.status(500).json({
      message: "Failed to delete push subscription",
      error: error.message,
    });
  }
};


module.exports = {
  savePushSubscription,
  deletePushSubscription,
};

console.log("🔥 EXPORTS:", module.exports);