import mongoose from 'mongoose';

const eventCardSchema = new mongoose.Schema({
    creator: String,
    eventName: String,
    eventLocation: String,
    eventPrice: String,
    eventImage: String,
    eventDescription: String,
    eventDate: Date,
    themes: [String],
    spots: Number
  }, {
      collection: 'Events'
  
  });
  
  // Create the User model
  const EventCardModel = mongoose.model('Events', eventCardSchema);
  
  // Export the User model
export default EventCardModel
