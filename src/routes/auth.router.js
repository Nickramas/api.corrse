const router = require('express').Router();
const AuthService = require('./../services/auth.service');

const authService = new AuthService();

router.post('/', async (req, res, next) => {
  try {
    const token = await authService.loginAndGetToken(
      req.body.email,
      req.body.password,
    );

    if (!token) {
      res.sendStatus(406);
    }

    res.json({
      _links: {
        self: {
          href: '/api/login',
        },
      },
      _embedded: {
        token: token,
      },
    });
  } catch (err) {
    res.sendStatus(500);
    console.log(err);
  }
});

module.exports = router;
