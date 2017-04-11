import { describe, it } from 'mocha';
import { expect } from 'chai';
import Account from '../../../../services/account/account';
import EntityInitialiser from '../../../../services/authentication/entityInitialiser';
import defaultEntities from '../../../../config/defaultEntities';
import './../../../../initialiseExternalServices';


describe('integration', () => {
  describe('services', () => {
    describe('authentication', () => {
      describe('entityInitialiser', () => {
        it('should create master user if master user does not exist', (done) => {
          Account
            .remove()
            .then(() => {
              EntityInitialiser
                .initialise()
                .then(() => {
                  Account
                    .findByUserName(defaultEntities.masterUser.userName)
                    .exec()
                    .then((masterAccount) => {
                      if (!masterAccount) {
                        done(`Cannot find master account by ${defaultEntities.masterUser.userName}`);
                        return;
                      }
                      done();
                    });
                });
            });
        });
      });
    });
  });
});
