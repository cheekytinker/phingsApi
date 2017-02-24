import { describe, it } from 'mocha';
import should from 'should';
import { Container } from '../../../../api/helpers/container';
import { TYPES } from '../../../../api/helpers/config';

describe('acceptance', () => {
  describe('api', () => {
    describe('helpers', () => {
      describe('container', () => {
        describe('should be able to resolve all dependencies', () => {
          it('should fail', () => {
            const controller = Container.get(TYPES.AuthenticateController);
            should.exist(controller);
          });
        });
      });
    });
  });
});