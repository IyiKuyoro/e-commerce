import { Router } from 'express';
import passport from 'passport';
import GoogleAuthController from '../controllers/GoogleAuthController';

const googleAuthRouter = Router();

// Authenticate with google
googleAuthRouter.get(
  '/google',
  passport.authenticate('google', {
    session: true,
    scope: ['profile', 'email'],
  }),
);

// Get list of all categories
googleAuthRouter.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/api/v1/auth/google/failure' }),
  GoogleAuthController.success,
);

// GoogleAuth failure route
googleAuthRouter.get('/google/failure', GoogleAuthController.error);

export default googleAuthRouter;
