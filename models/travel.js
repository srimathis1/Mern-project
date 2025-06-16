import mongoose from 'mongoose';

const travelSchema = mongoose.Schema({
  travelerid: {
    type: String,
    required: true,
    unique: true   // Ensure uniqueness
  },
  TravelerName: String,
  From: String,
  Todest: String,
  transmode: String,
},); 

export default mongoose.model('travel', travelSchema);
