const{ToyModel} = require("../models/toyModel");
const { validateToy } = require("../validation/toyValidation");

exports.toyCtrl={
      searchToy:async(req,res) => {
      let perPage = req.query.perPage || 10;
      let page = req.query.page || 1;
        try{
          let queryS = req.query.s;
          let searchReg = new RegExp(queryS,"i")
          // {$or:[{name:searchReg}, {manufacturer:searchReg},{info:searchReg}]}
          let data = await ToyModel.find({$or:[{name:searchReg},{info:searchReg}]})
          .limit(perPage)
          .skip((page - 1) * perPage)
          .sort({_id:-1})
          res.json(data);
        }
        catch(err){
          console.log(err);
          res.status(500).json({msg:"there error try again later",err})
        }
      },
      getToy:async(req,res)=> {
        let perPage = req.query.perPage || 10;
        let page = req.query.page || 1;
        try{
          let data = await ToyModel.find({})
          .limit(perPage)
          .skip((page - 1) * perPage)
          .sort({_id:-1})
          res.json(data);
        }
        catch(err){
          console.log(err);
          res.status(500).json({msg:"there error try again later",err})
        }
      },
      toysByPrice:async(req,res)=> {
        let perPage = req.query.perPage || 10;
        let page = req.query.page || 1;
        let sort = req.query.sort || "price"
        let reverse = req.query.reverse == "yes" ? -1 : 1;
        try{
          let minP = req.query.min;
          let maxP = req.query.max;
          if(minP&&maxP){
            let data = await ToyModel.find({$and:[{price:{$gte:minP}},{price:{$lte:maxP}}]})
            
            .limit(perPage)
            .skip((page - 1)*perPage)
            .sort({[sort]:reverse})
            res.json(data);
          }
          else if(maxP){
            let data = await ToyModel.find({price:{$lte:maxP}})
            .limit(perPage)
            .skip((page - 1)*perPage)
            .sort({[sort]:reverse})
            res.json(data);
          }else if(minP){
            let data = await ToyModel.find({price:{$gte:minP}})
            .limit(perPage)
            .skip((page - 1)*perPage)
            .sort({[sort]:reverse})
            res.json(data);
          }else{
            let data = await ToyModel.find({})
            .limit(perPage)
            .skip((page - 1)*perPage)
            .sort({[sort]:reverse})
            res.json(data);
          }
        }
        catch(err){
          console.log(err);
          res.status(500).json({msg:"there error try again later",err})
        }
      },
      toyByCategory:async(req,res) => {
        let perPage = req.query.perPage || 10;
        let page = req.query.page || 1;
          try{
            let catN = req.params.catName;
            let catReg = new RegExp(catN,"i")
            let data = await ToyModel.find({category:catReg})
            .limit(perPage)
            .skip((page - 1)*perPage)
            .sort({_id:-1})
            res.json(data);
          }
          catch(err){
            console.log(err);
            res.status(500).json({msg:"there error try again later",err})
          }
        },
      // Request by category to add
      addToy:async(req,res) => {
        let validBody = validateToy(req.body);
        if(validBody.error){
          return res.status(400).json(validBody.error.details);
        }
        try{
          let toy = new ToyModel(req.body);
          // add the user_id of the user that add the toy
          toy.user_id = req.tokenData._id;
          await toy.save();
          res.status(201).json(toy);
        }
        catch(err){
          console.log(err);
          res.status(500).json({msg:"there error try again later",err})
        }
      },
      editToy:async(req,res) => {
        let validBody = validateToy(req.body);
        if(validBody.error){
          return res.status(400).json(validBody.error.details);
        }
        try{
          let editId = req.params.editId;
          let data;
          if(req.tokenData.role == "admin"){
            data = await ToyModel.updateOne({_id:editId},req.body)
          }
          else{
             data = await ToyModel.updateOne({_id:editId,user_id:req.tokenData._id},req.body)
          }
          res.json(data);
        }
        catch(err){
          console.log(err);
          res.status(500).json({msg:"there error try again later",err})
        }
      },
      deleteToy:async(req,res) => {
        try{
          let delId = req.params.delId;
          let data;
          if(req.tokenData.role == "admin"){
            data = await ToyModel.deleteOne({_id:delId})
          }
          else{
            data = await ToyModel.deleteOne({_id:delId,user_id:req.tokenData._id})
          }
          res.json(data);
        }
        catch(err){
          console.log(err);
          res.status(500).json({msg:"there error try again later",err})
        }
      }
};