import React from 'react';
import { Link, GripVertical, X } from 'lucide-react';
import type { SocialMediaLink } from '../../types/database';

type SocialLink = Omit<SocialMediaLink, 'id' | 'card_id' | 'created_at'>;

interface SocialLinksFormProps {
  links: SocialLink[];
  onChange: (links: SocialLink[]) => void;
}

export function SocialLinksForm({ links, onChange }: SocialLinksFormProps) {
  const addLink = () => {
    onChange([
      ...links,
      {
        platform: '',
        url: '',
        custom_icon: '',
        is_visible: true,
        display_order: links.length
      }
    ]);
  };

  const updateLink = (index: number, field: keyof SocialLink, value: any) => {
    const newLinks = [...links];
    newLinks[index] = { ...newLinks[index], [field]: value };
    onChange(newLinks);
  };

  const removeLink = (index: number) => {
    onChange(links.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium text-gray-900">Social Media Links</h2>
      
      <div className="space-y-4">
        {links.map((link, index) => (
          <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <GripVertical className="h-5 w-5 text-gray-400 cursor-move" />
            
            <div className="flex-1 grid grid-cols-2 gap-4">
              <input
                type="text"
                value={link.platform}
                onChange={(e) => updateLink(index, 'platform', e.target.value)}
                className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Platform (e.g., LinkedIn)"
              />
              <input
                type="url"
                value={link.url}
                onChange={(e) => updateLink(index, 'url', e.target.value)}
                className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="URL"
              />
            </div>

            <button
              onClick={() => removeLink(index)}
              className="p-2 text-gray-400 hover:text-red-500"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addLink}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          <Link className="h-5 w-5 mr-2" />
          Add Social Link
        </button>
      </div>
    </div>
  );
}