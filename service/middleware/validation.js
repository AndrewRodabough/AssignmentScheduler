import { body, validationResult } from 'express-validator';

// Validation middleware
const userCreationValidation = [
  body('username')
    .exists({ checkFalsy: true })
    .withMessage('Username is required')
    .isString()
    .isLength({ min: 3, max: 25 })
    .withMessage('Username must be between 3-25 characters'),
  
  body('password')
    .exists({ checkFalsy: true })
    .withMessage('Password is required')
    .isString()
    .isLength({ min: 3 })
    .withMessage('Password must be at least 3 characters long')
];

// Route handler
apiRouter.post('/auth/create', userCreationValidation, (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Proceed with user creation if validation passes
  // Your existing user creation logic here
});
