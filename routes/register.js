const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const passport = require("passport");

const validateData = (userObject) => {
  if (validateEmail(userObject, userObject.email, "string")) return true;
};

/**
 * It checks if the field type is not the same as the field type passed in.
 * @param userObject - The object that contains the field to be validated
 * @param fieldName - The name of the field to validate
 * @param fieldType - The type of the field.
 * @param [required=true] - true/false
 * @returns a boolean value.
 */
const validateEmail = (userObject, fieldName, fieldType, required = true) => {
  if (!(typeof userObject[fieldName] !== fieldType)) {
    console.error(`Invalid field type for: ${fieldName}`);
    return false;
  }
  return true;
};

const handleRegister = (req, res) => {
  res.render("../views/register", { error: "" });
};

/**
 * It takes the data from the form, validates it, hashes the password, then saves the user to the
 * database.
 */
const handleRegisterPost = (req, res) => {
  let userToValidate = {
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  };

  User.register(
    { email: userToValidate.email, username: userToValidate.username },
    userToValidate.password,
    (err, user) => {
      if (err) {
        console.log(err);
        res.render("../views/register", {
          error: "Failed to create an account.",
        });
      } else {
        passport.authenticate("local")(req, res, () => {
          res.redirect("/blog");
        });
      }
    }
  );
};

router.get("/", handleRegister).post("/", handleRegisterPost);

module.exports = router;
