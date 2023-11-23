const { Router } = require('express');
const { registerUser, login, editUser, getUsers, resetPassword } = require('../controllers/usersController');
const router = Router();

router.post('/register', registerUser);
router.post('/resetPassword', resetPassword);
router.post('/login', login);
router.get('/', getUsers);

module.exports = router;