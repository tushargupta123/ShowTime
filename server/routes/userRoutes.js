const express = require('express');
const { register, login, getCurrentUser } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register',register);
router.post('/login',login);
router.get('/get-current-user',authMiddleware,getCurrentUser);

module.exports = router;