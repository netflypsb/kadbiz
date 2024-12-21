import React from 'react';
import { Mail, Phone, Globe, Link2 } from 'lucide-react';
import type { BusinessCard, SocialMediaLink, BusinessLink } from '../../types/database';

type PreviewProps = Omit<BusinessCard, 'id' | 'user_id' | 'created_at' | 'updated_at'> & {
  social_links: Omit<SocialMediaLink, 'id' | 'card_id' | 'created_at'>[];
  business_links: Omit<BusinessLink, 'id' | 'card_id' | 'created_at'>[];
};

export function CardPreview(props: PreviewProps) {
  const themeColors = {
    default: 'bg-indigo-600',
    modern: 'bg-sky-500',
    minimal: 'bg-gray-700',
    corporate: 'bg-cyan-600',
    creative: 'bg-pink-500'
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
      <div className={`${themeColors[props.theme as keyof typeof themeColors]} h-24`} />
      
      <div className="px-6 py-4 -mt-12">
        {props.profile_image ? (
          <img
            src={props.profile_image}
            alt={props.full_name}
            className="w-24 h-24 rounded-full border-4 border-white shadow-lg mx-auto"
          />
        ) : (
          <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg mx-auto bg-gray-200 flex items-center justify-center">
            <span className="text-3xl font-bold text-gray-400">
              {props.full_name.charAt(0)}
            </span>
          </div>
        )}

        <div className="text-center mt-4">
          <h2 className="text-2xl font-bold text-gray-900">{props.full_name}</h2>
          {props.job_title && (
            <p className="text-gray-600 font-medium">{props.job_title}</p>
          )}
          {props.company && (
            <p className="text-gray-500">{props.company}</p>
          )}
        </div>

        {props.personal_description && (
          <p className="mt-4 text-gray-600 text-center">
            {props.personal_description}
          </p>
        )}

        <div className="mt-6 space-y-3">
          {props.email && (
            <div className="flex items-center gap-3 text-gray-600">
              <Mail className="h-5 w-5" />
              <span>{props.email}</span>
            </div>
          )}
          {props.phone && (
            <div className="flex items-center gap-3 text-gray-600">
              <Phone className="h-5 w-5" />
              <span>{props.phone}</span>
            </div>
          )}
          {props.website && (
            <div className="flex items-center gap-3 text-gray-600">
              <Globe className="h-5 w-5" />
              <span>{props.website}</span>
            </div>
          )}
        </div>

        {props.social_links.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Social Media</h3>
            <div className="space-y-2">
              {props.social_links.map((link, index) => (
                <div key={index} className="flex items-center gap-3 text-gray-600">
                  <Link2 className="h-5 w-5" />
                  <span>{link.platform}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {props.business_links.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Business Links</h3>
            <div className="space-y-3">
              {props.business_links.map((link, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex items-center gap-3 text-gray-900 font-medium">
                    <Link2 className="h-5 w-5" />
                    <span>{link.title}</span>
                  </div>
                  {link.description && (
                    <p className="text-sm text-gray-500 ml-8">{link.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}