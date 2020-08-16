import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
  userName: {
    type: String,
    required: 'Enter a first name'
  },
  firstName: {
    type: String,
    required: 'Enter a last name'
  },
  lastName: {
    type: String,
    required: 'Enter a last name'
  },
  email: {
    type: String
  },
  hashPassword: {
    type: String
  },
  created_date: {
    type: Date,
    default: Date.now
  }
});

UserSchema.methods.comparePassword = (password, hashPassword) => {
  return bcrypt.compareSync(password, hashPassword);
}
