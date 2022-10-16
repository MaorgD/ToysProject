const { UserModel } = require("../models/userModel");
const bcrypt = require("bcrypt");
const {validUser} = require("../validation/userValidation")

exports.userCtrl = {
  myInfo: async (req, res) => {
    try {
      //,{name:1,email:1}
      let userInfo = await UserModel.findOne({ _id: req.tokenData._id }, { password: 0 });
      res.json(userInfo);
    }
    catch (err) {
      console.log(err)
      res.status(500).json({ msg: "err", err })
    }
  }
  , userList: async (req, res) => {
    try {
      let data = await UserModel.find({}, { password: 0 });
      res.json(data)
    }
    catch (err) {
      console.log(err)
      res.status(500).json({ msg: "err", err })
    }
  },
  editUser: async (req, res) => {
    let validBody = validUser(req.body);
    if (validBody.error) {
      return res.status(400).json(validBody.error.details);
    }
    try {
      let idEdit = req.params.idEdit;
      let data;
      if (req.tokenData.role === "admin") {
        data = await UserModel.updateOne({ _id: idEdit }, req.body)
      }
      else if (idEdit === req.tokenData._id) {
        data = await UserModel.updateOne({ _id: idEdit }, req.body)
      }
      if (!data) {
        return res.status(400).json({ err: "This operation is not enabled !" })
      }
      let user = await UserModel.findOne({ _id: idEdit });
      user.password = await bcrypt.hash(user.password, 10);
      await user.save()
      res.status(200).json({ msg: data })
    }
    catch (err) {
      console.log(err);
      res.status(400).json({ err })
    }
  },
  deleteAccount: async (req, res) => {
    try {
      let idDel = req.params.idDel;
      let data;
      // delete user
      if (req.tokenData.role === "admin") {
        data = await UserModel.deleteOne({ _id: idDel });
      }
      else if (idDel === req.tokenData._id) {
        data = await UserModel.deleteOne({ _id: idDel });
      }
      //delete toys of that user
      if (!data) {
        return res.status(400).json({ err: "cannot delete user" })
      }
      // await ToyModel.deleteMany({ user_id: idDel });
      res.json(200).json({ msg: data + "user deleted" });
    }
    catch (err) {
      console.log(err);
      res.status(500).json({ err })
    }
  }
}