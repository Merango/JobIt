import mongoose from 'mongoose';
import { validateEmail } from '../validate-email';

// Mongoose schema for user with email uniqueness and validation
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true, // Database-level unique constraint
    lowercase: true, // Ensure case-insensitive storage
    trim: true, // Remove whitespace
    validate: {
      validator: function(email: string) {
        const validationResult = validateEmail(email);
        return validationResult.isValid;
      },
      message: (props) => `${props.value} is not a valid email!`
    }
  },
  // Other user fields...
});

// Pre-save middleware to ensure unique, lowercase email
UserSchema.pre('save', function(next) {
  // Convert email to lowercase before saving
  this.email = this.email.toLowerCase().trim();
  next();
});

// Create a unique index with case-insensitive collation
UserSchema.index({ email: 1 }, { 
  unique: true, 
  collation: { locale: 'en', strength: 2 } 
});

export const User = mongoose.model('User', UserSchema);