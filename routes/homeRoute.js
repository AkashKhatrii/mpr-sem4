const express = require("express");
const homeRouter = express.Router();

const User = require("../models/User");
const Service = require("../models/Service");
const Appointment = require("../models/Appointment");

var city = "";
var providers = [];

homeRouter.post("/", (req, res) => {
  req.session.searchCity = "";
  if (req.isAuthenticated()) {
    req.session.searchCity = req.body.city;
    res.redirect("/services/Electrician");
  } else {
    res.redirect("/login");
  }

});

homeRouter.get("/provider/service", (req, res) => {
  res.render("provider");
});

homeRouter.post("/provider/service", async (req, res) => {
  try {
    const userId = req.user.id;
    await User.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          profession: req.body.profession,
          city: req.body.city,
          experience: req.body.experience,
        },
      }
    );

    res.redirect("/home/provider");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

homeRouter.post("/provider/login", (req, res) => {});

homeRouter.get("/", (req, res) => {
  // console.log(req.user.id)
  if (req.isAuthenticated()) {
    res.render("home", { loggedIn: true });
  } else {
    res.render("home", { loggedIn: false });
  }
});

homeRouter.get("/home/provider", (req, res) => {
  if (req.isAuthenticated()) {
    console.log(req.user);
    Appointment.find({ providerId: req.user.id, done: false }).then(
      (appointments) => {
        // console.log(result)
        User.findOne({ _id: req.user.id }).then((user) => {
          res.render("providerHome", {
            appointments: appointments,
            user: user,
          });
        });
      }
    );
  } else {
    res.redirect("/");
  }
});

homeRouter.get("/user/appointments", async (req, res) => {
  try {
    const result = await Appointment.find({ userId: req.user.id });
    const providers = await Promise.all(result.map(async (item) => {
      return await User.findOne({ _id: item.providerId });
    }));

    res.render("userAppointment", { result: result, providers: providers });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

homeRouter.get("/users", async(req, res) => {
  try {
    const users = await User.find({});
    res.send(`${users[0].username}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = { city, homeRouter };
