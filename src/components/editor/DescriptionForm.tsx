import React from 'react';

interface DescriptionFormProps {
  description: string;
  onChange: (value: string) => void;
}

export function DescriptionForm({ description, onChange }: DescriptionFormProps) {
  const maxLength = 500;

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium text-gray-900">Personal Description</h2>
      
      <div>
        <textarea
          value={description}
          onChange={(e) => onChange(e.target.value)}
          maxLength={maxLength}
          rows={4}
          className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Write a brief description about yourself..."
        />
        <p className="mt-2 text-sm text-gray-500">
          {description.length}/{maxLength} characters
        </p>
      </div>
    </div>
  );
}