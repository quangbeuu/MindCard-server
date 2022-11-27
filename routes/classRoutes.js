const express = require("express");
const classController = require("../controllers/classController");
const memberInvitationRouter = require("./friendInvitationRoutes");

const router = express.Router();

// Nested Route
router.use(
  "/:classId/member-invitation",
  (req, res, next) => {
    req.classId = req.params;
    next();
  },
  memberInvitationRouter
);

router
  .route("/")
  .get(classController.getAllClasses)
  .post(classController.createClass);

router
  .route("/:id")
  .get(classController.getClass)
  .patch(classController.updateClass)
  .delete(classController.deleteClass);

module.exports = router;
