const router = require('express').Router();

const userController = require('../controllers/userController');

router.get('/', userController.getAllUsersController);
router.get('/new', userController.getNewUserController);
router.get('/:id', userController.getUserByIdController);

router.post('/', userController.postUserController);

module.exports = router;
