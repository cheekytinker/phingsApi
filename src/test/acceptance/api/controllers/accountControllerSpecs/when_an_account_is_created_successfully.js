import { describe, it, before } from 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import shortid from 'shortid';
import server from '../../../../../app';

let response = null;
let accountName = shortid.generate();
describe('acceptance', () => {
  describe('account', () => {
    describe('AccountController', () => {
      describe('when an account is created successfully', () => {
        before('make request', (done) => {
          request(server)
            .post('/accounts')
            .send({
              name: accountName,
              primaryContact: {
                userName: 'theUserName',
                password: 'pass123',
                email: 'phings@cheekytinker.com',
              },
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .then((res) => {
              response = res;
              done();
            });
        });
        it('should return most specific uri in Location header if successful', (done) => {
            expect(response.headers.location).to.equal(`/accounts/${accountName}`);
            done();
        });
        it('should return most specific uri in response body if successful', (done) => {
            expect(response.body.rel).to.equal('view');
            expect(response.body.uri).to.equal(`/accounts/${accountName}`);
            done();
        });
        it('should return 201 if successful', (done) => {
            expect(response.status).to.equal(201);
            done();
        });
      });
    });
  });
});
