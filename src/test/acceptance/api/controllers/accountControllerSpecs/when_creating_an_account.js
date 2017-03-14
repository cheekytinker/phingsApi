import should from 'should';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import server from '../../../../../app';

describe('acceptance', () => {
  describe('account', () => {
    describe('AccountController', () => {
      describe('when creating an account', () => {
        it('should require an account name', (done) => {
          request(server)
            .post('/accounts')
            .send({
              primaryContact: {

              },
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .end((err, res) => {
              should.not.exist(err);
              const { results: { errors: [{ message: theMessage }] } } = res.body;
              theMessage.should.match(/.*Missing required property: name.*/);
              done();
            });
        });
        it('should require an account primary contact', (done) => {
          request(server)
            .post('/accounts')
            .send({
              name: 'myaccount',
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .end((err, res) => {
              should.not.exist(err);
              const { results: { errors: [{ message: theMessage }] } } = res.body;
              theMessage.should.match(/.*Missing required property: primaryContact.*/);
              done();
            });
        });
        it('should require an account primary contact password', (done) => {
          request(server)
            .post('/accounts')
            .send({
              name: 'myaccount',
              primaryContact: {
                userName: 'theUserName',
              },
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .end((err, res) => {
              should.not.exist(err);
              const { results: { errors: [{ message: theMessage }] } } = res.body;
              theMessage.should.match(/.*Missing required property: password.*/);
              done();
            });
        });
        it('should require an account primary contact email', (done) => {
          request(server)
            .post('/accounts')
            .send({
              name: 'myaccount',
              primaryContact: {
                userName: 'theUserName',
                password: 'pass123',
              },
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .end((err, res) => {
              should.not.exist(err);
              const { results: { errors: [{ message: theMessage }] } } = res.body;
              theMessage.should.match(/.*Missing required property: email.*/);
              done();
            });
        });
        it('should return most specific uri in Location header if successful');
        it('should return most specific uri in response body if successful');
        it('should return 201 if successful', (done) => {
          request(server)
            .post('/accounts')
            .send({
              name: 'myaccount',
              primaryContact: {
                userName: 'theUserName',
                password: 'pass123',
                email: 'phings@cheekytinker.com',
              },
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err, res) => {
              should.not.exist(err);
              done();
            });
        });
      });
    });
  });
});
