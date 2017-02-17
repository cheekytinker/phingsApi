export default class AuthenticateController {
  constructor(service) {
    this.service = service;
  }
  createToken(req, res) {
    if (!this.service) {
      throw new Error('service not supplied');
    }
    const userName = req.body.userName;
    const password = req.body.password;
    // this sends back a JSON response which is a single string
    const user = this.service.findUser(userName, password);
    if (!user) {
      res.status(404);
      res.json({ message: 'User not found' })
      return;
    }
    res.status(201);
    res.json('a token');
  }
}



