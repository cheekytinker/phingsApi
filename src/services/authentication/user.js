import mongoose from 'mongoose';

let model = null;

if (mongoose.models.User != null && mongoose.modelSchemas.User != null) {
  model = mongoose.models.User;
} else {
  const UserSchema = new mongoose.Schema({
    firstName: {
      type: String,
      validate: [v => v.length > 1, 'Not valid'],
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  });
  model = mongoose.model('User', UserSchema);
}

export default model;
