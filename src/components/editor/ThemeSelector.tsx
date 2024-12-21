import React from 'react';
import { Palette } from 'lucide-react';

const themes = [
  { id: 'default', name: 'Default', color: '#4F46E5' },
  { id: 'modern', name: 'Modern', color: '#0EA5E9' },
  { id: 'minimal', name: 'Minimal', color: '#374151' },
  { id: 'corporate', name: 'Corporate', color: '#0891B2' },
  { id: 'creative', name: 'Creative', color: '#EC4899' }
];

interface ThemeSelectorProps {
  value: string;
  onChange: (theme: string) => void;
}

export function ThemeSelector({ value, onChange }: ThemeSelectorProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium text-gray-900">Theme</h2>
      
      <div className="grid grid-cols-2 gap-4">
        {themes.map((theme) => (
          <button
            key={theme.id}
            onClick={() => onChange(theme.id)}
            className={`
              flex items-center gap-2 p-4 rounded-lg border-2 transition-colors
              ${value === theme.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
              }
            `}
          >
            <Palette className="h-5 w-5" style={{ color: theme.color }} />
            <span className="font-medium">{theme.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}