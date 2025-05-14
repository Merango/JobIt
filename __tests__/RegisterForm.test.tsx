import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RegisterForm from '../components/RegisterForm';

describe('RegisterForm', () => {
  test('renders email input', () => {
    render(<RegisterForm />);
    const emailInput = screen.getByLabelText(/email/i);
    expect(emailInput).toBeInTheDocument();
  });

  test('shows error for invalid email', () => {
    render(<RegisterForm />);
    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByText(/register/i);

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.click(submitButton);

    const errorMessage = screen.getByText(/please enter a valid email address/i);
    expect(errorMessage).toBeInTheDocument();
  });

  test('accepts valid email', () => {
    render(<RegisterForm />);
    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByText(/register/i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);

    const errorMessage = screen.queryByText(/please enter a valid email address/i);
    expect(errorMessage).not.toBeInTheDocument();
  });
});