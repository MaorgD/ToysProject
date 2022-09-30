const { UserModel } = require("../models/userModel");
const bcrypt = require("bcrypt");
const { validUser, validLogin } = require("../validation/userValidation");
const { createToken } = require("../helpers/userHelper");

exports.authCtrl = {
  signUp: async (req, res) => {
    let validBody = validUser(req.body);
    if (validBody.error) {
      return res.status(400).json(validBody.error.details);
    }
    try {
      let user = new UserModel(req.body);

      user.password = await bcrypt.hash(user.password, 10);
// We want to encrypt the password unidirectionally
      await user.save();
      user.password = "***";
      res.status(201).json(user);
    }
    catch (err) {
      if (err.code == 11000) {
        return res.status(500).json({ msg: "Email already in system, try log in", code: 11000 })

      }
      console.log(err);
      res.status(500).json({ msg: "err", err })
    }
  }
  ,
  login: async (req, res) => {
    let validBody = validLogin(req.body);
    if (validBody.error) {
      // .details -> Pig in detail what the client side problem is
      return res.status(400).json(validBody.error.details);
    }
    try {
      // First of all check if the sent email exists in the database
      let user = await UserModel.findOne({ email: req.body.email })
      if (!user) {
        return res.status(401).json({ msg: "Password or email is worng ,code:1" })
      }
      // If the password sent in Buddy matches the encrypted password in that user's database
      let authPassword = await bcrypt.compare(req.body.password, user.password);
      if (!authPassword) {
        return res.status(401).json({ msg: "Password or email is worng ,code:2" });
      }
      // Generate a token that contains the user's ID
      let token = createToken(user._id, user.role);
      res.json({ token });
    }
    catch (err) {
      console.log(err)
      res.status(500).json({ msg: "err", err })
    }
  }
}
