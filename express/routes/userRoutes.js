const router = require('express').Router();

const userController = require('../controllers/userController');

router.get('/', userController.getAllUsersController);
router.get('/new', userController.getNewUserController);
router.get('/:id', userController.getUserByIdController);

router.post('/', userController.postUserController);

router.put('/:id', userController.putUserController);
router.patch('/:id', userController.patchUserController);
router.delete('/:id', userController.deleteUserController);

module.exports = router;
