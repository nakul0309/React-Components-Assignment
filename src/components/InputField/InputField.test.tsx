import { render, screen, fireEvent } from '@testing-library/react';
import InputField from './InputField';

it('renders label and updates value', () => {
  let value = '';
  const onChange = (e: any) => (value = e.target.value);
  render(<InputField label="Name" placeholder="Type" value={value} onChange={onChange} />);
  const input = screen.getByPlaceholderText('Type') as HTMLInputElement;
  fireEvent.change(input, { target: { value: 'Hi' } });
  expect(value).toBe('Hi');
});

it('shows error message when invalid', () => {
  render(<InputField label="Email" invalid errorMessage="Invalid" />);
  expect(screen.getByText('Invalid')).toBeInTheDocument();
});

it('clear button empties the field', () => {
  let value = 'abc';
  const onChange = (e: any) => (value = e.target.value);
  render(<InputField label="X" value={value} onChange={onChange} clearable />);
  fireEvent.click(screen.getByRole('button', { name: /clear input/i }));
  expect(value).toBe('');
});
