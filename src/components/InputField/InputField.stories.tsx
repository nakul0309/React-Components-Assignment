import type { Meta, StoryObj } from '@storybook/react';
import InputField from './InputField';

const meta: Meta<typeof InputField> = {
  title: 'Components/InputField',
  component: InputField,
  parameters: { layout: 'centered' },
  args: {
    label: 'Username',
    placeholder: 'Enter username',
    variant: 'outlined',
    size: 'md'
  }
};
export default meta;

export type Story = StoryObj<typeof InputField>;

export const Default: Story = {};
export const Helper: Story = { args: { helperText: 'This is helper text' } };
export const Error: Story = { args: { invalid: true, errorMessage: 'Required field' } };
export const Disabled: Story = { args: { disabled: true, value: 'disabled' } };
export const Loading: Story = { args: { loading: true, value: 'loading…' } };
export const Filled: Story = { args: { variant: 'filled' } };
export const Ghost: Story = { args: { variant: 'ghost' } };
export const Sizes: Story = {
  render: (args) => (
    <div className="space-y-4">
      <InputField {...args} size="sm" label="Small" />
      <InputField {...args} size="md" label="Medium" />
      <InputField {...args} size="lg" label="Large" />
    </div>
  )
};
export const PasswordToggle: Story = {
  args: { type: 'password', passwordToggle: true, label: 'Password' }
};
export const Clearable: Story = {
  args: { clearable: true, value: 'Text', label: 'Clear me' }
};
