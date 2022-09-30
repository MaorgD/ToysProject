require("dotenv").config()

// All variables that need to be confidential will be in this file !! 
exports.config = {
  userDb:process.env.USER_DB,
  passDb:process.env.PASS_DB,
  tokenSecret:process.env.TOKEN_SECRET
}

