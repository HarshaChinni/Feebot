const _ = require("lodash");
const Path = require("path-parser").default;
const { URL } = require("url");
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const surveyTemplate = require("../services/templates/surveyTemplate");
const Mailer = require("../services/Mailer");

const Survey = mongoose.model("surveys");

module.exports = app => {
  app.get("/api/survey/:surveyId/:response", (req, res) => {
    res.status(200).send("Thanks for voting");
  });

  app.post("/api/surveys/webhooks", (req, res) => {
    const requiredFields = new Path("/api/survey/:surveyId/:response");

    // const events = _.map(req.body, ({ email, url }) => {
    //   const match = requiredFields.test(new URL(url).pathname);
    //   if (match) {
    //     return { email, surveyId: match.surveyId, response: match.response };
    //   }
    // });

    // const compactEvents = _.compact(events);

    // const uniqueEvents = _.uniqBy(compactEvents, "email", "surveyId");
    // console.log("Unique events r ", uniqueEvents);

    //Lodash Chain method is used to chain different methods and pass their results to the next method.
    _.chain(req.body)
      .map(({ email, url }) => {
        const match = requiredFields.test(new URL(url).pathname);
        if (match) {
          // return { email, surveyId: match.surveyId, response: match.response };
          return { email, ...match };
        }
      })
      .compact()
      .uniqBy("email", "surveyId")
      .each(({ email, surveyId, response }) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, responded: false }
            }
          },
          {
            $inc: { [response]: 1 },
            $set: { "recipients.$.responded": true },
            lastResponded: new Date()
          }
        ).exec();
      })
      .value();

    res.send({});
  });

  app.post("/api/survey", requireLogin, requireCredits, async (req, res) => {
    const { title, body, subject, recipients } = req.body;

    const survey = new Survey({
      title,
      body,
      subject,
      recipients: recipients.split(",").map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    });

    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      await mailer.send();
      await survey.save();
      req.user.credit -= 1;
      const user = await req.user.save();

      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }

    // const surveyCreated = await survey.save();
    // res.send(surveyCreated);
  });
};
