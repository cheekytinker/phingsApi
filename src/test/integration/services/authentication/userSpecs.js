import { describe, it, before, after } from 'mocha';
import { expect } from 'chai';
import User from '../../../../services/authentication/user';
import '../../../../initialiseExternalServices';

let testUser = null;
describe('integration', () => {
  describe('authentication', () => {
    describe('user', () => {
      before('create test user', (done) => {
        testUser = new User();
        testUser.firstName = 'Anthony';
        testUser.userName = 'myUserName';
        testUser.passwordHash = 'passwordHash';
        testUser.passwordSalt = 'passwordSalt';
        testUser.save((err) => {
          done(err);
        });
      });
      after('remove test user', (done) => {
        User.remove(testUser, () => {
          done();
        });
      });
      it('should require firstName', (done) => {
        const user = new User();
        user.userName = 'userName';
        user.password = 'password';
        user.validate((err) => {
          expect(err.errors.firstName.kind).to.equal('required');
          done();
        });
      });
      it('should require userName', (done) => {
        const user = new User();
        user.firstName = 'Anthony';
        user.passwordHash = 'password';
        user.validate((err) => {
          expect(err.errors.userName.kind).to.equal('required');
          done();
        });
      });
      it('should require passwordHash', (done) => {
        const user = new User();
        user.firstName = 'Anthony';
        user.userName = 'userName';
        user.validate((err) => {
          expect(err.errors.passwordHash.kind).to.equal('required');
          done();
        });
      });
      it('should require passwordSalt', (done) => {
        const user = new User();
        user.firstName = 'Anthony';
        user.userName = 'userName';
        user.passwordHash = 'kjhdkfh';
        user.validate((err) => {
          expect(err.errors.passwordSalt.kind).to.equal('required');
          done();
        });
      });
      it('should allow users to be found', (done) => {
        User.find({ userName: 'myUserName' })
          .exec()
          .then((docs) => {
            expect(docs[0]).to.exist;
            done();
          })
          .catch((err) => {
            console.log(err);
          });
      });
      it('should allow find by userName', (done) => {
        const { userName } = testUser;
        User
          .find({ userName })
          .exec()
          .then((foundUser) => {
            expect(foundUser).to.exist;
            done();
          });
      });
    });
  });
});
