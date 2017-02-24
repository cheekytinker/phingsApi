export default class AuthenticateController {
  constructor(service) {
    this.service = service;
  }
  createToken(req, res) {
    const userName = req.body.userName;
    const password = req.body.password;
    // this sends back a JSON response which is a single string

    return this.service
      .findUser(userName, password)
      .then((token) => {
        res.status(201);
        res.json(token);
      })
      .catch((err) => {
        console.log('Rejected');
        res.status(404);
        res.json({ message: `User not found again ${err}` });
      });
  }
}
