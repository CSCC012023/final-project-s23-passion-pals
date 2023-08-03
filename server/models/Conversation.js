import mongoose from "mongoose";

const ConversationSchema = new mongoose.Schema(
    {
        members:{
            type: Array,
        },

        event:{
            type: String,
        },

        eventId:{
            type: { type: mongoose.Schema.Types.ObjectId, ref: 'Events' },
        }
    },
    { timestamps: true }
  );
  
  const Conversation = mongoose.model("Conversation", ConversationSchema);
  
  export default Conversation;
  