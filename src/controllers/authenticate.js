class AuthenticationService {
  static createToken(req, res) {
    // const userName = req.swagger.params.userName.value;
    // this sends back a JSON response which is a single string
    res.status(201);
    res.json('a token');
  }
}

module.exports = {
  createToken: AuthenticationService.createToken,
}


