import { describe, it } from 'mocha';
import { expect } from 'chai';
import UserModel from '../../../../src/services/authentication/userModel';

describe('unit', () => {
  describe('authentication', () => {
    describe('user model', () => {
      it('should have firstName', () => {
        const userModel = new UserModel();
        userModel.firstName = 'Anthony';
        expect(userModel.firstName).to.equal('Anthony');
      });
    });
  });
});
