import express from "express";
import cors from "cors";
import path from "path";
import helmet from "helmet";
import compression from "compression";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cookieSession from 'cookie-session'

import flash from "express-flash";

// import passport from "./utils/auth";
import router from "./router";

export default async () => {
  const app = express();

  app.use(cors());
  app.use(helmet());
  app.use(compression());
  app.use(cookieParser({ secret: process.env.SECRET_KEY_BASE }));

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json({ extended: true }));
  app.set("views", path.join(__dirname, "../views"));
  app.set("view engine", "pug");

  app.use(
    cookieSession({
      name:'session',
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure:
          process.env.ENVIRONMENT !== "development" &&
          process.env.ENVIRONMENT !== "test",
        maxAge: 2419200000,
      },
      secret: process.env.SECRET_KEY_BASE,
    })
  );

  app.use(flash());

  // app.use(passport.initialize());
  // app.use(passport.session());

  app.use("/", router);
  app.use("/assets", express.static(path.join(__dirname,'../assets')));

  app.listen(process.env.PORT, () =>
    console.info(`Example app listening on port ${process.env.PORT}!`)
  );
};
