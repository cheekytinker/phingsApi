import should from 'should';
import request from 'supertest';
import { describe, it, after, before } from 'mocha';
import server from '../../../../app';
import User from '../../../../services/authentication/user';

describe('acceptance', () => {
  describe('api', () => {
    describe('controllers', () => {
      after('close server', () => {
        console.log('closing server and mongoose connection');
        server.close();
      });
      describe('authenticate', () => {
        describe('POST /authTokens', () => {
          before('create test users', () => {
            const user = new User();
            user.firstName = 'Anthony';
            user.userName = 'userName';
            user.password = 'password';
          });
          after('Remove test users', (done) => {
            User.remove(() => {
              done();
            });
          });
          it('should require a password parameter', (done) => {
            request(server)
              .post('/authTokens')
              .send({
                userName: 'myUserName',
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
          it('should require a userName parameter', (done) => {
            request(server)
              .post('/authTokens')
              .send({
                password: 'myUserName',
              })
              .set('Accept', 'application/json')
              .expect('Content-Type', /json/)
              .expect(400)
              .end((err, res) => {
                should.not.exist(err);
                const { results: { errors: [{ message: theMessage }] } } = res.body;
                theMessage.should.match(/.*Missing required property: userName.*/);
                done();
              });
          });
          it('should return a 404  if creds not valid', (done) => {
            request(server)
              .post('/authTokens')
              .send({
                userName: 'invalidmyUserName',
                password: 'myPassword',
              })
              .set('Accept', 'application/json')
              .expect('Content-Type', /json/)
              .expect(404)
              .end((err, res) => {
                console.log(err);
                should.not.exist(err);
                console.log(res.body);
                done();
              });
          });
          it('should return token if the creds are valid', (done) => {
            request(server)
              .post('/authTokens')
              .send({
                userName: 'myUserName',
                password: 'myPassword',
              })
              .set('Accept', 'application/json')
              .expect('Content-Type', /json/)
              .expect(201)
              .end((err, res) => {
                console.log(err);
                should.not.exist(err);
                console.log(res.body);
                done();
              });
          });
        });
      });
    });
  });
});
