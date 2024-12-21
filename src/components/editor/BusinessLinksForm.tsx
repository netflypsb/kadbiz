import React from 'react';
import { Link2, GripVertical, X } from 'lucide-react';
import type { BusinessLink } from '../../types/database';

type BusinessLinkType = Omit<BusinessLink, 'id' | 'card_id' | 'created_at'>;

interface BusinessLinksFormProps {
  links: BusinessLinkType[];
  onChange: (links: BusinessLinkType[]) => void;
}

export function BusinessLinksForm({ links, onChange }: BusinessLinksFormProps) {
  const addLink = () => {
    onChange([
      ...links,
      {
        title: '',
        url: '',
        description: '',
        custom_logo: '',
        display_order: links.length
      }
    ]);
  };

  const updateLink = (index: number, field: keyof BusinessLinkType, value: any) => {
    const newLinks = [...links];
    newLinks[index] = { ...newLinks[index], [field]: value };
    onChange(newLinks);
  };

  const removeLink = (index: number) => {
    onChange(links.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium text-gray-900">Business Links</h2>
      
      <div className="space-y-4">
        {links.map((link, index) => (
          <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
            <GripVertical className="h-5 w-5 text-gray-400 cursor-move mt-2" />
            
            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  value={link.title}
                  onChange={(e) => updateLink(index, 'title', e.target.value)}
                  className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Title"
                />
                <input
                  type="url"
                  value={link.url}
                  onChange={(e) => updateLink(index, 'url', e.target.value)}
                  className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="URL"
                />
              </div>
              
              <input
                type="text"
                value={link.description || ''}
                onChange={(e) => updateLink(index, 'description', e.target.value)}
                className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Description (optional)"
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
          <Link2 className="h-5 w-5 mr-2" />
          Add Business Link
        </button>
      </div>
    </div>
  );
}