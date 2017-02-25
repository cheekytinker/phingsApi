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
        testUser.password = 'myPassword';
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
          expect(err).to.exist;
          done();
        });
      });
      it('should require userName', (done) => {
        const user = new User();
        user.firstName = 'Anthony';
        user.password = 'password';
        user.validate((err) => {
          expect(err).to.exist;
          done();
        });
      });
      it('should require password', (done) => {
        const user = new User();
        user.firstName = 'Anthony';
        user.userName = 'userName';
        user.validate((err) => {
          expect(err).to.exist;
          done();
        });
      });
      it('should allow users to be found', (done) => {
        User.find({}, (err, docs) => {
          expect(docs).to.exist;
          done();
        });
      });
      it('should allow find by userName and password', (done) => {
        const {userName, password} = testUser;
        User.find({userName, password}, (err, foundUser) => {
          expect(foundUser).to.exist;
          done();
        });
      });
    });
  });
});
