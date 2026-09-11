const express = require("express");

const pushController = require("../controllers/pushController");
const authMiddleware = require("../middleware/authMiddleware");

console.log("PUSH CONTROLLER:", pushController);
console.log(
  "savePushSubscription:",
  typeof pushController.savePushSubscription
);
console.log(
  "deletePushSubscription:",
  typeof pushController.deletePushSubscription
);

const router = express.Router();

router.post(
  "/subscribe",
  authMiddleware,
  pushController.savePushSubscription
);

router.delete(
  "/unsubscribe",
  authMiddleware,
  pushController.deletePushSubscription
);

module.exports = router;

