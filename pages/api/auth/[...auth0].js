import { handleAuth, handleLogin, handleProfile } from '@auth0/nextjs-auth0';

export default handleAuth({
  async login(req, res) {
    try {
      await handleLogin(req, res, {
        returnTo: '/app',
      });
    } catch (error) {
      res.status(error.status || 400).end(error.message);
    }
  },
});
