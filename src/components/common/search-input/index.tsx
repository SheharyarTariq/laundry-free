import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { Search } from 'lucide-react';

export interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  size?: 'small' | 'medium';
  variant?: 'outlined' | 'filled' | 'standard';
}

export function SearchInput({
  value,
  onChange,
  placeholder = 'Search…',
  size = 'small',
  variant = 'outlined',
}: SearchInputProps) {
  return (
    <TextField
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      variant={variant}
      size={size}
      fullWidth
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search size={20} />
          </InputAdornment>
        ),
      }}
    />
  );
}
