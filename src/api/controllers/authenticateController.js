export default class AuthenticateController {
  constructor(service) {
    this.service = service;
  }
  createToken(req, res, next) {
    const userName = req.body.userName;
    const password = req.body.password;

    return this.service
      .createJwtForUser(userName, password)
      .then((token) => {
        res.status(201);
        res.json(token);
        next();
      })
      .catch((err) => {
        res.status(404);
        res.json({ message: `${err}` });
        next();
      });
  }
}
