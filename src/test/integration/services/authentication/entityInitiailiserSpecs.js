import { describe, it } from 'mocha';
import { expect } from 'chai';
import User from '../../../../services/authentication/user';
import EntityInitialiser from '../../../../services/authentication/entityInitialiser';

describe('integration', () => {
  describe('services', () => {
    describe('authentication', () => {
      it('should create master user if master user does not exist', (done) => {
        User
          .remove()
          .then(() => EntityInitialiser.initialise())
          .then(() => User.find({ userName: 'master', password: 'test123' }).exec())
          .then((user) => {
            expect(user.length).to.equal(1);
            done();
          })
          .catch((err) => {
            done(err);
          });
      });
    });
  });
});
