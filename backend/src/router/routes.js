const router = require('express').Router();
const { createUser,updateUser,deleteUser,readUser,getAccessToken,loginUser } = require('../controller/userController');

router.post("/create-user", createUser);
router.put("/update-user", updateUser);
router.delete("/delete-user", deleteUser);
router.get("/read-users", readUser);
router.get("/get-access-token", getAccessToken);
router.get("/login-user", loginUser);
module.exports = router;

