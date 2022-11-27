const express = require("express");
const authController = require("../controllers/authController");
const friendInvitationController = require("../controllers/friendInvitationController");
const validator = require("express-joi-validation").createValidator({});

const Joi = require("joi");

const router = express.Router({ mergeParams: true });

const validateEmail = Joi.object({
  targetMailAddress: Joi.string().email(),
});

const validateId = Joi.object({
  id: Joi.string().required(),
});

// Invite Member
router.post(
  "/invite",
  authController.protect,
  validator.body(validateEmail),
  friendInvitationController.postInvite
);

router.post(
  "/accept",
  authController.protect,
  validator.body(validateId),
  friendInvitationController.postAccept
);

router.post(
  "/reject",
  authController.protect,
  validator.body(validateId),
  friendInvitationController.postReject
);

module.exports = router;
