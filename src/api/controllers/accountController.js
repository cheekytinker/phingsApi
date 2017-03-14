export default class AccountController {
  constructor(accountQueries) {
    this.accountQueries = accountQueries;
  }
  createAccount(req, res, next) {
    if (this.accountQueries.exists(req.body.name)) {
      res.status(403);
      res.json({ message: `Account "${req.body.name}" already taken` });
      next();
      return;
    }
    res.status(201);
    res.json({});
    next();
  }
}
