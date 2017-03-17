import Account from './account';

export default class AccountQueries {
  exists(accountName) {
    return Account
      .findOne({ name: accountName })
      .exec()
      .then((account) => {
        if (account) {
          console.log('account found');
          return true;
        }
        console.log('account not found');
        return false;
      });
  }
}
