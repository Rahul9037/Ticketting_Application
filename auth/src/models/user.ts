import mongoose, { trusted } from 'mongoose';

//interface that describe the properties that are required to create a new user

interface UserAttrs {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

const buildUser = (attr: UserAttrs) => {
  return new User(attr);
};

export { User, buildUser };
