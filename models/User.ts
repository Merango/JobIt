import mongoose from 'mongoose';
import { isValidEmail, normalizeEmail } from '../lib/utils';

// Define the User schema
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true, // Database-level unique constraint
    lowercase: true, // Store emails in lowercase
    trim: true, // Remove whitespace
    validate: {
      validator: function(value: string) {
        return isValidEmail(value);
      },
      message: 'Invalid email format'
    }
  },
  // Other user fields...
}, {
  // Ensure unique index is case-insensitive
  indexes: [{ 
    email: 1 
  }]
});

// Pre-save middleware to normalize email
UserSchema.pre('save', function(next) {
  // Normalize email before saving
  if (this.email) {
    this.email = normalizeEmail(this.email);
  }
  next();
});

// Custom method to check email uniqueness
UserSchema.statics.isEmailTaken = async function(email: string): Promise<boolean> {
  const normalizedEmail = normalizeEmail(email);
  const user = await this.findOne({ email: normalizedEmail });
  return !!user;
};

// Create the User model
const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;