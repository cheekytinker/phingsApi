import should from 'should';
import request from 'supertest';
import { describe, it, after } from 'mocha';
import server from '../../../../app';

describe('acceptance', () => {
  describe('api', () => {
    describe('controllers', () => {
      after('start server', () => {
        server.close();
      });
      describe('authenticate', () => {
        describe('POST /authTokens', () => {
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
                const {results: {errors: [{message: theMessage}]}} = res.body;
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
                const {results: {errors: [{message: theMessage}]}} = res.body;
                theMessage.should.match(/.*Missing required property: userName.*/);
                done();
              });
          });
          it('should return a 404 if creds not valid', (done) => {
            request(server)
              .post('/authTokens')
              .send({
                userName: 'myUserName',
                password: 'myPassword',
              })
              .set('Accept', 'application/json')
              .expect('Content-Type', /json/)
              .expect(404)
              .end((err, res) => {
                should.not.exist(err);
                console.log(res.body);
                done();
              });
          });
          it('should retrurn token if the creds are valid');
        });
      });
    });
  });
});
