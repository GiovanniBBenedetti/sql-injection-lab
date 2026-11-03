const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { requireAuth } = require("../middlewares/authMiddleware");

router.get("/login", authController.showLogin);
router.post("/login", authController.login);
router.get("/dashboard", requireAuth, authController.showDashboard);
router.get("/logout", authController.logout);

module.exports = router;
