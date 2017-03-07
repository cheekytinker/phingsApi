export default class PasswordVerifier {
  verify(password, passwordHash, passwordSalt) {
    return Promise.resolve(true);
  }
}