const router = require('express').Router();
const UserService = require('./../services/users.service');

const userService = new UserService();

router.get('/', async (req, res, next) => {
  try {
    const users = await userService.get();

    res.json({
      _links: {
        self: {
          method: 'GET',
          href: '/api/users',
        },
      },
      _embedded: {
        users: users,
      },
    });
  } catch (err) {
    res.sendStatus(500);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const userDto = {
      alias: req.body.alias,
      email: req.body.email,
      password: req.body.password,
    };

    const user = await userService.create(userDto);

    res.json({
      _links: {
        self: {
          method: 'POST',
          href: '/api/users',
        },
      },
      _embedded: {
        user: user,
      },
    });
  } catch (err) {
    res.sendStatus(500);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const updates = req.body;

    const oldUser = await userService.update(id, updates);
    const updatedUser = await userService.get(id);

    res.json({
      _links: {
        self: {
          method: 'PUT',
          href: '/api/users',
        },
      },
      _embedded: {
        old: oldUser,
        updated: updatedUser,
      },
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.delete('/:id', async (req, res, next) => {
  const id = req.params.id;

  const user = await userService.delete(id);

  res.json({
    _links: {
      self: {
        method: 'DELETE',
        href: '/api/users',
      },
    },
    _embedded: {
      user: user,
    },
  });
});

module.exports = router;
