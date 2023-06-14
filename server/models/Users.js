import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  email: String,
  password: String,
  enrolledEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'EventCard' }]
}, {
  collection: 'Users'
});

const UserModel = mongoose.model('Users', userSchema);

export default UserModel;
