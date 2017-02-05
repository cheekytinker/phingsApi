import { describe, it } from 'mocha';
import AuthenticateService from '../../../../src/services/authenticateService'

describe('authenticateservice', () => {
  it('should allow findUser', () => {
    const service = new AuthenticateService();
    service.findUser();
  });
});
