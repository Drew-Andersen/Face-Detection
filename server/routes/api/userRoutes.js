const router = require('express').Router();
const {
    createUser,
    getSingleUser,
    login,
    getUsers,
    removeUser
} = require('../../controllers/userController');

// Import middleware for authentication
const { authMiddleware } = require('../../utils/auth');

// POST /api/users - Create a new user
// No authMiddleware is needed for user creation
router.route('/').post(createUser);

// POST /api/users/login - Login an existing user
router.route('/login').post(login);

// GET /api/users - Get all users (this could be an admin route or public route)
router.route('/').get(getUsers);

// DELETE /api/users/:userId - Remove a user (protected route, needs authentication)
router.route('/:userId').delete(authMiddleware, removeUser);

// GET /api/users/me - Get the logged-in user's data (protected route)
router.route('/me').get(authMiddleware, getSingleUser);

module.exports = router;