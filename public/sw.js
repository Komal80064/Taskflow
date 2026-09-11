self.addEventListener("push", (event) => {
  if (!event.data) {
    return;
  }

  const data = event.data.json();

  const title = data.title || "TaskFlow Reminder";

  const options = {
    body: data.body || "You have a task reminder.",
    icon: "/taskflow-icon.png",
    badge: "/taskflow-icon.png",
    data: {
      url: data.url || "/",
    },
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});