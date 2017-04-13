import { describe, it, before } from 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import shortid from 'shortid';
import server from '../../../../../app';

let accountName = null;

function createAccount() {
  accountName = shortid.generate()
  return request(server)
    .post('/accounts')
    .send({
      name: accountName,
      primaryContact: {
        userName: accountName,
        firstName: 'anthony',
        lastName: 'holingsworth',
        password: 'pass123',
        email: 'phings@cheekytinker.com',
      },
    })
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/);
}


describe('acceptance', () => {
  describe('account', () => {
    describe('AccountControllerSpecs', () => {
      describe('when an account is created successfully', () => {
        before('make request', (done) => {
          done();
        });
        it('should return most specific uri in Location header if successful', (done) => {
          createAccount()
            .then((response) => {
              expect(response.headers.location).to.equal(`/accounts/${accountName}`);
              done();
            });
        });
        it('should return most specific uri in response body if successful', (done) => {
          createAccount()
            .then((response) => {
              expect(response.body.rel).to.equal('view');
              expect(response.body.uri).to.equal(`/accounts/${accountName}`);
              done();
            });
        });
        it('should return 201 if successful', (done) => {
          createAccount()
            .then((response) => {
              expect(response.status).to.equal(201);
              done();
            });
        });
        it('should send a verfication email to the primary contact email address');
      });
    });
  });
});
