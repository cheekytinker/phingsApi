import mongoose, { Schema } from 'mongoose';

let model = null;

if (mongoose.models.Account != null && mongoose.modelSchemas.Account != null) {
  model = mongoose.models.Account;
} else {
  const AccountSchema = new mongoose.Schema({
    name: {
      type: String,
      validate: [v => v.length > 1, 'Not valid'],
      required: true,
    },
    primaryContact: {
      type: Schema.ObjectId,
      ref: 'User',
      required: true,
    },
  });
  model = mongoose.model('Account', AccountSchema);
}

export default model;