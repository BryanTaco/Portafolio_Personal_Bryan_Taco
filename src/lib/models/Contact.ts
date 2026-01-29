import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    maxlength: [100, 'Name cannot be more than 100 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    maxlength: [255, 'Email cannot be more than 255 characters'],
  },
  subject: {
    type: String,
    required: [true, 'Please provide a subject'],
    maxlength: [200, 'Subject cannot be more than 200 characters'],
  },
  message: {
    type: String,
    required: [true, 'Please provide a message'],
    maxlength: [2000, 'Message cannot be more than 2000 characters'],
  },
  read: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Index for better query performance
ContactSchema.index({ createdAt: -1 });
ContactSchema.index({ email: 1 });

export default mongoose.models.Contact || mongoose.model('Contact', ContactSchema);
