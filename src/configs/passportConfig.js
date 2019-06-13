import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';

import config from './index';
import CustomerService from '../services/CustomerService';

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Use the google strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: config.GOOGLE_CLIENT_ID,
      clientSecret: config.GOOGLE_CLIENT_SECRET,
      callbackURL: config.GOOGLE_AUTH_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      let user = await CustomerService.getCustomerByEmail(profile.emails[0].value);

      if (!user) {
        user = await CustomerService.addCustomer(profile.displayName, profile.emails[0].value, null);
      }

      done(null, user);
    },
  ),
);

export default passport;
