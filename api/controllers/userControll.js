const { UserModel } = require("../models/userModel");


exports.userCtrl={
    myInfo: async(req,res) => {
        try{
            //,{name:1,email:1}
          let userInfo = await UserModel.findOne({_id:req.tokenData._id},{password:0});
          res.json(userInfo);
        }
        catch(err){
          console.log(err)
          res.status(500).json({msg:"err",err})
        }  
      }
    ,userList:async(req,res) => {
        try{
          let data = await UserModel.find({},{password:0});
          res.json(data)
        }
        catch(err){
          console.log(err)
          res.status(500).json({msg:"err",err})
        }  
      }
    ,deleteAccount : async(req,res) =>{
        try {
            let data = await UserModel.deleteOne({ _id: idDel});
            res.json(200).json(data);
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ err })
        }
      }
    ,editUser : async(req,res) =>{
      try {
          let data = await UserModel.updateOne({ _id: idEdit },req.body);
          res.json(data);
      }
      catch (err) {
          console.log(err)
          res.status(400).json({ err })
      }
      }
}