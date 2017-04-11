import Account from './../account/account';
import defaultEntities from '../../config/defaultEntities';

export default class EntityInitialiser {
  static initialise() {
    console.log('initialising');
    console.log(defaultEntities);
    return Account
        .findByUserName('master')
        .exec()
        .then((account) => {
          if (account) {
            console.log('account exists');
            return Promise.resolve();
          }
          console.log('account does not exist');
          const master = new Account();
          master.name = defaultEntities.masterAccount.name;
          const primaryContact = defaultEntities.masterUser;
          master.setPrimaryContact(primaryContact);
          return master
            .save();
        })
        .catch((err) => {
          console.log(`error ${err}`);
        });
  }
}

