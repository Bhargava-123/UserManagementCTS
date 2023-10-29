const router = require('express').Router();
const { createUser,updateUser,deleteUser } = require('../controller/userController');

router.post("/create-user", createUser);
router.put("/update-user", updateUser);
router.delete("/delete-user", deleteUser);
module.exports = router;

