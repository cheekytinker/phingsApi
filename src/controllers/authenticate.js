export default class AuthenticationService {
  createToken(req, res) {
    const userName = req.swagger.params.userName.value;
    // this sends back a JSON response which is a single string
    res.json('a token');
  }
}

