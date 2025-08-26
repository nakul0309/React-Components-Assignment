import React from 'react';
import { cn } from '../../utils/cn';

export interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: 'filled' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  type?: React.HTMLInputTypeAttribute;
  clearable?: boolean;
  passwordToggle?: boolean;
  id?: string;
  name?: string;
}

const sizeStyles: Record<NonNullable<InputFieldProps['size']>, string> = {
  sm: 'h-9 text-sm px-3',
  md: 'h-11 text-base px-4',
  lg: 'h-12 text-lg px-5'
};

const variantStyles: Record<NonNullable<InputFieldProps['variant']>, string> = {
  filled:
    'bg-gray-100/80 dark:bg-gray-800/60 border border-transparent focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30',
  outlined:
    'bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30',
  ghost:
    'bg-transparent border border-transparent focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30'
};

function Spinner() {
  return (
    <svg className="animate-spin" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" fill="none" opacity="0.25" />
      <path d="M21 12a9 9 0 0 1-9 9" stroke="currentColor" strokeWidth="3" fill="none" />
    </svg>
  );
}

function Eye({ off = false }: { off?: boolean }) {
  return off ? (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path d="M3 3l18 18" stroke="currentColor" strokeWidth="2"/>
      <path d="M10.58 10.58A3 3 0 0 0 9 12a3 3 0 0 0 3 3 3 3 0 0 0 1.42-.38" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path d="M2 12s3.5-7 10-7 10 7 10 7a17.2 17.2 0 0 1-3.2 3.68M6.18 6.18A17.3 17.3 0 0 0 2 12" stroke="currentColor" strokeWidth="2" fill="none"/>
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" fill="none" stroke="currentColor" strokeWidth="2"/>
      <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="2"/>
    </svg>
  );
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(function InputField(
  {
    value,
    onChange,
    label,
    placeholder,
    helperText,
    errorMessage,
    disabled,
    invalid,
    variant = 'outlined',
    size = 'md',
    loading,
    type = 'text',
    clearable,
    passwordToggle,
    id,
    name
  },
  ref
) {
  const inputId = id || React.useId();
  const [showPassword, setShowPassword] = React.useState(false);

  const isPassword = type === 'password';
  const effectiveType = isPassword && passwordToggle && !showPassword ? 'password' : type;

  const describedBy: string[] = [];
  if (helperText) describedBy.push(`${inputId}-help`);
  if (invalid && errorMessage) describedBy.push(`${inputId}-err`);

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}

      <div
        className={cn(
          'relative flex items-center rounded-xl transition-colors',
          sizeStyles[size],
          variantStyles[variant],
          disabled && 'opacity-60 cursor-not-allowed',
          invalid && 'ring-2 ring-red-500/30 border-red-500'
        )}
      >
        <input
          ref={ref}
          id={inputId}
          name={name}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy.join(' ') || undefined}
          className={cn(
            'peer w-full bg-transparent outline-none placeholder:text-gray-400 dark:placeholder:text-gray-500',
            isPassword && passwordToggle ? 'pr-20' : clearable ? 'pr-12' : 'pr-4'
          )}
          placeholder={placeholder}
          disabled={disabled}
          value={value}
          onChange={onChange}
          type={effectiveType}
        />

        {loading && (
          <span className="absolute right-3 inline-flex" aria-hidden>
            <Spinner />
          </span>
        )}

        {!loading && clearable && value && value.length > 0 && (
          <button
            type="button"
            onClick={() => onChange?.({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>)}
            className="absolute right-3 rounded-md px-2 py-1 text-sm text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Clear input"
          >
            ×
          </button>
        )}

        {!loading && isPassword && passwordToggle && (
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            className="absolute right-3 rounded-md p-1 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            <Eye off={showPassword} />
          </button>
        )}
      </div>

      {helperText && !invalid && (
        <p id={`${inputId}-help`} className="mt-1 text-xs text-gray-500 dark:text-gray-400">{helperText}</p>
      )}
      {invalid && errorMessage && (
        <p id={`${inputId}-err`} className="mt-1 text-xs text-red-600">{errorMessage}</p>
      )}
    </div>
  );
});

export default InputField;
