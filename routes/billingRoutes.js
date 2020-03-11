const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const requireLogin = require("../middlewares/requireLogin");

module.exports = app => {
  app.post("/api/stripe", requireLogin, async (req, res) => {
    const charge = await stripe.charges.create({
      amount: 500,
      currency: "usd",
      description: "$5 for 5 credits",
      source: req.body.id //esto lo obtenemos gracias al paquete npm body-parser
    });

    req.user.credits += charge.amount / 100;
    /*Recordar que passport incluye la propiedad user en el objeto
    request cuando se le pasa el _id dentro de la cookie con passport.serializeUser*/
    const user = await req.user.save();
    res.send(user);
  });
};
