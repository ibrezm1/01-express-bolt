const express = require('express');
const { body, query } = require('express-validator');
const userController = require('../controllers/userController');
const { validateRequest } = require('../middleware/validateRequest');
const { authenticateToken, requireRole } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Create user (admin only)
router.post('/',
  requireRole('admin'),
  [
    body('email').isEmail(),
    body('firstName').notEmpty(),
    body('lastName').notEmpty(),
    body('role').notEmpty(),
    validateRequest
  ],
  userController.createUser
);

// Update user (admin only)
router.put('/:userId',
  requireRole('admin'),
  [
    body('email').optional().isEmail(),
    body('firstName').optional(),
    body('lastName').optional(),
    body('role').optional(),
    validateRequest
  ],
  userController.updateUser
);

// Unlock user (admin only)
router.post('/:userId/unlock',
  requireRole('admin'),
  userController.unlockUser
);

// Deprovision user (admin only)
router.post('/:userId/deprovision',
  requireRole('admin'),
  userController.deprovisionUser
);

// Password unlock (admin only)
router.post('/:userId/password-unlock',
  requireRole('admin'),
  userController.passwordUnlock
);

// Search users (all authenticated users)
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