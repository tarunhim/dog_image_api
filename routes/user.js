const express   = require('express');
const router    = express.Router();
const { register, login } = require("../controller/user");
/**
* API routes for audittrails operation
*/
router.post('/register',    register);
router.post('/login',       login);


module.exports = router;
