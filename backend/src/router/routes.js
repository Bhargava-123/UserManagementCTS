const router = require('express').Router();
const { displayPage, postDummyUser,updateDummyUser } = require('../controller/userController');

router.get("/", displayPage);
router.post("/post", postDummyUser);
router.post("/update", updateDummyUser);

module.exports = router;

