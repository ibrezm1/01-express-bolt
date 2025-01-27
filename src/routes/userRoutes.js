const express = require('express');
const { body, query } = require('express-validator');
const userController = require('../controllers/userController');
const { validateRequest } = require('../middleware/validateRequest');

const router = express.Router();

// Create user
router.post('/',
  [
    body('email').isEmail(),
    body('firstName').notEmpty(),
    body('lastName').notEmpty(),
    body('role').notEmpty(),
    validateRequest
  ],
  userController.createUser
);

// Update user
router.put('/:userId',
  [
    body('email').optional().isEmail(),
    body('firstName').optional(),
    body('lastName').optional(),
    body('role').optional(),
    validateRequest
  ],
  userController.updateUser
);

// Unlock user
router.post('/:userId/unlock',
  userController.unlockUser
);

// Deprovision user
router.post('/:userId/deprovision',
  userController.deprovisionUser
);

// Password unlock
router.post('/:userId/password-unlock',
  userController.passwordUnlock
);

// Search users with pagination
router.get('/',
  [
    query('page').optional().isInt({ min: 1 }),
    query('limit').optional().isInt({ min: 1, max: 100 }),
    query('search').optional(),
    validateRequest
  ],
  userController.searchUsers
);

module.exports = router;