import { describe, it } from 'mocha';
import should from 'should';
import { Container } from '../../../../api/helpers/container';
import { TYPES } from '../../../../api/helpers/config';

describe('acceptance', () => {
  describe('api', () => {
    describe('helpers', () => {
      describe('container', () => {
        describe('when resolving the controller dependencies', () => {
          it('should resolve authenticateController and dependencies', () => {
            const controller = Container.get(TYPES.AuthenticateController);
            should.exist(controller);
          });
          it('should resolve accountController and dependencies', () => {
            const controller = Container.get(TYPES.AccountController);
            should.exist(controller);
          });
        });
      });
    });
  });
});
