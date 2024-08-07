import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
  // to check if we got the jwt secret from thr ekubernetes secret
  if (!process.env.JWT_KEY) {
    throw new Error('abcd.....');
  }
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
    console.log('connecting to mongodb');
  } catch (error) {
    console.log(error);
  }
};

app.listen(3000, () => {
  console.log('Listening on port 3000!!!!!!!');
});

start();
