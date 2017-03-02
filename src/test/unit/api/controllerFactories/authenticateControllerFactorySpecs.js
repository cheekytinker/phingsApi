import { describe, it } from 'mocha';
import { createToken } from '../../../../api/controllerFactories/authenticateControllerMethodFactory';

describe('unit', () =>{
  describe('api', ()=> {
    describe('controllerFactories', () => {
      it('should run createToken on controller', () => {
        createToken({ body: '' }, { status: () => {}, json: () => {} });
      });
    });
  });
});