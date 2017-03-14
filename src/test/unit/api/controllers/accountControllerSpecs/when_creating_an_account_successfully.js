import { describe, it } from 'mocha';
import { expect } from 'chai';

describe('unit', () => {
  describe('account', () => {
    describe('AccountController', () => {
      describe('when creating an account', () => {
        it('should map CreateAccountRequest to CreateAccountCommand');
        it('should return CreateAccountResponse with new account uri');
      });
    });
  });
});
