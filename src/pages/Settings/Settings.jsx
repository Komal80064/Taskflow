import { useEffect, useState } from "react";
import "./Settings.css";
import { useAuth } from "../../context/AuthContext";
import {subscribeToPush, savePushSubscription, unsubscribeFromPush,deletePushSubscription, sendTestNotification,} from "../../services/pushService";


function Settings() {
  const { user } = useAuth();
  const [theme, setTheme] = useState(
    localStorage.getItem("taskflow_theme") || "light",
  );

  const [accent, setAccent] = useState(
    localStorage.getItem("taskflow_accent") || "blue",
  );

  const [notifications, setNotifications] = useState(
    localStorage.getItem("taskflow_notifications") !== "false",
  );

  useEffect(() => {
    localStorage.setItem("taskflow_theme", theme);

    if (theme === "system") {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;

      document.documentElement.setAttribute(
        "data-theme",
        prefersDark ? "dark" : "light",
      );

      return;
    }

    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleNotificationChange = async (enabled) => {
    // TURN OFF
    if (!enabled) {
      try {
        const registration = await navigator.serviceWorker.ready;

        const subscription = await registration.pushManager.getSubscription();

        let endpoint = null;

        if (subscription) {
          endpoint = subscription.endpoint;
        }

        // Remove from browser
        await unsubscribeFromPush();

        // Remove from backend
        if (user?.id && endpoint) {
          await deletePushSubscription(user.id, endpoint);
        }

        setNotifications(false);

        console.log("🔕 Notifications disabled successfully");
      } catch (error) {
        console.error("Failed to disable notifications:", error);

        alert("Failed to disable notifications.");
      }

      return;
    }

    // TURN ON
    if (!("Notification" in window)) {
      alert("Your browser does not support notifications.");
      return;
    }

    if (!user?.id) {
      alert("User information is missing. Please login again.");
      return;
    }

    try {
      const permission = await Notification.requestPermission();

      if (permission !== "granted") {
        setNotifications(false);

        alert("Notification permission was not granted.");

        return;
      }

      // Create fresh browser subscription
      const subscription = await subscribeToPush();

      // Save subscription with logged-in user ID
      await savePushSubscription(subscription, user.id);

      console.log("✅ Push subscription saved successfully");

      setNotifications(true);

      new Notification("TaskFlow Notifications Enabled 🔔", {
        body: "Get reminders for your tasks due today"
      });
    } catch (error) {
      console.error("❌ Push subscription failed:", error);

      setNotifications(false);

      alert("Failed to enable notifications.");
    }
  };

  useEffect(() => {
    localStorage.setItem("taskflow_accent", accent);

    document.documentElement.setAttribute("data-accent", accent);
  }, [accent]);

  useEffect(() => {
    localStorage.setItem("taskflow_notifications", notifications);
  }, [notifications]);

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h1>Settings</h1>
        <p>Customize your TaskFlow experience.</p>
      </div>

      {/* Appearance */}

      <section className="settings-card">
        <div className="settings-card-header">
          <h2>Appearance</h2>
          <p>Choose how TaskFlow looks.</p>
        </div>

        <div className="theme-options">
          <button
            className={`theme-option ${theme === "light" ? "selected" : ""}`}
            onClick={() => setTheme("light")}
          >
            <span className="theme-icon">☀️</span>
            <span>Light</span>
          </button>

          <button
            className={`theme-option ${theme === "dark" ? "selected" : ""}`}
            onClick={() => setTheme("dark")}
          >
            <span className="theme-icon">🌙</span>
            <span>Dark</span>
          </button>

          <button
            className={`theme-option ${theme === "system" ? "selected" : ""}`}
            onClick={() => setTheme("system")}
          >
            <span className="theme-icon">💻</span>
            <span>System</span>
          </button>
        </div>
      </section>

      {/* Accent Color */}

      <section className="settings-card">
        <div className="settings-card-header">
          <h2>Accent Color</h2>
          <p>Choose your TaskFlow theme color.</p>
        </div>

        <div className="accent-options">
          {["blue", "purple", "green", "orange", "pink"].map((color) => (
            <button
              key={color}
              className={`accent-option ${color} ${
                accent === color ? "selected" : ""
              }`}
              onClick={() => setAccent(color)}
            >
              {accent === color && "✓"}
            </button>
          ))}
        </div>
      </section>

      {/* Notifications */}

      <section className="settings-card">
        <div className="settings-row">
          <div>
            <h2>Notifications</h2>
            <p>Get reminders for your tasks due today</p>
          </div>

          <label className="switch">
            <input
              type="checkbox"
              checked={notifications}
              onChange={(e) => handleNotificationChange(e.target.checked)}
            />

            <span className="slider"></span>
          </label>
        </div>
      </section>
    </div>
  );
}

export default Settings;
