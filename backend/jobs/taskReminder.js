const webpush = require("web-push");
const Task = require("../models/task");
const PushSubscription = require("../models/pushSubscription.js");

// Configure Web Push
webpush.setVapidDetails(
  process.env.VAPID_SUBJECT,
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY,
);


// Get tomorrow's date in YYYY-MM-DD format
const getTomorrowDate = () => {
  const tomorrow = new Date();

  tomorrow.setDate(tomorrow.getDate() + 1);

  const year = tomorrow.getFullYear();
  const month = String(tomorrow.getMonth() + 1).padStart(2, "0");
  const day = String(tomorrow.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};


// Send reminder notifications
const checkTaskReminders = async () => {
  try {
    const tomorrow = getTomorrowDate();

    console.log(`🔍 Checking tasks due on ${tomorrow}...`);

    // Find pending tasks due tomorrow
    const tasks = await Task.find({
      dueDate: tomorrow,
      status: "Pending",
      reminderSent: false,
    });

    if (tasks.length === 0) {
      console.log("No task reminders to send.");
      return;
    }

    console.log(`📋 Found ${tasks.length} task(s) due tomorrow.`);

    for (const task of tasks) {
      try {
        // Find user's push subscription
        const subscription = await PushSubscription.findOne({
          userId: task.userId,
        });

        if (!subscription) {
          console.log(
            `⚠️ No push subscription found for task: ${task.title}`,
          );

          continue;
        }

        const payload = JSON.stringify({
          title: "TaskFlow Reminder 🔔",
          body: `"${task.title}" is due today.`,
          url: "/",
        });

        await webpush.sendNotification(
          {
            endpoint: subscription.endpoint,
            keys: subscription.keys,
          },
          payload,
        );

        // Mark reminder as sent
        task.reminderSent = true;
        await task.save();

        console.log(
          `✅ Reminder sent for task: ${task.title}`,
        );
      } catch (error) {
        console.error(
          `❌ Failed to send reminder for task: ${task.title}`,
        );

        console.error("Status:", error.statusCode);
        console.error("Body:", error.body);

        // Subscription expired
        if (error.statusCode === 410) {
          await PushSubscription.deleteOne({
            userId: task.userId,
          });

          console.log(
            `🗑️ Expired subscription removed for user: ${task.userId}`,
          );
        }
      }
    }
  } catch (error) {
    console.error("❌ Task reminder scheduler error:", error);
  }
};


// Start scheduler
const startTaskReminder = () => {
  console.log("⏰ Task reminder scheduler started.");

  // Check immediately when server starts
  checkTaskReminders();

  // Check every 1 minute
  setInterval(checkTaskReminders, 60 * 1000);
};


module.exports = {
  startTaskReminder,
};

