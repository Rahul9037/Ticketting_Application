import mongoose from 'mongoose';
import { Password } from '../services/password';
//interface that describe the properties that are required to create a new user

interface UserAttrs {
  email: string;
  password: string;
}

//interface that describe the properties that a user model has

//initailly -  interface UserModel extends mongoose.Model<any> {
interface UserModel extends mongoose.Model<UserDoc> {
  build(attr: UserAttrs): UserDoc;
}

//interface that descriobes the properties that a user document has
interface UserDoc extends mongoose.Document {
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

//presave

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

//add statc method to schema

userSchema.statics.build = (attr: UserAttrs) => {
  return new User(attr);
};

// initially - const User = mongoose.model<any, UserModel>('User', userSchema);
const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

// const buildUser = (attr: UserAttrs) => {
//   return new User(attr);
// };

// export { User, buildUser };
export { User };
