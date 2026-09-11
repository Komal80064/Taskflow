import api from "./axios";

const VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY;

const urlBase64ToUint8Array = (base64String) => {
  const padding = "=".repeat(
    (4 - (base64String.length % 4)) % 4,
  );

  const base64 = (base64String + padding)
    .replace(/-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);

  return Uint8Array.from(
    [...rawData].map((char) => char.charCodeAt(0)),
  );
};


// Subscribe browser to push notifications
export const subscribeToPush = async () => {
  if (!("serviceWorker" in navigator)) {
    throw new Error("Service Worker is not supported.");
  }

  if (!("PushManager" in window)) {
    throw new Error("Push notifications are not supported.");
  }

  const registration = await navigator.serviceWorker.ready;

  let subscription =
    await registration.pushManager.getSubscription();

  // Remove old subscription
  if (subscription) {
    await subscription.unsubscribe();
    subscription = null;
  }

  // Create fresh subscription
  subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey:
      urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
  });

  console.log("✅ New push subscription created");

  return subscription;
};


// Save subscription to backend
export const savePushSubscription = async (
  subscription,
  userId,
) => {
  const subscriptionJson = subscription.toJSON();

  const data = {
    userId,

    endpoint: subscriptionJson.endpoint,

    keys: {
      p256dh: subscriptionJson.keys.p256dh,
      auth: subscriptionJson.keys.auth,
    },
  };

  console.log("📤 Saving push subscription:", data);

  const response = await api.post(
    "/push/subscribe",
    data,
  );

  return response.data;
};


// Remove browser push subscription
export const unsubscribeFromPush = async () => {
  if (!("serviceWorker" in navigator)) {
    return;
  }

  const registration =
    await navigator.serviceWorker.ready;

  const subscription =
    await registration.pushManager.getSubscription();

  if (subscription) {
    await subscription.unsubscribe();

    console.log(
      "🔕 Browser push subscription removed",
    );
  }
};


// Remove subscription from backend
export const deletePushSubscription = async (
  userId,
  endpoint,
) => {
  const response = await api.delete(
    "/push/unsubscribe",
    {
      data: {
        userId,
        endpoint,
      },
    },
  );

  return response.data;
};


// Send test notification
export const sendTestNotification = async () => {
  const response = await api.post(
    "/notifications/test",
  );

  return response.data;
};

