import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
	userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
	token: String,
	createdAt: { type: Date, default: Date.now, expires: 3600 },
}, {
	collection: 'Token'
  });

  const TokenModel = mongoose.model('Token', tokenSchema);

  export default TokenModel;


