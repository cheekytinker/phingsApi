import CreateAccountCommand from '../../services/account/createAccountCommand';

export default class AccountController {
  constructor(accountQueries, commandInvoker) {
    this.accountQueries = accountQueries;
    this.commandInvoker = commandInvoker;
  }

  createAccount(req, res, next) {
    if (this.accountQueries.exists(req.body.name)) {
      res.status(403);
      res.json({ message: `Account "${req.body.name}" already taken` });
      next();
      return;
    }
    this.commandInvoker
      .execute(
        new CreateAccountCommand(req.body.name, {
          userName: req.body.userName,
          password: req.body.password,
          email: req.body.email,
        }));
    res.status(201);
    const locationUri = `/accounts/${req.body.name}`;
    res.setHeader('Location', locationUri);
    res.json({ rel: 'view', uri: locationUri});
    next();
  }
}
