const express= require("express");
const {auth, authAdmin} = require("../middlewares/auth");
const { authCtrl } = require("../controllers/authControll");
const { userCtrl } = require("../controllers/userControll");
const router = express.Router();

// An area that returns the user's information based on the token they send
router.get("/myInfo",auth,userCtrl.myInfo)

// Only an admin user will be able to reach and view the list of all users
router.get("/usersList", authAdmin ,userCtrl.userList)

router.post("/",authCtrl.signUp)

router.post("/login", authCtrl.login)

router.put("/:idEdit",auth,userCtrl.editUser);

router.delete("/:idDel" ,auth, userCtrl.deleteAccount);





module.exports = router;
