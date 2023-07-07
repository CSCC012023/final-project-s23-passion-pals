import mongoose from 'mongoose';

const eventCardSchema = new mongoose.Schema({
  eventName: String,
  eventLocation: String,
  eventPrice: String,
  eventImage: String,
  eventDescription: String,
  eventDate: String,
  themes: [String], 
  spots: Number,
}, {
  collection: 'Events'
});

const EventCardModel = mongoose.model('Events', eventCardSchema);

export default EventCardModel;
