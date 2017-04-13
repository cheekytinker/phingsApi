import crypto from 'crypto';
import mongoose from 'mongoose';

let model = null;

export const ACCOUNT_STATUS = {
  Created: 'Created',
  Verified: 'Verified',
};

function createSalt() {
  const saltLength = 128;
  const salt = crypto
    .randomBytes(Math.ceil(saltLength))
    .toString('hex')
    .slice(0, saltLength);
  return salt;
}
function createHash(password, salt) {
  const hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
  hash.update(password);
  return hash.digest('hex');
}

if (
  mongoose
  && mongoose.models
  && mongoose.models.Account
  && mongoose.modelSchemas.Account) {
  model = mongoose.models.Account;
} else {
  const UserSchema = new mongoose.Schema({
    firstName: {
      type: String,
      validate: [v => v.length > 1, 'Not valid'],
      required: true,
    },
    lastName: {
      type: String,
      validate: [v => v.length > 1, 'Not valid'],
      required: true,
    },
    email: {
      type: String,
      validate: [v => v.length > 1, 'Not valid'],
      required: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    passwordSalt: {
      type: String,
      required: true,
    },
    primaryContact: {
      type: Boolean,
    },
  });
  const validateUsers = function (users) {
    if (users.length < 1) {
      return false;
    }
    return users.find(u => u.primaryContact) != null;
  };
  const User = mongoose.model('User', UserSchema);
  const AccountSchema = new mongoose.Schema({
    name: {
      type: String,
      validate: [v => v.length > 1, 'Not valid'],
      required: true,
      unique: true,
      index: true,
    },
    status: {
      type: String,
      enum: Array.from(Object.keys(ACCOUNT_STATUS)),
      required: true,
      default: ACCOUNT_STATUS.Created,
    },
    users: {
      type: [UserSchema],
      validate: { validator: validateUsers, msg: 'primary contact must be supplied' },
    },
  });

  AccountSchema.statics.findByUserName = function (userName) {
    return this.findOne({
      'users.userName': userName,
    });
  };

  AccountSchema.methods.setPrimaryContact = function (primaryContact) {
    if (!primaryContact.password) {
      throw new Error('password cannot be empty');
    }
    const existingPrimaryContact = this.users.find(user => user.primaryContact);
    if (existingPrimaryContact && existingPrimaryContact.userName === primaryContact.userName) {
      return;
    }
    const existingUser = this.users.find(user => user.userName === primaryContact.userName);
    if (existingUser) {
      existingUser.primaryContact = true;
      return;
    }
    const newUser = new User();
    newUser.firstName = primaryContact.firstName;
    newUser.lastName = primaryContact.lastName;
    newUser.passwordSalt = createSalt();
    newUser.passwordHash = createHash(primaryContact.password, newUser.passwordSalt);
    newUser.userName = primaryContact.userName;
    newUser.email = primaryContact.email;
    newUser.primaryContact = true;
    this.users.push(newUser);
  };
  AccountSchema.methods.primaryContact = function () {
    return this.users.find(theUser => theUser.primaryContact);
  };

  model = mongoose.model('Account', AccountSchema);
}

export default model;

