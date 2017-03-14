import should from 'should';
import request from 'supertest';
import { describe, it, after, before } from 'mocha';
import { expect } from 'chai';
import jwt from 'jsonwebtoken';
import shortid from 'shortid';
import crypto from 'crypto';
import server from '../../../../../app';
import User from '../../../../../services/authentication/user';
import PasswordVerfiier from '../../../../../services/authentication/passwordVerifier';

let user = null;
const uniqueUserName = shortid.generate();
const saltLength = 64;
const salt = crypto
  .randomBytes(Math.ceil(saltLength/2))
  .toString('hex')
  .slice(0, saltLength);
const testPassword = 'test123';

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
            user.passwordHash = PasswordVerfiier.createHash(testPassword, salt);
            user.passwordSalt = salt;
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
                  password: testPassword,
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
                  password: testPassword,
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
