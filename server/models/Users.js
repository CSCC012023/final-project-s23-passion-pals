import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  email: String,
  password: String,
  phoneNumber: String,
  profilePic: String,
  interest: [String],
  request: [String],
  friend: [String],
  followings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }],
  enrolledEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'EventCard' }],
  locations: [String],
  verified: Boolean,
  initialized: Boolean,
}, {
  collection: 'Users'
});

const UserModel = mongoose.model('Users', userSchema);

export default UserModel;