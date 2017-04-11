import CreateAccountCommand from '../../services/account/createAccountCommand';

export default class AccountController {
  constructor(accountQueries, commandInvoker) {
    this.accountQueries = accountQueries;
    this.commandInvoker = commandInvoker;
  }

  createAccount(req, res, next) {
    return this.accountQueries
      .exists(req.body.name)
      .then((alreadyExists) => {
        if (alreadyExists) {
          res.status(403);
          res.json({ message: `Account "${req.body.name}" already taken` });
          next();
          return;
        }
        this.commandInvoker
          .execute(
            new CreateAccountCommand(req.body.name, {
              userName: req.body.primaryContact.userName,
              firstName: req.body.primaryContact.firstName,
              lastName: req.body.primaryContact.lastName,
              password: req.body.primaryContact.password,
              email: req.body.primaryContact.email,
            }))
          .then(() => {
            res.status(201);
            const locationUri = `/accounts/${req.body.name}`;
            res.setHeader('location', locationUri);
            res.json({ rel: 'view', uri: locationUri });
            next();
          });
      });
  }
}
