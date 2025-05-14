import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { isValidEmail, normalizeEmail, getEmailValidationError } from '../lib/validation';

interface RegisterFormData {
  email: string;
  password: string;
}

const RegisterForm: React.FC = () => {
  const [emailError, setEmailError] = useState<string | null>(null);

  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    setError,
    clearErrors
  } = useForm<RegisterFormData>();

  const validateEmail = (email: string): boolean => {
    const normalizedEmail = normalizeEmail(email);
    
    if (!isValidEmail(normalizedEmail)) {
      setEmailError(getEmailValidationError(email));
      setError('email', { 
        type: 'manual', 
        message: getEmailValidationError(email) 
      });
      return false;
    }
    
    // Clear any previous email errors
    setEmailError(null);
    clearErrors('email');
    return true;
  };

  const onSubmit = (data: RegisterFormData) => {
    const isValid = validateEmail(data.email);
    
    if (isValid) {
      // Proceed with registration using normalized email
      const normalizedEmail = normalizeEmail(data.email);
      console.log('Registration with normalized email:', normalizedEmail);
      // Add actual registration logic here
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium">Email</label>
        <input 
          id="email"
          type="email"
          {...register('email', {
            required: 'Email is required',
            validate: validateEmail
          })}
          onChange={(e) => {
            // Optional: Real-time validation
            validateEmail(e.target.value);
          }}
          className={`w-full p-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
        />
        {(emailError || errors.email) && (
          <p className="text-red-500 text-sm mt-1">
            {emailError || errors.email?.message}
          </p>
        )}
      </div>
      {/* Other form fields would be added here */}
      <button type="submit" className="w-full bg-blue-500 text-white p-2">
        Register
      </button>
    </form>
  );
};

export default RegisterForm;