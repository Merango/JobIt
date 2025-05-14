import React from 'react';
import { useForm } from 'react-hook-form';
import { isValidEmail, getEmailValidationError } from '../lib/validation';

interface RegisterFormData {
  email: string;
  password: string;
}

const RegisterForm: React.FC = () => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<RegisterFormData>();

  const onSubmit = (data: RegisterFormData) => {
    // Proceed with registration
    console.log('Registration data:', data);
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
            validate: (value) => 
              isValidEmail(value) || getEmailValidationError(value)
          })}
          className={`w-full p-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
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