const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const User = require("./models/user");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

require("dotenv").config();

const mainRoute = require("./routes/main");
const loginRoute = require("./routes/login");
const registerRoute = require("./routes/register");
const blogRoute = require("./routes/blog");
const logoutRoute = require("./routes/logout");
const googleAuthRoute = require("./routes/google-auth");
const googleAuthCallbackRoute = require("./routes/google-auth-callback");
const composePostRoute = require("./routes/compose-post");
const postsRoute = require("./routes/posts");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: "test",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.SECRET_KEY,
      callbackURL: process.env.CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, cb) {
      const userEmail = profile.emails[0].value;
      const userName = profile.displayName;
      User.findOrCreate(
        { email: userEmail, username: userName, googleId: profile.id },
        function (err, user) {
          return cb(err, user);
        }
      );
    }
  )
);

mongoose
  .connect(process.env.DB_URL)
  .then((response) => console.log("Connection established!"))
  .catch((err) => console.error(err));

app.use("/", mainRoute);
app.use("/login", loginRoute);
app.use("/register", registerRoute);
app.use("/blog", blogRoute);
app.use("/logout", logoutRoute);
app.use("/auth/google", googleAuthRoute);
app.use("/auth/google/blog", googleAuthCallbackRoute);
app.use("/compose", composePostRoute);
app.use("/posts", postsRoute);

app.listen(port, () => console.log(`App is running on port: ${port}`));
