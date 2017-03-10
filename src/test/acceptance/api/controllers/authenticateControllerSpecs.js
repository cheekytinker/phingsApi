import should from 'should';
import request from 'supertest';
import { describe, it, after, before } from 'mocha';
import { expect } from 'chai';
import jwt from 'jsonwebtoken';
import shortid from 'shortid';
import server from '../../../../app';
import User from '../../../../services/authentication/user';


let user = null;
const uniqueUserName = shortid.generate();

describe('acceptance', () => {
  describe('api', () => {
    describe('controllers', () => {
      after('close server', () => {
        console.log('closing server and mongoose connection');
        server.close();
      });
      describe('authenticate', () => {
        describe('POST /authTokens', () => {
          before('create test users', (done) => {
            user = new User();
            user.firstName = 'Anthony';
            user.userName = uniqueUserName;
            user.passwordHash = 'e9af9689e7b408bf2d9e5540c8a0926889061061e28c0bdcc96e0f1a27fc9d19a426debb0a27c2057156326a911a3d05a2cff9e1cf6250768d15a0e23413e168';
            user.passwordSalt = 'salt';
            user.save((err) => {
              if(err) {
               console.log(err);
              }
              done();
            });
          });
          after('Remove test users', (done) => {
            User.findOneAndRemove(user, () => {
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
                should.not.exist(err);
                console.log(res.body);
                done(err);
              });
          });
          describe('if  credentials are valid', () => {
            it('should return 201', (done) => {
              request(server)
                .post('/authTokens')
                .send({
                  userName: uniqueUserName,
                  password: 'test123',
                })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(201)
                .end((err, res) => {
                  should.not.exist(err);
                  done(err);
                });
            });
            it('should return a valid jwt token', (done) => {
              request(server)
                .post('/authTokens')
                .send({
                  userName: uniqueUserName,
                  password: 'test123',
                })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(201)
                .end((err, res) => {
                  jwt.verify(res.body, 'secret', (decodeErr, decoded) => {
                    if (decodeErr) {
                      done(decodeErr);
                      return;
                    }
                    expect(decoded).to.exist;
                    done();
                  });
                });
            });
          });
        });
      });
    });
  });
});
