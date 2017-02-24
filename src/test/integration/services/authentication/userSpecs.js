import { describe, it, after } from 'mocha';
import { expect } from 'chai';
import User from '../../../../services/authentication/user';
import '../../../../initialiseExternalServices';

describe('integration', () => {
  describe('authentication', () => {
    describe('user', () => {
      it('should require firstName', (done) => {
        const user = new User();
        user.userName = 'userName';
        user.password = 'password';
        user.validate((err) => {
          if (err) {
            console.log(err);
          }
          expect(err).to.exist;
          done();
        });
      });
      it('should require userName', (done) => {
        const user = new User();
        user.firstName = 'Anthony';
        user.password = 'password';
        user.validate((err) => {
          if (err) {
            console.log(err);
          }
          expect(err).to.exist;
          done();
        });
      });
      it('should require password', (done) => {
        const user = new User();
        user.firstName = 'Anthony';
        user.userName = 'userName';
        user.validate((err) => {
          if (err) {
            console.log(err);
          }
          expect(err).to.exist;
          done();
        });
      });
      it('should allow users to be found', (done) => {
        User.find({}, (err, docs) => {
          expect(docs).to.exist;
          console.log(docs);
          done();
        });
      });
      it('should allow find by userName and password', (done) => {
        const user = new User();
        user.firstName = 'Anthony';
        user.userName = 'myUserName';
        user.password = 'myPassword';
        user.save((err) => {
          const userName = 'myUserName';
          const password = 'myPassword';
          User.find({userName, password}, (err, foundUser) => {
            expect(foundUser).to.exist;
            done();
          });

        });
      });
    });
  });
});
