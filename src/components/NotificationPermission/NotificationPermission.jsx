import "./NotificationPermission.css";

function NotificationPermission() {
  const enableNotifications = async () => {
    if (!("Notification" in window)) {
      alert("Your browser does not support notifications.");
      return;
    }

    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      new Notification("TaskFlow Notifications Enabled 🔔", {
        body: "You will now receive overdue task notifications.",
      });
    }
  };

  return (
    <button
      className="notification-permission-btn"
      onClick={enableNotifications}
    >
      🔔 Enable Notifications
    </button>
  );
}

export default NotificationPermission;