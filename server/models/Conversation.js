import mongoose from "mongoose";

const ConversationSchema = new mongoose.Schema(
    {
      members: {
        type: Array,
      },
      event: {
        type: String,
      },
      eventId: {
        type: mongoose.Schema.Types.ObjectId, // Store the event ID as an ObjectId
        ref: "EventCard", // Reference the EventCard model
      },
    },
    { timestamps: true }
  );
  
  const Conversation = mongoose.model("Conversation", ConversationSchema);
  
  export default Conversation;
  